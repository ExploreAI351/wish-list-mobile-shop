
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../services/productService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
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
      navigation.navigate('Login');
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
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} showBack={true} />
        <View style={styles.loadingContainer}>
          <Text>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} showBack={true} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Product not found</Text>
          <Text style={styles.errorMessage}>The product you're looking for doesn't exist or has been removed.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header navigation={navigation} showBack={true} />
      
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rating: </Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= (product.rating || 4) ? "star" : "star-outline"}
                size={18}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingValue}> ({product.rating || 4.0})</Text>
          </View>
          
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.wishlistButton,
                isWishlisted && styles.wishlistButtonActive
              ]}
              onPress={handleWishlistToggle}
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={20}
                color={isWishlisted ? "#fff" : "#9b87f5"}
                style={styles.buttonIcon}
              />
              <Text
                style={[
                  styles.wishlistButtonText,
                  isWishlisted && styles.wishlistButtonTextActive
                ]}
              >
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cartButton}>
              <Ionicons name="cart-outline" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
  },
  ratingValue: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9b87f5',
    marginTop: 12,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  actionButtons: {
    marginTop: 24,
    flexDirection: 'column',
    gap: 12,
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#9b87f5',
    borderRadius: 8,
    paddingVertical: 12,
  },
  wishlistButtonActive: {
    backgroundColor: '#9b87f5',
    borderColor: '#9b87f5',
  },
  wishlistButtonText: {
    fontSize: 16,
    color: '#9b87f5',
    fontWeight: '500',
  },
  wishlistButtonTextActive: {
    color: '#fff',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
  },
  cartButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9b87f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default ProductDetailsScreen;
