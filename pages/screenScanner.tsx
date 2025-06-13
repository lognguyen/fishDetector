import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageScanner from '../components/imageScanner';

const ScannerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Scanner</Text>
      <ImageScanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ScannerScreen;