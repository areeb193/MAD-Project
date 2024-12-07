import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
          title: 'explore',
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
          title: 'Home Screen',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
