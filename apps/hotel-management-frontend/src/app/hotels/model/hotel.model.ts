export interface Hotel {
    id: string;
    name: string;
    location: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
  export type HotelInput = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;
  