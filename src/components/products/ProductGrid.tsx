
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { useNavigation } from '@react-navigation/native';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  const navigation = useNavigation();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-md animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-800">No products found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} navigation={navigation} />
      ))}
    </div>
  );
};

export default ProductGrid;
