
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import DashboardCard from '../components/dashboard/DashboardCard';

const DashboardScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  
  const menuItems = [
    {
      id: 'profile',
      title: 'My Profile',
      icon: 'person-outline',
      screen: 'Profile',
      color: '#6366f1',
    },
    {
      id: 'wishlist',
      title: 'My Wishlist',
      icon: 'heart-outline',
      screen: 'Wishlist',
      color: '#ec4899',
    },
    {
      id: 'orders',
      title: 'My Orders',
      icon: 'list-outline',
      screen: 'Orders',
      color: '#f59e0b',
    },
    {
      id: 'addresses',
      title: 'My Addresses',
      icon: 'location-outline',
      screen: 'Addresses',
      color: '#10b981',
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: 'card-outline',
      screen: 'PaymentMethods',
      color: '#0ea5e9',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      screen: 'Settings',
      color: '#6b7280',
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header navigation={navigation} title="Dashboard" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerSection}>
          <View style={styles.userInfo}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userEmail}>{currentUser?.email || 'User'}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.menuGrid}>
          {menuItems.map(item => (
            <DashboardCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              color={item.color}
              onPress={() => {
                if (navigation.canGoBack() && item.screen === 'Profile') {
                  navigation.goBack();
                } else {
                  navigation.navigate(item.screen);
                }
              }}
            />
          ))}
        </View>
        
        <View style={styles.recentSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.emptyRecents}>
            <Text style={styles.emptyText}>No recently viewed products</Text>
          </View>
        </View>
      </ScrollView>
      
      <Footer navigation={navigation} activeTab="profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: '#9b87f5',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9b87f5',
  },
  userDetails: {
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#f3f4f6',
  },
  userEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  recentSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#9b87f5',
  },
  emptyRecents: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});

export default DashboardScreen;
