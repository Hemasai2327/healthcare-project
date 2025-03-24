import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Dashboard: undefined;
  Register: undefined;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://your-backend-api/api/auth/login', { email, password });
      // Assume backend returns a token or success response
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Dashboard');
    } catch (err: unknown) {
      console.error(err);
      const error = err as AxiosError<{
        message?: string;
        [key: string]: any;
      }>;
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Invalid email or password.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
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

export default Login;