import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const appointments = [
  { id: '1', doctor: 'Dr. Smith', date: '2025-04-01' },
  { id: '2', doctor: 'Dr. Johnson', date: '2025-04-15' },
];

const AppointmentList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Doctor: {item.doctor}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default AppointmentList;