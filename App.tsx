import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Import screens
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardScreen from './screens/DashboardScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import ReportScreen from './screens/ReportScreen';
import ChatBotScreen from './screens/ChatBotScreen';

// Define types for navigation
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Appointments: undefined;
  Reports: undefined;
  ChatBot: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Stack Navigator (For Authentication & Main Screens)
const StackNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Healthcare Dashboard' }} />
      <Stack.Screen name="Appointments" component={AppointmentScreen} options={{ title: 'My Appointments' }} />
      <Stack.Screen name="Reports" component={ReportScreen} options={{ title: 'Medical Reports' }} />
      <Stack.Screen name="ChatBot" component={ChatBotScreen} options={{ title: 'Health Assistant' }} />
    </Stack.Navigator>
  );
};

// Drawer Navigator (Wraps Stack Navigator)
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
