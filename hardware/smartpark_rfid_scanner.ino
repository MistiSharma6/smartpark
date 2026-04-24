/*
 * ============================================================
 *  SmartPark – RFID Gate Scanner (ESP8266 + MFRC522)
 * ============================================================
 *
 *  Wiring (ESP8266 NodeMCU  →  MFRC522):
 *  ─────────────────────────────────────
 *    3.3V  →  VCC
 *    GND   →  GND
 *    D8    →  SDA  (SS / Chip Select)
 *    D5    →  SCK
 *    D7    →  MOSI
 *    D6    →  MISO
 *    D0    →  RST
 *
 *  Buzzer (optional):
 *    D1    →  Buzzer (+)
 *    GND   →  Buzzer (–)
 *
 *  LED indicators (optional):
 *    D2    →  Green LED (Entry)   via 220Ω resistor
 *    D3    →  Red   LED (Exit)    via 220Ω resistor
 *
 *  Libraries required (install via Arduino Library Manager):
 *    1. MFRC522  by GithubCommunity
 *    2. ArduinoJson  by Benoit Blanchon  (v7.x)
 *    3. ESP8266WiFi           (comes with ESP8266 board package)
 *    4. ESP8266HTTPClient     (comes with ESP8266 board package)
 *
 *  Board package:
 *    In Preferences → Additional Board URLs add:
 *      http://arduino.esp8266.com/stable/package_esp8266com_index.json
 *    Then install "esp8266 by ESP8266 Community" from Boards Manager.
 *    Select board: "NodeMCU 1.0 (ESP-12E Module)" or similar.
 *
 *  Logic:
 *    • 1st scan of a tag  → sends  action = "ENTRY"
 *    • 2nd scan of same tag → sends action = "EXIT"
 *    • After EXIT the tag is cleared, so scanning again = new ENTRY.
 *    • Tracks up to MAX_TAGS unique tags simultaneously.
 * ============================================================
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

// ──────────────────── PIN DEFINITIONS ────────────────────
#define SS_PIN    D8   // SDA / Chip-select for MFRC522
#define RST_PIN   D0   // Reset pin for MFRC522
#define BUZZER    D1   // Optional buzzer
#define LED_GREEN D2   // Optional green LED (Entry)
#define LED_RED   D3   // Optional red LED   (Exit)

// ──────────────────── WIFI CREDENTIALS ───────────────────
const char* WIFI_SSID     = "YOUR_WIFI_SSID";      // ← Change this
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";   // ← Change this

// ──────────────────── API CONFIGURATION ──────────────────
const char* API_URL = "https://smartpark-fzzx.onrender.com/api/v1/parking/rfid-scan";
const char* API_KEY = "sp-hw-key-2026-demo";

// Constant: This ESP8266 is physically installed at this lot
const char* LOT_ID  = "70f92dd9-c11d-40ed-8976-6dd90265e0ee";

// ──────────────────── TAG TRACKING ───────────────────────
// We keep a small table of tags currently "inside" the lot.
// First scan → ENTRY (tag added to table).
// Second scan → EXIT (tag removed from table).
#define MAX_TAGS 50   // Max simultaneous vehicles to track

String  insideTags[MAX_TAGS];   // Array of tag UIDs currently inside
int     tagCount = 0;           // How many tags are currently tracked

// ──────────────────── TIMING ─────────────────────────────
#define SCAN_COOLDOWN_MS  3000  // Ignore re-reads of the SAME card for 3 s
String  lastScannedTag = "";
unsigned long lastScanTime = 0;

// ──────────────────── OBJECTS ────────────────────────────
MFRC522 rfid(SS_PIN, RST_PIN);


// ═══════════════════════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════════════════════
void setup() {
  Serial.begin(115200);
  delay(100);

  // --- Peripheral pins ---
  pinMode(BUZZER,    OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED,   OUTPUT);
  digitalWrite(BUZZER,    LOW);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED,   LOW);

  // --- SPI & RFID reader ---
  SPI.begin();
  rfid.PCD_Init();
  rfid.PCD_DumpVersionToSerial();  // Print firmware version (debugging)

  Serial.println();
  Serial.println("╔═══════════════════════════════════════╗");
  Serial.println("║      SmartPark RFID Gate Scanner      ║");
  Serial.println("╚═══════════════════════════════════════╝");

  // --- WiFi ---
  connectWiFi();

  Serial.println("\n✓ System ready. Waiting for RFID cards...\n");
}


// ═══════════════════════════════════════════════════════════
//  LOOP
// ═══════════════════════════════════════════════════════════
void loop() {
  // Reconnect WiFi if it drops
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("⚠ WiFi lost. Reconnecting...");
    connectWiFi();
  }

  // 1. Check if a NEW card is present on the reader
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial())   return;

  // 2. Read the card UID and build a string like "A3:F2:01:7C"
  String tagUID = getTagUID();

  // 3. Debounce: ignore if same card scanned within cooldown window
  if (tagUID == lastScannedTag && (millis() - lastScanTime) < SCAN_COOLDOWN_MS) {
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
    return;
  }
  lastScannedTag = tagUID;
  lastScanTime   = millis();

  Serial.println("────────────────────────────────────");
  Serial.println("📡 Card detected:  " + tagUID);

  // 4. Determine action: is this tag already inside?
  int tagIndex = findTag(tagUID);
  String action;

  if (tagIndex == -1) {
    // Tag NOT in our table → this is an ENTRY
    action = "ENTRY";
    addTag(tagUID);
    Serial.println("🟢 Action:          ENTRY");
    blinkLED(LED_GREEN);
  } else {
    // Tag IS in our table → this is an EXIT
    action = "EXIT";
    removeTag(tagIndex);
    Serial.println("🔴 Action:          EXIT");
    blinkLED(LED_RED);
  }

  // 5. Beep to acknowledge
  beep(1);

  // 6. Send the API request
  bool success = sendRFIDScan(tagUID, action);

  if (success) {
    Serial.println("✅ Server acknowledged.");
    beep(2);  // Double-beep = success
  } else {
    Serial.println("❌ Server request failed.");
    beep(4);  // Rapid beeps = error
  }

  Serial.println("────────────────────────────────────\n");

  // 7. Halt the card so it isn't read again immediately
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}


// ═══════════════════════════════════════════════════════════
//  WiFi CONNECTION
// ═══════════════════════════════════════════════════════════
void connectWiFi() {
  Serial.print("📶 Connecting to WiFi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    attempts++;
    if (attempts > 40) {  // Timeout after ~20 seconds
      Serial.println("\n❌ WiFi connection timeout. Restarting...");
      ESP.restart();
    }
  }

  Serial.println();
  Serial.println("✓ WiFi connected");
  Serial.print("  IP Address: ");
  Serial.println(WiFi.localIP());
}


// ═══════════════════════════════════════════════════════════
//  SEND RFID SCAN  →  POST to SmartPark API
// ═══════════════════════════════════════════════════════════
bool sendRFIDScan(String rfidTag, String action) {
  WiFiClientSecure client;
  client.setInsecure();  // Skip SSL cert validation (Render rotates certs)

  HTTPClient http;

  Serial.print("📤 Sending to server... ");

  if (!http.begin(client, API_URL)) {
    Serial.println("HTTP begin failed");
    return false;
  }

  // Headers
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", API_KEY);

  // Build JSON payload using ArduinoJson (safe, no buffer overflows)
  JsonDocument doc;
  doc["rfidTag"] = rfidTag;
  doc["lotId"]   = LOT_ID;
  doc["action"]  = action;

  String payload;
  serializeJson(doc, payload);

  Serial.println(payload);

  // Send POST
  int httpCode = http.POST(payload);

  if (httpCode > 0) {
    Serial.print("   HTTP ");
    Serial.print(httpCode);
    Serial.print(" → ");
    Serial.println(http.getString());
    http.end();
    return (httpCode >= 200 && httpCode < 300);
  } else {
    Serial.printf("   HTTP error: %s\n", http.errorToString(httpCode).c_str());
    http.end();
    return false;
  }
}


// ═══════════════════════════════════════════════════════════
//  READ TAG UID  →  Returns string like "A3:F2:01:7C"
// ═══════════════════════════════════════════════════════════
String getTagUID() {
  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (i > 0) uid += ":";
    if (rfid.uid.uidByte[i] < 0x10) uid += "0";  // Leading zero
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}


// ═══════════════════════════════════════════════════════════
//  TAG TRACKING  (simple array-based lookup)
// ═══════════════════════════════════════════════════════════

// Find a tag in the insideTags array. Returns index or -1.
int findTag(String uid) {
  for (int i = 0; i < tagCount; i++) {
    if (insideTags[i] == uid) return i;
  }
  return -1;
}

// Add a tag to the tracking array
void addTag(String uid) {
  if (tagCount < MAX_TAGS) {
    insideTags[tagCount] = uid;
    tagCount++;
    Serial.print("   Tracking ");
    Serial.print(tagCount);
    Serial.println(" vehicle(s) inside.");
  } else {
    Serial.println("⚠ Tag table full! Cannot track more vehicles.");
  }
}

// Remove a tag from the tracking array (swap with last element)
void removeTag(int index) {
  insideTags[index] = insideTags[tagCount - 1];
  insideTags[tagCount - 1] = "";
  tagCount--;
  Serial.print("   Tracking ");
  Serial.print(tagCount);
  Serial.println(" vehicle(s) inside.");
}


// ═══════════════════════════════════════════════════════════
//  BUZZER & LED HELPERS
// ═══════════════════════════════════════════════════════════

// Short beep(s) on the buzzer
void beep(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(BUZZER, HIGH);
    delay(80);
    digitalWrite(BUZZER, LOW);
    if (i < times - 1) delay(80);
  }
}

// Blink an LED briefly
void blinkLED(int pin) {
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
}
