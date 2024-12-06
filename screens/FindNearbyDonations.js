import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase"; // Firebase config file
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const FindNearbyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [sortType, setSortType] = useState("nearest");
  const firestore = getFirestore(app);
  const navigation = useNavigation(); // Use navigation hook

  useEffect(() => {
    const donationsRef = collection(firestore, "donations");

    const unsubscribe = onSnapshot(donationsRef, (snapshot) => {
      const donationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Initial sorting (based on 'nearest')
      sortDonations("nearest", donationList);
    });

    return () => unsubscribe();
  }, []);

  const sortDonations = (type, donationList = donations) => {
    setSortType(type);
    const sortedDonations = [...donationList];
  
    if (type === "nearest") {
      sortedDonations.sort((a, b) => a.distance - b.distance);
    } else if (type === "newest" || type === "oldest") {
      sortedDonations.sort((a, b) => {
        // Ensure date is a valid Firestore Timestamp and convert it to Date
        const dateA = a.createdAt instanceof Object && a.createdAt.seconds 
          ? a.createdAt.toDate()  // Firestore Timestamp to Date
          : new Date(0);  // Default to epoch if no valid date
        const dateB = b.createdAt instanceof Object && b.createdAt.seconds 
          ? b.createdAt.toDate()  // Firestore Timestamp to Date
          : new Date(0);  // Default to epoch if no valid date
  
        return type === "newest"
          ? dateB - dateA  // Newest first
          : dateA - dateB; // Oldest first
      });
    }
  
    setDonations(sortedDonations);
  };  

  const handleItemPress = (item) => {
    navigation.navigate("ItemInfo", { item }); // Navigate and pass the item
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Nearby Donations</Text>
      <View style={styles.sortWrapper}>
        <TouchableOpacity
          style={[styles.sortButton, sortType === "nearest" && styles.activeSort]}
          onPress={() => sortDonations("nearest")}
        >
          <Text style={styles.sortButtonText}>Nearest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortType === "newest" && styles.activeSort]}
          onPress={() => sortDonations("newest")}
        >
          <Text style={styles.sortButtonText}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortType === "oldest" && styles.activeSort]}
          onPress={() => sortDonations("oldest")}
        >
          <Text style={styles.sortButtonText}>Oldest</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.donationItem}>
              <View style={styles.donationContent}>
                <Image source={{ uri: item.photoURL }} style={styles.donationImage} />
                <View style={styles.textContent}>
                  <Text style={styles.donationName}>{item.itemName}</Text>
                  <View style={styles.locationWrapper}>
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.donationLocation}>{item.location}</Text>
                  </View>
                  <Text style={styles.donationDistance}>{item.distance} km away</Text>
                  <Text style={styles.donorName}>Donor: {item.sender}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No donations available yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#faf4f2",
  },
  title: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    color: "#2f332a",
    textAlign: "center",
    marginBottom: 27,
    marginTop: 50,
    borderBottomColor: "#74112f",
    borderBottomWidth: 5,
    width: "70%",
    alignSelf: "center",
  },
  sortWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  sortButton: {
    fontSize: 16,
    color: "#74112f",
    marginRight: 20,
    fontFamily: "Raleway_400Regular",
  },
  sortButtonText: {
    fontSize: 16,
    color: "#74112f",
    fontFamily: "Raleway_400Regular",
  },
  activeSort: {
    borderBottomWidth: 2,
    borderBottomColor: "#74112f",
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
    fontFamily: "Raleway_400Regular",
  },
});

export default FindNearbyDonations;