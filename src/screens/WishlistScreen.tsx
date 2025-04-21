
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useWishlist } from '../contexts/WishlistContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Ionicons } from '@expo/vector-icons';
import WishlistItem from '../components/wishlist/WishlistItem';
import { StatusBar } from 'expo-status-bar';

const WishlistScreen = ({ navigation }) => {
  const { wishlistItems, isLoading } = useWishlist();
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title="My Wishlist" showBack={true} />
        <View style={styles.loadingContainer}>
          <Text>Loading wishlist...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const renderWishlistItem = ({ item }) => (
    <WishlistItem item={item} navigation={navigation} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header navigation={navigation} title="My Wishlist" showBack={true} />
      
      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#e0e0e0" />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyMessage}>Browse products and add your favorites to the wishlist</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.wishlistContainer}
        />
      )}
      
      <Footer navigation={navigation} activeTab="wishlist" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  browseButton: {
    backgroundColor: '#9b87f5',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 24,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  wishlistContainer: {
    padding: 16,
  },
});

export default WishlistScreen;
