import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DonateItem = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate an Item</Text>
      <Text style={styles.subtitle}>
        Choose an option to either upload a new item or manage your posted items.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UploadItem')}
        >
          <Text style={styles.buttonText}>Upload Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageItems')}
        >
          <Text style={styles.buttonText}>Manage Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  buttonContainer: { alignItems: 'center' },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});

export default DonateItem;
