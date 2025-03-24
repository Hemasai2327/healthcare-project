import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

export default AuthNavigator;