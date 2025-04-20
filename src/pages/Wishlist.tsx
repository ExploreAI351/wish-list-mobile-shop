
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Trash, ShoppingCart, ArrowLeft } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, isLoading } = useWishlist();
  const navigate = useNavigate();
  
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
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container px-4 py-8 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <Heart className="mx-auto h-16 w-16 text-gray-300" />
              <h2 className="mt-4 text-xl font-medium text-gray-800">Your wishlist is empty</h2>
              <p className="mt-2 text-gray-500">Browse products and add your favorites to the wishlist</p>
              <Button 
                onClick={() => navigate('/')} 
                className="mt-6 bg-wishlist-primary hover:bg-wishlist-secondary"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-100 rounded-lg">
                    <div 
                      className="h-24 w-24 flex-shrink-0 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <h3 
                        className="font-medium text-gray-900 cursor-pointer hover:text-wishlist-primary"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="mt-1 text-lg font-bold text-wishlist-primary">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline"
                        className="border-wishlist-primary text-wishlist-primary hover:bg-wishlist-primary hover:text-white"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        View Details
                      </Button>
                      
                      <Button 
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Wishlist;
