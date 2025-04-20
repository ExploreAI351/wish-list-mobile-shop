
import { Product } from '@/types/product';

// For demo purposes, we'll use a mock API
// In a real app, this would fetch from Firebase or another backend
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // In a real application, you would fetch from your API
    // return await fetch('your-api-url').then(res => res.json());
    
    // For now, we'll return mock data
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  try {
    // In a real application, you would fetch a single product
    // return await fetch(`your-api-url/${id}`).then(res => res.json());
    
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
    description: 'High-quality wireless earbuds with noise cancellation.',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400',
    description: 'Track your fitness and stay connected with this smartwatch.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Portable Speaker',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400',
    description: 'Compact Bluetooth speaker with amazing sound quality.',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Leather Wallet',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400',
    description: 'Genuine leather wallet with multiple card slots.',
    category: 'Accessories'
  },
  {
    id: '5',
    name: 'Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400',
    description: 'Stylish and functional backpack for everyday use.',
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Smartphone Case',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1592805144716-febd04720a61?auto=format&fit=crop&w=400',
    description: 'Durable protective case for your smartphone.',
    category: 'Accessories'
  }
];
