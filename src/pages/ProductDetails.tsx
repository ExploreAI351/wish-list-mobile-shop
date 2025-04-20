import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/productService';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { currentUser } = useAuth();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id || ''),
    enabled: !!id
  });
  
  const isWishlisted = product ? isInWishlist(product.id) : false;
  
  const handleWishlistToggle = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (product) {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wishlist-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div>
        <Navbar />
        <div className="container px-4 py-12 mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-6 bg-wishlist-primary hover:bg-wishlist-secondary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-wishlist-primary">${product.price.toFixed(2)}</span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800">Description</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
              
              <div className="mt-auto pt-8 flex gap-4">
                <Button
                  variant={isWishlisted ? "outline" : "default"}
                  className={cn(
                    "flex-1",
                    isWishlisted 
                      ? "border-wishlist-primary text-wishlist-primary" 
                      : "bg-wishlist-primary hover:bg-wishlist-secondary"
                  )}
                  onClick={handleWishlistToggle}
                >
                  <Heart 
                    className={cn("mr-2 h-4 w-4", isWishlisted && "fill-wishlist-primary")} 
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                
                <Button
                  variant="default"
                  className="flex-1 bg-gray-800 hover:bg-gray-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
