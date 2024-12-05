import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import SuccessNotificationModal from "./SuccessNotificationModal"; // Import the modal component

const UploadItem = ({ navigation }) => {
  const [formData, setFormData] = useState({
    photo: null,
    itemName: "",
    location: "",
    message: "",
    donorName: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData((prevState) => ({
            ...prevState,
            donorName: data.name,
          }));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setFormData((prevState) => ({ ...prevState, photo: selectedImageUri }));
      } else {
        Alert.alert("No Image Selected", "Please select an image.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const { photo, itemName, location, message, donorName } = formData;

    if (!photo || !itemName || !location || !donorName) {
      Alert.alert("Error", "Please fill in all required fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "donations"), {
        itemName,
        location,
        message,
        donorName,
        photoURL: photo,
        createdAt: new Date(),
      });

      setLoading(false);
      setModalVisible(true); // Show success modal after upload
      // navigation.goBack(); // Optionally, navigate back after success
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to upload the item. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="#74112f"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Upload an Item</Text>
      </View>

      <Text style={styles.subtitle}>
        Add a new item to donate. Upload an image, provide a description, and set your location.
      </Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
        {formData.photo ? (
          <Image source={{ uri: formData.photo }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Upload Image</Text>
        )}
      </TouchableOpacity>

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
        style={styles.input}
        placeholder="Donor's Name"
        value={formData.donorName}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Add a message (optional)"
        value={formData.message}
        onChangeText={(value) => handleInputChange("message", value)}
        multiline
      />

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

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <SuccessNotificationModal
        isModalVisible={modalVisible}
        setIsModalVisible={setModalVisible}
        message="Your item has been uploaded successfully!"
      />
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