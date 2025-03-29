import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Dashboard: undefined;
};

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    try {
      console.log('Attempting to register with:', { name, email, phone, password, role });
      
      // Validate required fields
      if (!name || !email || !password || !phone) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const apiUrl = 'http://192.168.1.67:5000/api/auth/register';
      console.log('Making request to:', apiUrl);
      
      const res = await axios.post(apiUrl, { 
        name, 
        email, 
        phone, 
        password, 
        role: role || 'user' // Set default role if not specified
      });
      
      console.log('Registration successful:', res.data);
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error('Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      // Handle registration error with more specific messages
      const errorMessage = error.response?.data?.message 
        || (error.message === 'Network Error' ? 'Cannot connect to server. Please check your internet connection.' : error.message)
        || 'An unexpected error occurred';
      
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Phone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <Text>Password:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Text>Role:</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default Register;