
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { StatusBar } from 'expo-status-bar';

const SearchResultsScreen = ({ route, navigation }) => {
  const { query = '' } = route.params || {};
  
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  
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
  
  const renderProductItem = ({ item }) => (
    <ProductCard product={item} navigation={navigation} />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        navigation={navigation} 
        showBack={true} 
        title={`Results for "${query}"`}
      />
      
      <View style={styles.content}>
        <Text style={styles.resultsCount}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </Text>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Searching...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found matching "{query}"</Text>
            <Text style={styles.emptySubText}>Try a different search term</Text>
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
      
      <Footer navigation={navigation} />
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
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
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

export default SearchResultsScreen;
