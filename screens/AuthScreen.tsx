import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Auth Screen</Text>
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

export default AuthScreen;