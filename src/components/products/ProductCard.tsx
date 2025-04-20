
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/types/product';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const navigateToProduct = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <Card 
      className="product-card overflow-hidden cursor-pointer"
      onClick={navigateToProduct}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={cn(
              "h-5 w-5 transition-colors", 
              isWishlisted ? "heart-icon active" : "text-gray-500"
            )}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 truncate">{product.category}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-wishlist-primary">${product.price.toFixed(2)}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-wishlist-primary text-wishlist-primary hover:bg-wishlist-primary hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigateToProduct();
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
