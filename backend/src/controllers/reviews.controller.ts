import { Request, Response } from "express";
import { Review } from "../models/review.model";
import Joi from "joi";

const reviewSchema = Joi.object({
  property_id: Joi.string().required(),
  renter_id: Joi.string().required(),
  rating: Joi.number().required(),
  comment: Joi.string().required(),
});

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.findAll();
    res.json({
      message: "Reviews fetched successfully",
      data: reviews,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      data: null,
      status: "failed",
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.message, data: null, status: "failed" });
    }
    const review = await Review.create(req.body);
    res.json({
      message: "Review created successfully",
      data: review,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      data: null,
      status: "failed",
    });
  }
};

export const getReviewsByPropertyId = async (req: Request, res: Response) => {
  const { property_id } = req.params;
  try {
    const reviews = await Review.findByPropertyId(property_id);
    res.json({
      message: "Reviews fetched successfully",
      data: reviews,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      data: null,
      status: "failed",
    });
  }
};

export const getReviewsByRenterId = async (req: Request, res: Response) => {
  const { renter_id } = req.params;
  try {
    const reviews = await Review.findByRenterId(renter_id);
    res.json({
      message: "Reviews fetched successfully",
      data: reviews,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      data: null,
      status: "failed",
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.message, data: null, status: "failed" });
    }
    const review = await Review.update(id, req.body);
    res.json({
      message: "Review updated successfully",
      data: review,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating review",
      data: null,
      status: "failed",
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Review.delete(id);
    res.json({ message: "Review deleted successfully", status: "success" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting review",
      data: null,
      status: "failed",
    });
  }
};

export const getAverageRating = async (req: Request, res: Response) => {
  const { property_id } = req.params;
  try {
    const averageRating = await Review.getAverageRating(property_id);
    res.json({
      message: "Average rating fetched successfully",
      data: averageRating,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching average rating",
      data: null,
      status: "failed",
    });
  }
};
