
import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { Product } from '../types/product';

interface WishlistContextType {
  wishlistItems: Product[];
  isLoading: boolean;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!currentUser) {
        setWishlistItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const wishlistQuery = query(
          collection(db, 'wishlists'),
          where('userId', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(wishlistQuery);
        const items: Product[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: data.productId,
            name: data.name,
            price: data.price,
            image: data.image,
            description: data.description,
            category: data.category,
            rating: data.rating || 4,
            docId: doc.id
          });
        });
        
        setWishlistItems(items);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  const addToWishlist = async (product: Product) => {
    if (!currentUser) {
      // Alert could be replaced with a Toast or other notification in a real app
      alert('Please login to add items to your wishlist');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'wishlists'), {
        userId: currentUser.uid,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        rating: product.rating || 4,
        createdAt: new Date()
      });

      setWishlistItems([...wishlistItems, { ...product, docId: docRef.id }]);
      // Success notification
      alert(`${product.name} added to wishlist!`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!currentUser) return;

    try {
      const itemToRemove = wishlistItems.find(item => item.id === productId);
      if (itemToRemove && itemToRemove.docId) {
        await deleteDoc(doc(db, 'wishlists', itemToRemove.docId));
        setWishlistItems(wishlistItems.filter(item => item.id !== productId));
        // Success notification
        alert('Item removed from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove item from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const value: WishlistContextType = {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
