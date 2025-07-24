export interface Hotel {
  id: number;
  name: string;
  location: string;
  description?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface HotelInput {
  name: string;
  location: string;
  description?: string;
}