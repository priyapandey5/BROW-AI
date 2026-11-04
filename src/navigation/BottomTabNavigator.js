// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import RadarScreen from '../screens/RadarScreen';
import CopilotChatScreen from '../screens/CopilotChatScreen';
import AlphaPortfolioScreen from '../screens/AlphaPortfolioScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarActiveTintColor: COLORS.primaryLight,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Markets') iconName = focused ? 'analytics' : 'analytics-outline';
          else if (route.name === 'Radar') iconName = focused ? 'pulse' : 'pulse-outline';
          else if (route.name === 'Copilot') iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          else if (route.name === 'Alpha') iconName = focused ? 'briefcase' : 'briefcase-outline';
          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Markets" component={HomeScreen} />
      <Tab.Screen name="Radar" component={RadarScreen} />
      <Tab.Screen name="Copilot" component={CopilotChatScreen} />
      <Tab.Screen name="Alpha" component={AlphaPortfolioScreen} />
    </Tab.Navigator>
  );
}