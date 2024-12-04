import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db, auth, doc, updateDoc, getDoc, deleteDoc, EmailAuthProvider, reauthenticateWithCredential } from "../firebase";
import { useFonts } from "expo-font";
import { Raleway_400Regular, Raleway_700Bold } from "@expo-google-fonts/raleway";

const Profile = ({ navigation }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "+63", // Default phone number starts with +63
    address: "",
  });
  const [age, setAge] = useState(null); // Store age

  // Load fonts using the expo-font hook
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Fetch profile data from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            ...data,
            email: auth.currentUser.email,
          });
          setProfileImage(data.profileImage || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Save changes to Firestore
  const handleEditToggle = async () => {
    if (isEditable) {
      // Validate phone number length
      if (profileData.phone.length !== 13) {
        Alert.alert("Error", "Phone number must be 12 characters (including +63).");
        return;
      }

      // Validate email format
      if (!profileData.email.endsWith(".com")) {
        Alert.alert("Error", "Email must end with '.com'.");
        return;
      }

      // Validate age (Date of Birth)
      if (!isValidAge(profileData.dob)) {
        Alert.alert("Error", "Please enter a valid date of birth.");
        return;
      }

      if (
        !profileData.name ||
        !profileData.dob ||
        !profileData.phone ||
        !profileData.address
      ) {
        Alert.alert("Error", "Please fill in all fields before saving.");
        return;
      }

      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          ...profileData,
          profileImage: profileImage || null,
        });
        Alert.alert("Profile Updated", "Your profile has been updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditable(!isEditable);
  };

  // Pick profile image
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        setProfileImage(uri);
        setProfileData((prevData) => ({ ...prevData, profileImage: uri }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // Re-authenticate before deleting account
  const reauthenticateUser = async () => {
    const user = auth.currentUser;
    const email = user.email;
    const password = prompt("Please enter your password");

    if (password) {
      const credential = EmailAuthProvider.credential(email, password);
      try {
        await reauthenticateWithCredential(user, credential);
        return true; 
      } catch (error) {
        console.error("Reauthentication failed:", error);
        Alert.alert("Error", "Reauthentication failed. Please try again.");
        return false; 
      }
    }
    return false;
  };

  // Handle account deletion with confirmation
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Proceed",
          style: "destructive",
          onPress: async () => {
            const isReauthenticated = await reauthenticateUser();
            if (!isReauthenticated) return;

            try {
              const userRef = doc(db, "users", auth.currentUser.uid);
              await deleteDoc(userRef);
              await auth.currentUser.delete();
              Alert.alert("Account Deleted", "Your account has been deleted successfully.");
              navigation.navigate("SignUp");
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert("Error", "Failed to delete your account. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Automatically format phone number
  const handlePhoneChange = (text) => {
    if (!text.startsWith("+63")) {
      setProfileData({ ...profileData, phone: "+63" + text.replace(/[^0-9]/g, "") });
    } else {
      setProfileData({ ...profileData, phone: text.replace(/[^0-9+]/g, "") });
    }
  };

  // Automatically format date of birth (MM/DD/YY)
  const handleDobChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, "");
    if (formattedText.length > 6) {
      formattedText = formattedText.slice(0, 6);
    }
    if (formattedText.length > 4) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2, 4) + "/" + formattedText.slice(4, 6);
    } else if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2, 4);
    }
    setProfileData({ ...profileData, dob: formattedText });

    // Update age based on dob
    const age = calculateAge(formattedText);
    setAge(age);
  };

  // Function to calculate age from dob
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const isValidAge = (dob) => {
    // Ensure the date format is MM/DD/YYYY
    const [month, day, year] = dob.split("/");

    // Check if the year is two digits, and convert it to four digits
    let fullYear = year.length === 2 ? `20${year}` : year;

    // Ensure the month, day, and year are valid numbers
    const date = new Date(`${fullYear}-${month}-${day}`);

    // Check if the created date is valid
    return date instanceof Date && !isNaN(date) && date.getMonth() + 1 == month && date.getDate() == day;
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={[styles.title, { fontFamily: "Raleway_700Bold" }]}>Profile</Text>
          <TouchableOpacity onPress={pickImage} disabled={!isEditable}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person-circle-outline" size={100} color="#ccc" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.inputField, { fontFamily: "Raleway_400Regular" }]}
            value={profileData.name}
            placeholder="Name"
            editable={isEditable}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
          />
          <TextInput
            style={[styles.inputField, { fontFamily: "Raleway_400Regular" }]}
            value={profileData.email}
            placeholder="Email"
            editable={false}
          />
          <TextInput
            style={[styles.inputField, { fontFamily: "Raleway_400Regular" }]}
            value={profileData.dob}
            placeholder="Date of Birth (MM/DD/YYYY)"
            editable={isEditable}
            onChangeText={handleDobChange}
          />
          <TextInput
            style={[styles.inputField, { fontFamily: "Raleway_400Regular" }]}
            value={profileData.phone}
            placeholder="Phone Number"
            editable={isEditable}
            onChangeText={handlePhoneChange}
          />
          <TextInput
            style={[styles.inputField, { fontFamily: "Raleway_400Regular" }]}
            value={profileData.address}
            placeholder="Address"
            editable={isEditable}
            onChangeText={(text) => setProfileData({ ...profileData, address: text })}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleEditToggle}>
          <Text style={styles.saveButtonText}>{isEditable ? "SAVE PROFILE" : "EDIT PROFILE"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>DELETE ACCOUNT</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf4f2',
    paddingTop: Platform.OS === 'android' ? 70 : 50,
  },
  scrollContainer: {
    padding: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    height: 40,
    borderBottomWidth: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    borderBottomColor: "#74112f",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputField: {
    borderColor: "#74112f",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  saveButton: {
    backgroundColor: "#74112f",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
});

export default Profile;