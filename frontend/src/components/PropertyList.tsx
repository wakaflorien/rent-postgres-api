"use client";
import { Property } from "../types";
import { PropertyCard } from "./PropertyCard";

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList = ({ properties }: PropertyListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 p-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};