
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/productService';
import ProductGrid from '@/components/products/ProductGrid';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const categories = ["all", ...new Set(products.map(product => product.category.toLowerCase()))];
  
  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(product => product.category.toLowerCase() === activeCategory);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <section className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Discover and Save Your Favorite Products
            </h1>
            <p className="text-gray-600 mt-2">
              Browse our collection and add items to your wishlist
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full max-w-xl"
            >
              <TabsList className="w-full grid grid-cols-3 md:grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <ProductGrid 
            products={filteredProducts} 
            isLoading={isLoading} 
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
