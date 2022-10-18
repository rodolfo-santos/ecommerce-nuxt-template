export interface IProduct {
  id: string;
  name: string;
  price: number;
  short_description: string;
  full_description: string;
  inventory: number;
  gallery: string[];
  categories: string[];
  variations: string[];
  weight_kg: number;
  height_cm: number;
  width_cm: number;
  length_cm: number;
  promotion: boolean;
  promotional_price: number;
  publish: boolean;
}
