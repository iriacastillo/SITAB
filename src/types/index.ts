export type BusinessSize = "1-2" | "3-5" | "6-10" | "más de 10";

export type ProductCategory = "Panadería" | "Fruta" | "Regalos" | "Papelería" | "Servicios" | "Otros";

export type BusinessCategory = "Alimentación" | "Artesanía" | "Papelería" | "Regalos" | "Servicios";

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ProductCategory;
  image: string;
}

export interface Business {
  id: string;
  name: string;
  cif: string;
  responsibleName: string;
  email: string;
  phone: string;
  size: BusinessSize;
  description: string;
  address: string;
  information: string;
  openingTime: string;
  closingTime: string;
  website?: string;
  category: BusinessCategory;
  image: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  description: string;
  neighborhood?: string;
  image: string;
}

export type ReservationStatus = "Confirmada" | "Anulada" | "Recogida";

export interface Reservation {
  id: string;
  productId: string;
  businessId: string;
  productName: string;
  businessName: string;
  pickupDate: string;
  pickupTime: string;
  status: ReservationStatus;
}

export interface FavoriteState {
  businessIds: string[];
  productIds: string[];
}
