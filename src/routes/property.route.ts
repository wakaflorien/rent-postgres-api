import express from "express";
import { isAuthenticated, isHost, isRenter   } from "../middleware/auth.middleware";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesByHostId,
  getPropertiesByLocation,
} from "../controllers/property.controller";
const router = express.Router();

router.get("/getAll", getAllProperties);

router.get("/getById", getPropertyById);

router.post("/create", isAuthenticated, isHost, createProperty);

router.put("/update", isAuthenticated, isHost, updateProperty);

router.delete("/delete", isAuthenticated, isHost, deleteProperty);

router.get("/getByHostId", getPropertiesByHostId);

router.get("/getByLocation", getPropertiesByLocation);

export default router;
