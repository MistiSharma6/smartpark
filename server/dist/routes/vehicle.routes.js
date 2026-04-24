import { Router } from "express";
import { registerVehicle, getMyVehicles, updateVehicle, deleteVehicle, } from "../controllers/vehicle.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
// All routes require authentication
router.post("/register", verifyJWT, registerVehicle);
router.get("/my", verifyJWT, getMyVehicles);
router.patch("/:id", verifyJWT, updateVehicle);
router.delete("/:id", verifyJWT, deleteVehicle);
export default router;
//# sourceMappingURL=vehicle.routes.js.map