/**
 * ESP32 + RC522 RFID Scanner — Smart Parking System
 *
 * Hardware Connections (ESP32 → RC522):
 *   - 3.3V  → VCC
 *   - GND   → GND
 *   - GPIO5 → SDA (SS)
 *   - GPIO18 → SCK
 *   - GPIO23 → MOSI
 *   - GPIO19 → MISO
 *   - GPIO21 → RST
 *
 * Dependencies:
 *   - MFRC522 library (by GithubCommunity)
 *   - ArduinoJson library (by Benoit Blanchon)
 *   - WiFi (built-in ESP32)
 *   - HTTPClient (built-in ESP32)
 *
 * Flow:
 *   1. ESP32 connects to WiFi
 *   2. Waits for an RFID card scan
 *   3. Reads the UID
 *   4. Sends HTTP POST to the backend API
 *   5. Displays the response (assigned slot + path)
 */

#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ── Configuration ─────────────────────────────────────────────

// WiFi credentials
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Backend API
const char* API_BASE_URL  = "http://YOUR_SERVER_IP:8000";
const char* API_KEY       = "sp-hw-key-2026-demo";
const char* LOT_ID        = "demo-lot-1";

// RC522 Pins
#define SS_PIN   5
#define RST_PIN  21

// Gate type: "ENTRY" or "EXIT"
const char* GATE_ACTION   = "ENTRY";

// LED indicators (optional)
#define LED_SUCCESS  2   // Built-in LED
#define LED_ERROR    4

// ── Globals ───────────────────────────────────────────────────

MFRC522 rfid(SS_PIN, RST_PIN);
unsigned long lastScanTime = 0;
const unsigned long SCAN_COOLDOWN = 3000; // 3 seconds between scans

// ── Setup ─────────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  Serial.println("\n🅿️ Smart Parking RFID Scanner");
  Serial.println("──────────────────────────────");

  // LED setup
  pinMode(LED_SUCCESS, OUTPUT);
  pinMode(LED_ERROR, OUTPUT);
  digitalWrite(LED_SUCCESS, LOW);
  digitalWrite(LED_ERROR, LOW);

  // SPI + RFID init
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("✅ RFID scanner initialized");

  // WiFi connect
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("📡 Connecting to WiFi");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi connected!");
    Serial.print("   IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ WiFi connection failed! Continuing in offline mode.");
  }

  Serial.println("──────────────────────────────");
  Serial.println("📋 Ready. Place RFID card near reader...\n");
}

// ── Main Loop ─────────────────────────────────────────────────

void loop() {
  // Check for new RFID card
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial())   return;

  // Cooldown check
  if (millis() - lastScanTime < SCAN_COOLDOWN) {
    Serial.println("⏳ Please wait before scanning again...");
    return;
  }
  lastScanTime = millis();

  // Read UID
  String uid = getUID();
  Serial.print("🏷️  RFID Tag: ");
  Serial.println(uid);

  // Send to backend
  if (WiFi.status() == WL_CONNECTED) {
    sendToBackend(uid);
  } else {
    Serial.println("❌ WiFi not connected. Cannot send data.");
    blinkLED(LED_ERROR, 3);
  }

  // Halt PICC
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  Serial.println();
}

// ── Read UID as String ────────────────────────────────────────

String getUID() {
  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();
  return uid;
}

// ── Send RFID Scan to Backend ─────────────────────────────────

void sendToBackend(String rfidTag) {
  HTTPClient http;

  String url = String(API_BASE_URL) + "/api/v1/parking/rfid-scan";
  Serial.print("📤 Sending to: ");
  Serial.println(url);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", API_KEY);

  // Build JSON payload
  JsonDocument doc;
  doc["rfidTag"] = rfidTag;
  doc["lotId"]   = LOT_ID;
  doc["action"]  = GATE_ACTION;

  String payload;
  serializeJson(doc, payload);

  Serial.print("📦 Payload: ");
  Serial.println(payload);

  // Send POST request
  int httpCode = http.POST(payload);

  if (httpCode > 0) {
    String response = http.getString();
    Serial.print("📥 Response (");
    Serial.print(httpCode);
    Serial.println("):");

    // Parse response
    JsonDocument resDoc;
    DeserializationError error = deserializeJson(resDoc, response);

    if (!error) {
      bool success = resDoc["success"];
      const char* message = resDoc["message"];

      Serial.print("   Status: ");
      Serial.println(success ? "✅ SUCCESS" : "❌ FAILED");
      Serial.print("   Message: ");
      Serial.println(message);

      if (success && strcmp(GATE_ACTION, "ENTRY") == 0) {
        // Entry response — show assigned slot
        const char* slot = resDoc["data"]["assignedSlot"];
        int slotFloor    = resDoc["data"]["floor"];

        Serial.println("   ────────────────────");
        Serial.print("   🅿️ Assigned Slot: ");
        Serial.println(slot);
        Serial.print("   🏢 Floor: ");
        Serial.println(slotFloor);

        // Show path if available
        if (resDoc["data"]["path"].is<JsonObject>()) {
          float distance = resDoc["data"]["path"]["distance"];
          Serial.print("   📏 Distance: ");
          Serial.print(distance);
          Serial.println("m");

          JsonArray pathCoords = resDoc["data"]["path"]["pathCoordinates"];
          Serial.print("   🗺️ Path: ");
          for (int i = 0; i < pathCoords.size(); i++) {
            const char* label = pathCoords[i]["label"];
            Serial.print(label);
            if (i < pathCoords.size() - 1) Serial.print(" → ");
          }
          Serial.println();
        }
        Serial.println("   ────────────────────");

        blinkLED(LED_SUCCESS, 2);

      } else if (success && strcmp(GATE_ACTION, "EXIT") == 0) {
        // Exit response — show bill
        const char* exitSlot = resDoc["data"]["slot"];
        int duration         = resDoc["data"]["durationMinutes"];
        float cost           = resDoc["data"]["cost"];

        Serial.println("   ────────────────────");
        Serial.print("   🅿️ Slot: ");
        Serial.println(exitSlot);
        Serial.print("   ⏱️ Duration: ");
        Serial.print(duration);
        Serial.println(" min");
        Serial.print("   💰 Cost: ₹");
        Serial.println(cost);
        Serial.println("   ────────────────────");

        blinkLED(LED_SUCCESS, 3);

      } else {
        // Error
        blinkLED(LED_ERROR, 2);
      }
    } else {
      Serial.println("   ❌ JSON parse error");
      blinkLED(LED_ERROR, 3);
    }
  } else {
    Serial.print("❌ HTTP error: ");
    Serial.println(httpCode);
    blinkLED(LED_ERROR, 3);
  }

  http.end();
}

// ── LED Blink Helper ──────────────────────────────────────────

void blinkLED(int pin, int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
    delay(200);
  }
}
