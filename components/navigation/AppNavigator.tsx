import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import ReportScreen from '../screens/ReportScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import AuthScreen from '../screens/AuthScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Appointments" component={AppointmentScreen} />
      <Drawer.Screen name="Reports" component={ReportScreen} />
      <Drawer.Screen name="Chat Bot" component={ChatBotScreen} />
      <Drawer.Screen name="Auth" component={AuthScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;