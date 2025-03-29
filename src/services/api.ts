import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://staging.yourapi.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const register = (userData: {
  name: string;
  email: string;
  password: string;
}) => api.post('/auth/register', userData);

// Report APIs
export const getReports = () => 
  api.get('/reports');

export const uploadReport = (formData: FormData) => 
  api.post('/reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getReportById = (id: string) => 
  api.get(`/reports/${id}`);

export const deleteReport = (id: string) =>
  api.delete(`/reports/${id}`);

// Appointment APIs
export const getAppointments = () =>
  api.get('/appointments');

export const createAppointment = (appointmentData: {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}) => api.post('/appointments', appointmentData);

export const updateAppointment = (id: string, updateData: {
  date?: string;
  time?: string;
  reason?: string;
  status?: 'confirmed' | 'cancelled' | 'completed';
}) => api.put(`/appointments/${id}`, updateData);

export const cancelAppointment = (id: string) =>
  api.put(`/appointments/${id}`, { status: 'cancelled' });

// Doctor APIs
export const getDoctors = () =>
  api.get('/doctors');

export const getDoctorAvailability = (doctorId: string, date: string) =>
  api.get(`/doctors/${doctorId}/availability`, { params: { date } });

export default api;
