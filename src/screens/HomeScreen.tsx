
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types/product';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const categories = ["all", ...Array.from(new Set(products.map(product => product.category.toLowerCase())))];
  
  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(product => product.category.toLowerCase() === activeCategory);
  
  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        activeCategory === item && styles.activeCategory
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text 
        style={[
          styles.categoryText,
          activeCategory === item && styles.activeCategoryText
        ]}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );
  
  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} navigation={navigation} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header navigation={navigation} showSearch={true} />
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Discover Products</Text>
          <Text style={styles.subtitle}>Browse and save your favorites</Text>
        </View>
        
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryTab}
          keyExtractor={(item) => item}
          style={styles.categoryList}
          showsHorizontalScrollIndicator={false}
        />
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading products...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubText}>Try another category</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.productsList}
          />
        )}
      </View>
      
      <Footer navigation={navigation} activeTab="home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoryList: {
    flexGrow: 0,
    marginBottom: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeCategory: {
    backgroundColor: '#9b87f5',
    borderColor: '#9b87f5',
  },
  categoryText: {
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  productsList: {
    paddingBottom: 80,
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
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
