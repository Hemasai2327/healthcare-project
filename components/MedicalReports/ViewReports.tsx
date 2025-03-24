import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

interface Report {
  id: number;
  name: string;
  url: string;
}

const ViewReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://your-backend-api/api/reports');
        setReports(res.data);
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Failed to fetch reports.');
      }
    };

    fetchReports();
  }, []);

  const handleDownload = (url: string) => {
    // Implement download functionality here
    Alert.alert('Download', `Download report from: ${url}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text style={styles.reportName}>{item.name}</Text>
            <Button title="Download" onPress={() => handleDownload(item.url)} />
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
  reportItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportName: {
    fontSize: 16,
  },
});

export default ViewReports;