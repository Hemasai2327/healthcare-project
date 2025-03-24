import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DocumentPicker, {
  types,
  DocumentPickerResponse,
  isCancel,
} from 'react-native-document-picker';
import axios from 'axios';

const UploadReports: React.FC = () => {
  const [reportName, setReportName] = useState('');
  const [file, setFile] = useState<DocumentPickerResponse | null>(null);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.allFiles],
      });
      if (Array.isArray(res)) {
        setFile(res[0]);
      } else {
        setFile(res);
      }
    } catch (err) {
      if (isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error(err);
        Alert.alert('Error', 'Failed to pick file.');
      }
    }
  };

  const handleUpload = async () => {
    if (!reportName || !file) {
      Alert.alert('Error', 'Please provide a report name and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('reportName', reportName);
    
    // Create a blob from the file uri
    const fileBlob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = reject;
      xhr.responseType = 'blob';
      xhr.open('GET', file.uri, true);
      xhr.send();
    });

    formData.append('file', fileBlob, file.name || 'report');

    try {
      const res = await axios.post('http://your-backend-api/api/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Report uploaded successfully!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to upload report.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Report Name:</Text>
      <TextInput
        style={styles.input}
        value={reportName}
        onChangeText={setReportName}
        placeholder="Enter report name"
      />
      <Button title="Pick File" onPress={handleFilePick} />
      {file && <Text>Selected File: {file.name}</Text>}
      <Button title="Upload Report" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default UploadReports;