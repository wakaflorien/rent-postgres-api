// src/components/PropertyCard.tsx
import React from 'react';
import { Property } from '../types';
import { useRouter } from 'next/navigation';
import { workSans } from '@/utils/font';
import { ReviewStars } from './ReviewStars';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleViewDetails = () => {
    router.push(`/properties/${property.id}`);
  };

  return (
    <div className={`card w-96 bg-white shadow-xl ${workSans.variable} default-font`}>
      <figure className="carousel-item relative w-full">
        <img
          src={property.images[currentImageIndex]}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          className="h-48 w-full object-cover"
        />
        <div className={`absolute flex ${currentImageIndex > 0 ? 'justify-between' : 'justify-end'} transform -translate-y-1/2 left-5 right-5 top-1/2`}>
          {currentImageIndex > 0 && (<button onClick={previousImage} className="btn btn-circle btn-sm bg-black/50 text-white border-none hover:bg-black/70">❮</button>)}
          {currentImageIndex < property.images.length - 1 && (<button onClick={nextImage} className="btn btn-circle btn-sm bg-black/50 text-white border-none hover:bg-black/70">❯</button>)}
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {property.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {property.title}
          {property.available && (
            <div className="badge badge-secondary text-white text-xs">Available</div>
          )}
        </h2>
        <p className="text-sm text-gray-600">{property.location}</p>
        <ReviewStars 
          rating={property.rating}
          reviewCount={property.reviews.length}
          propertyId={property.id}
        />
        <p className="text-xl font-bold">${property.price}/night</p>
        <div className="card-actions justify-end">
          <button 
            onClick={handleViewDetails}
            className="btn btn-primary bg-primary hover:bg-primary/80 text-white border-none"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};