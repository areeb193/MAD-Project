import { Tabs } from 'expo-router';
import React from 'react';
import { Link, Stack } from "expo-router";
import { Pressable } from 'react-native'; // Add Pressable import
import { FontAwesome } from '@expo/vector-icons'; // Add FontAwesome import
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CartScreen from './CartScreen';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-add' : 'person-add-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'HomeScreen',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* Corrected to use `component` instead of `screen` */}
      <Tabs.Screen
        name="CartScreen"
        
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
       
    </Tabs>
  );
}
