
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FooterProps {
  navigation: any;
  activeTab?: string;
}

const Footer = ({ navigation, activeTab = '' }: FooterProps) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
      route: 'Home',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: 'grid-outline',
      activeIcon: 'grid',
      route: 'Categories',
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'heart-outline',
      activeIcon: 'heart',
      route: 'Wishlist',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person-outline',
      activeIcon: 'person',
      route: 'Dashboard',
    },
  ];
  
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabButton}
          onPress={() => navigation.navigate(tab.route)}
        >
          <Ionicons
            name={tab.id === activeTab ? tab.activeIcon : tab.icon}
            size={24}
            color={tab.id === activeTab ? '#9b87f5' : '#777'}
          />
          <Text
            style={[
              styles.tabLabel,
              tab.id === activeTab && styles.activeTabLabel
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#9b87f5',
    fontWeight: '500',
  },
});

export default Footer;
