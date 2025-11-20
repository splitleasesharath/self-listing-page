export interface ListingFormData {
  spaceSnapshot: {
    listingName: string;
    typeOfSpace: string;
    bedrooms: number;
    typeOfKitchen: string;
    beds: number;
    typeOfParking: string;
    bathrooms: number;
    address: {
      fullAddress: string;
      number: string;
      street: string;
      city: string;
      state: string;
      zip: string;
      neighborhood: string;
      validated: boolean;
      latitude: number | null;
      longitude: number | null;
    };
  };
  leaseStyles: object;
  pricing: object;
  rules: object;
  photos: object;
  reviews: object;
}

export interface SectionStatus {
  spaceSnapshot: boolean;
  leaseStyles: boolean;
  pricing: boolean;
  rules: boolean;
  photos: boolean;
  reviews: boolean;
}
