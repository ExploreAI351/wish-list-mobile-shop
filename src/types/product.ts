
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: number;
  docId?: string; // Firebase document ID for wishlist items
}
