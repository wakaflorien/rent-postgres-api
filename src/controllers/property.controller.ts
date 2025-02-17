import { Request, Response } from "express";
import { Property } from "../models/property.model";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const propertySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    property_type: Joi.string().required(),
    image_url: Joi.string().required(),
    host_id: Joi.string().required(),
});

export const createProperty = async (req: Request, res: Response) => {
    try {
        const { title, description, price, location, property_type, image_url, host_id } = req.body;
        const { error } = propertySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message, data: null, status: "failed" });
        }
        const property = await Property.create({ id: uuidv4(), title, description, price, location, property_type, image_url, host_id, created_at: new Date() });

        res.status(201).json({
            message: "Property created successfully",
            data: property,
            status: "success",
        });
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
            data: null,
            status: "failed",
        });
    }
};

export const updateProperty = async (req: Request, res: Response) => {
    const { id, title, description, price, location, property_type, image_url, host_id } = req.body;
    try {
        const propertyCheck = await Property.findById(id);
        if (!propertyCheck) {
            return res.status(404).json({ message: "Property not found", data: null, status: "failed" });
        }
        const { error } = propertySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message, data: null, status: "failed" });
        }
        const property = await Property.update(id, { id, title, description, price, location, property_type, image_url, host_id, created_at: new Date() });

        res.status(200).json({
            message: "Property updated successfully",
            data: property,
            status: "success",
        });
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
            data: null,
            status: "failed",
        });
    }
};

export const deleteProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;    
        const propertyCheck = await Property.findById(id);
        if (!propertyCheck) {
            return res.status(404).json({ message: "Property not found", data: null, status: "failed" });
        }
        await Property.delete(id);
        res.status(200).json({ message: "Property deleted successfully", data: null, status: "success" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message, data: null, status: "failed" });
    }
};

export const getPropertyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found", data: null, status: "failed" });
        }
        res.status(200).json({
            message: "Property fetched successfully",
            data: property,
            status: "success",
        });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message, data: null, status: "failed" });
    }
};

export const getAllProperties = async (req: Request, res: Response) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json({
            message: "Properties fetched successfully",
            data: properties,
            status: "success",
        });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message, data: null, status: "failed" });
    }
};

export const getPropertiesByHostId = async (req: Request, res: Response) => {
    try {
        const { host_id } = req.params;
        const properties = await Property.findByHostId(host_id);
        res.status(200).json({
            message: "Properties fetched successfully",
            data: properties,
            status: "success",
        });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message, data: null, status: "failed"   });
    }
};

export const getPropertiesByLocation = async (req: Request, res: Response) => {
    try {
        const { location } = req.params;
    const properties = await Property.findByLocation(location);
    res
      .status(200)
      .json({
        message: "Properties fetched successfully",
        data: properties,
        status: "success",
      });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message, data: null, status: "failed" });
    }
};
