import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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
      const res = await axios.post('http://your-backend-api/api/auth/register', { name, email, phone, password, role });
      // Handle successful registration (e.g., store token, navigate to dashboard)
      navigation.navigate('Dashboard');
    } catch (err) {
      console.error(err);
      // Handle registration error
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