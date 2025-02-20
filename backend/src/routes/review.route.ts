import { Router } from 'express';
import { getReviews, createReview, updateReview, deleteReview, getAverageRating } from '../controllers/reviews.controller';

const router = Router();


router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/:property_id/average-rating', getAverageRating);

export default router;