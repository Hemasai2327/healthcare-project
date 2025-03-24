import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      {/* Add appointment-related content here */}
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
  },
});

export default AppointmentScreen;
