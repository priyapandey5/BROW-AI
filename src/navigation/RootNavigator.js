// src/navigation/RootNavigator.js
import React, { useState } from 'react';
import { View } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import StockDetailScreen from '../screens/StockDetailScreen';
import HomeScreen from '../screens/HomeScreen';

export default function RootNavigator() {
  const [selectedStock, setSelectedStock] = useState(null);

  if (selectedStock) {
    return (
      <StockDetailScreen
        stock={selectedStock}
        onBack={() => setSelectedStock(null)}
      />
    );
  }

  return (
    <BottomTabNavigator
      screenProps={{
        onSelectStock: (stock) => setSelectedStock(stock),
      }}
    />
  );
}