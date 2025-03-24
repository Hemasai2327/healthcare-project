import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="Appointments" onPress={() => navigation.navigate('Appointments')} />
      <Button title="Medical Reports" onPress={() => navigation.navigate('Reports')} />
      <Button title="ChatBot" onPress={() => navigation.navigate('ChatBot')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default Dashboard;