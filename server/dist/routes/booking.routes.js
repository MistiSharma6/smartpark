import { Router } from "express";
import { createBooking, getMyBookings, getActiveBooking, cancelBooking, } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
// All booking routes require authentication
router.use(verifyJWT);
router.post("/", createBooking);
router.get("/my", getMyBookings);
router.get("/active", getActiveBooking);
router.patch("/:id/cancel", cancelBooking);
export default router;
//# sourceMappingURL=booking.routes.js.map