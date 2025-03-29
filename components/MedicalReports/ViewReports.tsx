import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser'; // Open PDF in Browser
import { AntDesign } from '@expo/vector-icons';

// Define Report Type
interface Report {
  _id: string;
  title: string;
  fileUrl: string;
  type: string;
  size: number;
  createdAt: string;
}

// Props for Navigation
interface ViewReportProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const ViewReport: React.FC<ViewReportProps> = ({ navigation }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Reports on Component Mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/reports'); // Update URL if needed
      if (response.status === 200) {
        setReports(response.data.reports);
      } else {
        throw new Error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]); // Ensure reports array is empty on failure
    } finally {
      setLoading(false);
    }
  };

  // Format Date for Display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Convert File Size to KB/MB
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Open PDF in Web Browser
  const handleViewReport = async (fileUrl: string) => {
    await WebBrowser.openBrowserAsync(fileUrl);
  };

  // Render Each Report Item
  const renderReportItem = ({ item }: { item: Report }) => (
    <View style={styles.reportItem}>
      <View style={styles.reportInfo}>
        <Text style={styles.reportName}>{item.title}</Text>
        <Text style={styles.reportDescription}>{item.type}</Text>
        <Text style={styles.reportDate}>Uploaded: {formatDate(item.createdAt)}</Text>
        <Text style={styles.reportSize}>Size: {formatFileSize(item.size)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.viewButton} 
        onPress={() => handleViewReport(item.fileUrl)}
      >
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Medical Reports</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />
      ) : (
        <FlatList
          data={reports}
          renderItem={renderReportItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyState}>
              No reports uploaded yet. Upload your medical reports to view them here.
            </Text>
          }
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 12,
    color: '#999',
  },
  reportSize: {
    fontSize: 12,
    color: '#999',
  },
  viewButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default ViewReport;
