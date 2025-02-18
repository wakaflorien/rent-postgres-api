import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/authenticate';
import { Property } from '../models/property.model';
import { isHost } from '../middleware/roleCheck';
import { ApiError } from '../utils/ApiError';

const router = Router();

// Validation schemas
const propertySchema = z.object({
title: z.string().min(1).max(100),
description: z.string().min(1).max(1000),
price_per_night: z.number().positive(),
location: z.string().min(1).max(200),
amenities: z.array(z.string()).optional(),
});

// List all properties (public)
router.get('/', async (req, res, next) => {
try {
    const properties = await Property.findAll();
    res.json(properties);
} catch (error) {
    next(error);
}
});

// Get property details (public)
router.get('/:id', async (req, res, next) => {
try {
    const property = await Property.findById(req.params.id);
    if (!property) {
    throw new ApiError(404, 'Property not found');
    }
    res.json(property);
} catch (error) {
    next(error);
}
});

// Create property (host only)
router.post('/', authenticate, isHost, async (req, res, next) => {
try {
    const validatedData = propertySchema.parse(req.body);
    const property = await Property.create({
    ...validatedData,
    host_id: req.user.id,
    });
    res.status(201).json(property);
} catch (error) {
    if (error instanceof z.ZodError) {
    next(new ApiError(400, 'Invalid property data', error.errors));
    } else {
    next(error);
    }
}
});

// Update property (host only, must be property owner)
router.put('/:id', authenticate, isHost, async (req, res, next) => {
try {
    const property = await Property.findById(req.params.id);
    if (!property) {
    throw new ApiError(404, 'Property not found');
    }
    if (property.host_id !== req.user.id) {
    throw new ApiError(403, 'Not authorized to update this property');
    }

    const validatedData = propertySchema.parse(req.body);
    const updatedProperty = await Property.update(
    req.params.id,
    validatedData
    );
    res.json(updatedProperty);
} catch (error) {
    if (error instanceof z.ZodError) {
    next(new ApiError(400, 'Invalid property data', error.errors));
    } else {
    next(error);
    }
}
});

// Delete property (host only, must be property owner)
router.delete('/:id', authenticate, isHost, async (req, res, next) => {
try {
    const property = await Property.findById(req.params.id);
    if (!property) {
    throw new ApiError(404, 'Property not found');
    }
    if (property.host_id !== req.user.id) {
    throw new ApiError(403, 'Not authorized to delete this property');
    }

    await Property.delete(req.params.id);
    res.status(204).send();
} catch (error) {
    next(error);
}
});

export default router;

