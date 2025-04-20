
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/productService';
import ProductGrid from '@/components/products/ProductGrid';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  
  useEffect(() => {
    if (query && allProducts.length > 0) {
      const searchTerms = query.toLowerCase().split(' ');
      
      const filtered = allProducts.filter(product => {
        const productText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
        return searchTerms.some(term => productText.includes(term));
      });
      
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, allProducts]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-2xl font-bold text-gray-800">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        
        <ProductGrid 
          products={filteredProducts} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default SearchResults;
