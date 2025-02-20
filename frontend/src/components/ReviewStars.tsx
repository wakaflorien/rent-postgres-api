'use client';

import React from 'react';

interface ReviewStarsProps {
  rating: number;
  reviewCount: number;
  propertyId: string;
}

export const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, reviewCount, propertyId }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rating rating-sm">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="radio"
            name={`rating-${propertyId}`}
            className="mask mask-star-2 bg-orange-400"
            checked={i + 1 === Math.round(rating)}
            readOnly
          />
        ))}
      </div>
      <span className="text-sm">({reviewCount} reviews)</span>
    </div>
  );
}; 