import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
      initialRouteName="Markets"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS?.primaryLight || '#00F2FE',
        tabBarInactiveTintColor: COLORS?.textSecondary || '#64748B',
        tabBarStyle: {
          backgroundColor: COLORS?.surface || '#111827',
          borderTopColor: COLORS?.border || '#1E293B',
          borderTopWidth: 1,
          height: Platform.OS === 'android' ? 62 + insets.bottom : 58 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Markets') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Radar') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'Copilot') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Alpha') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Markets" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Markets' }}
      />
      <Tab.Screen 
        name="Radar" 
        component={RadarScreen} 
        options={{ tabBarLabel: 'Radar' }}
      />
      <Tab.Screen 
        name="Copilot" 
        component={CopilotChatScreen} 
        options={{ tabBarLabel: 'Copilot' }}
      />
      <Tab.Screen 
        name="Alpha" 
        component={AlphaPortfolioScreen} 
        options={{ tabBarLabel: 'Alpha' }}
      />
    </Tab.Navigator>
  );
}