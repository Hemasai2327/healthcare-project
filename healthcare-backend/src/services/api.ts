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

export default api;
