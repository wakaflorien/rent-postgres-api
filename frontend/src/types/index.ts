export interface User {
    id: string;
    name: string;
    email: string;
    role: 'host' | 'renter';
    avatar?: string;
  }
  
  export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    amenities: string[];
    hostId: string;
    rating: number;
    reviews: Review[];
    available: boolean;
  }
  
  export interface Review {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }
  