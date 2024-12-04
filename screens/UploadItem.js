import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Back Button Icon
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase"; // Firebase config file

const UploadItem = ({ navigation }) => {
  const [formData, setFormData] = useState({
    photo: null,
    itemName: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for submission

  const storage = getStorage(app);
  const firestore = getFirestore(app);

  // Function to pick image from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri; // Correct access to URI
        setFormData((prevState) => ({ ...prevState, photo: selectedImageUri }));
      } else {
        Alert.alert("No Image Selected", "Please select an image.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to handle the item submission
  const handleSubmit = async () => {
    const { photo, itemName, location, message } = formData;

    if (!photo || !itemName || !location) {
      Alert.alert("Error", "Please fill in all required fields and upload an image.");
      return;
    }

    setLoading(true); // Show loading indicator during submission

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `uploads/${Date.now()}.jpg`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(imageRef);

      // Save item details in Firestore
      await addDoc(collection(firestore, "donations"), {
        itemName,
        location,
        message,
        photoURL: downloadURL,
        createdAt: new Date(),
      });

      setLoading(false); // Hide loading indicator
      Alert.alert("Success", "Your item has been uploaded!");
      navigation.goBack(); // Navigate back after successful submission
    } catch (error) {
      setLoading(false); // Hide loading indicator in case of error
      Alert.alert("Error", "Failed to upload the item. Please try again.");
      console.error("Error uploading item:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="#74112f"
          onPress={() => navigation.goBack()} // Go back on press
        />
        <Text style={styles.title}>Upload an Item</Text>
      </View>

      <Text style={styles.subtitle}>
        Add a new item to donate. Upload an image, provide a description, and set your location.
      </Text>

      {/* Image picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
        {formData.photo ? (
          <Image source={{ uri: formData.photo }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      {/* Form inputs */}
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={formData.itemName}
        onChangeText={(value) => handleInputChange("itemName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={formData.location}
        onChangeText={(value) => handleInputChange("location", value)}
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Add a message (optional)"
        value={formData.message}
        onChangeText={(value) => handleInputChange("message", value)}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4f2",
    paddingTop: Platform.OS === "android" ? 70 : 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    color: "#2f332a",
    marginLeft: 62,
    borderBottomColor: "#74112f",
    borderBottomWidth: 5,
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular",
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#999",
    fontSize: 14,
    fontFamily: "Raleway_400Regular",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    paddingLeft: 10,
    fontFamily: "Raleway_400Regular",
    fontSize: 16,
    width: "100%",
    paddingVertical: 10,
  },
  messageInput: {
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#74112f",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
    color: "#fff",
  },
  cancelText: {
    color: "#74112f",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UploadItem;