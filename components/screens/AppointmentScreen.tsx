import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { 
  getAppointments, 
  createAppointment, 
  cancelAppointment, 
  getDoctors, 
  getDoctorAvailability 
} from '../../src/services/api';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    loadAppointments();
    loadDoctors();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load doctors');
    }
  };

  const handleDoctorSelect = async (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    try {
      const response = await getDoctorAvailability(doctor.id, selectedDate.toISOString().split('T')[0]);
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      Alert.alert('Error', 'Failed to load doctor availability');
    }
  };

  const handleCreateAppointment = async () => {
    if (!selectedDoctor || !selectedTime || !reason) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await createAppointment({
        doctorId: selectedDoctor.id,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        reason,
      });
      setModalVisible(false);
      loadAppointments();
      Alert.alert('Success', 'Appointment created successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      await cancelAppointment(id);
      loadAppointments();
      Alert.alert('Success', 'Appointment cancelled successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel appointment');
    }
  };

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.doctorName}>Dr. {item.doctorName}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === 'confirmed' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelAppointment(item.id)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Book New Appointment</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            
            <FlatList
              data={doctors}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.doctorItem,
                    selectedDoctor?.id === item.id && styles.selectedDoctor,
                  ]}
                  onPress={() => handleDoctorSelect(item)}
                >
                  <Text style={styles.doctorItemText}>{item.name}</Text>
                  <Text style={styles.doctorSpecialization}>
                    {item.specialization}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event: DateTimePickerEvent, date?: Date) => date && setSelectedDate(date)}
              minimumDate={new Date()}
            />

            {availableSlots.length > 0 && (
              <View style={styles.timeSlots}>
                {availableSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.timeSlot,
                      selectedTime === slot && styles.selectedTimeSlot,
                    ]}
                    onPress={() => setSelectedTime(slot)}
                  >
                    <Text style={styles.timeSlotText}>{slot}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder="Reason for visit"
              value={reason}
              onChangeText={setReason}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleCreateAppointment}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  doctorItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
    minWidth: 120,
  },
  selectedDoctor: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  doctorItemText: {
    fontWeight: 'bold',
  },
  doctorSpecialization: {
    fontSize: 12,
    color: '#666',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  timeSlot: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    margin: 4,
  },
  selectedTimeSlot: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  timeSlotText: {
    fontSize: 12,
  },
});

export default AppointmentScreen;
