import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardScreen from './components/screens/DashboardScreen';
import AppointmentScreen from './components/screens/AppointmentScreen';
import ReportScreen from './components/screens/ReportScreen';
import ChatBotScreen from './components/screens/ChatBotScreen';
import UploadReport from './components/MedicalReports/UploadReport';
import ViewReports from './components/MedicalReports/ViewReports';

// Define types for navigation
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Appointments: undefined;
  Reports: undefined;
  ChatBot: undefined;
  UploadReports: undefined;
  ViewReports: undefined;
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
      <Stack.Screen name="UploadReports" component={UploadReport} options={{ title: 'Upload Reports' }} />
      <Stack.Screen name="ViewReports" component={ViewReports} options={{ title: 'View Reports' }} />
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
