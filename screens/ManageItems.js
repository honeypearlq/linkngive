import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { app } from "../firebase"; // Firebase config file
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons'; // Import icons
import { Platform } from 'react-native';

const ManageItems = ({ navigation }) => {
  const [donations, setDonations] = useState([]);
  const firestore = getFirestore(app);

  useEffect(() => {
    const donationsRef = collection(firestore, "donations");

    // Real-time listener
    const unsubscribe = onSnapshot(donationsRef, (snapshot) => {
      const donationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationList);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const handleEditPress = (item) => {
    // Navigate to Edit screen (passing item data and flag indicating it's an edit)
    navigation.navigate("UploadItem", { item, isEdit: true });
  };

  const handleDeletePress = async (id) => {
    try {
      const donationRef = doc(firestore, "donations", id);
      await deleteDoc(donationRef); // Delete donation from Firestore
      console.log("Donation deleted!");
    } catch (error) {
      console.error("Error deleting donation: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="#74112f"
          onPress={() => navigation.goBack()} // Handle back button press
        />
        <Text style={styles.title}>Manage Your Donations</Text>
      </View>

      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.donationItem}>
            <View style={styles.donationContent}>
              <Image source={{ uri: item.photoURL }} style={styles.donationImage} />
              <View style={styles.textContent}>
                <Text style={styles.donationName}>{item.itemName}</Text>
                <View style={styles.locationWrapper}>
                  <View style={styles.locationSticker}>
                    <Text style={styles.locationText}>📍</Text>
                  </View>
                  <Text style={styles.donationLocation}>{item.location}</Text>
                </View>
                <Text style={styles.donationDistance}>{item.distance} km away</Text>
                <Text style={styles.donorName}>Donor: {item.sender}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleEditPress(item)}
                >
                  <FontAwesome name="pencil" size={24} color="#74112f" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDeletePress(item.id)}
                >
                  <MaterialIcons name="delete" size={24} color="#74112f" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No donations available yet.</Text>}
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
    marginBottom: 20, // Adjust the margin to create space between header and content
  },
  title: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    color: "#2f332a",
    marginLeft: 27, // Space between the back button and the title
    borderBottomColor: "#74112f",
    borderBottomWidth: 5,
    paddingBottom: 5,
  },
  donationItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  donationContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  donationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  textContent: {
    flex: 1,
  },
  donationName: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
    color: "#2f332a",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationSticker: {
    padding: 4,
    borderRadius: 20,
    marginRight: -5,
  },
  locationText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Raleway_400Regular",
  },
  donationLocation: {
    fontSize: 14,
    color: "#7a7a7a",
    fontFamily: "Raleway_400Regular",
  },
  donationDistance: {
    fontSize: 14,
    color: "#7a7a7a",
    fontFamily: "Raleway_400Regular",
  },
  donorName: {
    fontSize: 14,
    fontFamily: "Raleway_400Regular",
    color: "#7a7a7a",
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#7a7a7a",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default ManageItems;