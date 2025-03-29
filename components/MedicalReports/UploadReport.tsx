import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

type RootStackParamList = {
  ViewReports: undefined;
  // Add other screens here as needed
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewReports'>;

const UploadReport: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        console.log('User cancelled document picker');
        return;
      }

      if (result.assets && result.assets[0]) {
        const file = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.mimeType || 'application/pdf',
          name: file.name,
        } as unknown as Blob);

        try {
          setLoading(true);
          const response = await axios.post('http://localhost:5000/api/reports/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.data.success) {
            navigation.navigate('ViewReports');
          } else {
            setError('Failed to upload report');
          }
        } catch (error) {
          console.error('Upload error:', error);
          setError('Error uploading report');
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No document selected');
        setError('No document selected');
      }
    } catch (error) {
      console.error('Document picker error:', error);
      setError('Error selecting document');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Medical Reports</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Upload Your Medical Reports</Text>
        <Text style={styles.subtitle}>
          Upload your medical reports in PDF format for secure storage and easy access.
        </Text>

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <TouchableOpacity 
          style={[styles.uploadButton, loading && styles.uploadButtonLoading]} 
          onPress={handleDocumentPick}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.uploadButtonText}>Choose File</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32, textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 16 },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonLoading: { opacity: 0.7 },
  uploadButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default UploadReport;
