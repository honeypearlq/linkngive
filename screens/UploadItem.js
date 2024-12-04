import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UploadItem = ({ navigation }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    contactNumber: '',
    location: '',
  });

  // Handle input field changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle item upload to Firestore
  const handleUpload = async () => {
    const { itemName, description, contactNumber, location } = formData;
    if (!itemName || !description || !contactNumber || !location) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      await firestore().collection('donations').add({
        itemName,
        description,
        contactNumber,
        location,
        createdAt: firestore.FieldValue.serverTimestamp(), // Add timestamp
      });
      Alert.alert('Success', 'Item uploaded successfully.');
      navigation.goBack(); // Navigate back after successful upload
    } catch (error) {
      Alert.alert('Error', 'Failed to upload item.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload an Item</Text>

      {/* Input fields */}
      {['itemName', 'description', 'contactNumber', 'location'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={capitalizeFirstLetter(field)}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      ))}

      {/* Upload button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

// Helper function to capitalize the first letter of input labels
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 15, paddingLeft: 10 },
  uploadButton: { backgroundColor: '#4CAF50', padding: 15, alignItems: 'center' },
  uploadButtonText: { color: '#fff' },
});

export default UploadItem;