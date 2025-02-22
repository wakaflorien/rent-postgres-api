import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
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

router.post("/create", isAuthenticated, createProperty);

router.put("/update", isAuthenticated, updateProperty);

router.delete("/delete", isAuthenticated, deleteProperty);

router.get("/getByHostId", getPropertiesByHostId);

router.get("/getByLocation", getPropertiesByLocation);

export default router;
