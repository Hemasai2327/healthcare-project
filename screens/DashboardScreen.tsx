import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Appointments: undefined;
  Reports: undefined;
  ChatBot: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
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
  },
});

export default DashboardScreen;