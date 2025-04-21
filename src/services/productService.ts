
import { Product } from '../types/product';

// For demo purposes, we'll use a mock API
// In a real app, this would fetch from Firebase or a backend API using JWT token authentication
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // In a real application, you would fetch from your API with auth token
    // const token = await AsyncStorage.getItem('@auth_token');
    // return await fetch('your-api-url', {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => res.json());
    
    // For now, we'll return mock data
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  try {
    // In a real application, you would fetch a single product with auth token
    // const token = await AsyncStorage.getItem('@auth_token');
    // return await fetch(`your-api-url/${id}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => res.json());
    
    // For now, we'll find in our mock data
    return mockProducts.find(product => product.id === id);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400',
    description: 'High-quality wireless earbuds with noise cancellation. Perfect for commuting, working out, or just enjoying your favorite music without the hassle of wires.',
    category: 'Electronics',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400',
    description: 'Track your fitness and stay connected with this smartwatch. Features include heart rate monitoring, GPS, step tracking, and phone notifications.',
    category: 'Electronics',
    rating: 4.7
  },
  {
    id: '3',
    name: 'Portable Speaker',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400',
    description: 'Compact Bluetooth speaker with amazing sound quality. Water-resistant design makes it perfect for outdoor adventures or poolside parties.',
    category: 'Electronics',
    rating: 4.3
  },
  {
    id: '4',
    name: 'Leather Wallet',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400',
    description: 'Genuine leather wallet with multiple card slots. Slim design fits comfortably in your pocket while providing ample storage for cards and cash.',
    category: 'Accessories',
    rating: 4.8
  },
  {
    id: '5',
    name: 'Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400',
    description: 'Stylish and functional backpack for everyday use. Features multiple compartments, laptop sleeve, and water bottle holders.',
    category: 'Accessories',
    rating: 4.6
  },
  {
    id: '6',
    name: 'Smartphone Case',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1592805144716-febd04720a61?auto=format&fit=crop&w=400',
    description: 'Durable protective case for your smartphone. Shock-absorbent design provides excellent protection without adding bulk.',
    category: 'Accessories',
    rating: 4.4
  }
];
