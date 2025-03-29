import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ReportScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Medical Reports</Text>
      {/* Add report-related components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportScreen;