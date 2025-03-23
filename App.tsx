import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardScreen from './screens/DashboardScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import ReportScreen from './screens/ReportScreen';
import ChatBotScreen from './screens/ChatBotScreen';

// Import types
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ 
            headerLeft: () => null,
            title: 'Healthcare Dashboard'
          }}
        />
        <Stack.Screen 
          name="Appointments" 
          component={AppointmentScreen}
          options={{ title: 'My Appointments' }}
        />
        <Stack.Screen 
          name="Reports" 
          component={ReportScreen}
          options={{ title: 'Medical Reports' }}
        />
        <Stack.Screen 
          name="ChatBot" 
          component={ChatBotScreen}
          options={{ title: 'Health Assistant' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
