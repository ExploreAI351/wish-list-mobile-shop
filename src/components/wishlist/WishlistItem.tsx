
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../contexts/WishlistContext';

const WishlistItem = ({ item, navigation }) => {
  const { removeFromWishlist } = useWishlist();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
        >
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.productCategory}>{item.category}</Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= (item.rating || 4) ? "star" : "star-outline"}
              size={14}
              color="#FFD700"
            />
          ))}
        </View>
        
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9b87f5',
    marginTop: 4,
  },
  actionContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  detailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9b87f5',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  detailsButtonText: {
    color: '#9b87f5',
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#f43f5e',
    borderRadius: 6,
    padding: 6,
  },
});

export default WishlistItem;
