import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthScreen from './src/screens/AuthScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import StockDetailScreen from './src/screens/StockDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#090D14" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#090D14' },
          }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="StockDetail" component={StockDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}