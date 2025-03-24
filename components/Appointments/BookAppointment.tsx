import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  AppointmentList: undefined;
  BookAppointment: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'BookAppointment'>;

const BookAppointment: React.FC<Props> = ({ navigation }) => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');

  const bookAppointment = () => {
    // Logic to book appointment
    navigation.navigate('AppointmentList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <TextInput
        style={styles.input}
        placeholder="Doctor"
        value={doctor}
        onChangeText={setDoctor}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Book" onPress={bookAppointment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default BookAppointment;
