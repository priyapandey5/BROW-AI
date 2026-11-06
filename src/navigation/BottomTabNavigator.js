// src/navigation/BottomTabNavigator.js
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import RadarScreen from '../screens/RadarScreen';
import CopilotChatScreen from '../screens/CopilotChatScreen';
import AlphaPortfolioScreen from '../screens/AlphaPortfolioScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#090D14',
          borderTopColor: '#1E293B',
          borderTopWidth: 1,
          height: 60 + Math.max(insets.bottom, 12), // Dynamic inset calculation
          paddingBottom: Math.max(insets.bottom, 10), // Buttons ke upar perfect spacing
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00F2FE',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {/* Aapke existing Tab.Screen components yahan rahenge */}
    </Tab.Navigator>
  );
}