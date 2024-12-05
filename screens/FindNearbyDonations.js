import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase"; // Firebase config file

const FindNearbyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [sortType, setSortType] = useState("nearest"); // Default sorting by nearest
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

  const sortDonations = (type) => {
    setSortType(type);
    const sortedDonations = [...donations];
    if (type === "nearest") {
      sortedDonations.sort((a, b) => a.distance - b.distance);
    } else if (type === "newest") {
      sortedDonations.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === "oldest") {
      sortedDonations.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setDonations(sortedDonations); // Update the donations state after sorting
  };

  const handleItemPress = (item) => {
    // Navigate to ItemInfo screen on item press (you can modify this navigation logic)
    // navigation.navigate("ItemInfo", { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Nearby Donations</Text>
      <View style={styles.sortWrapper}>
        {/* Sorting buttons */}
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
            {/* Add TouchableOpacity for click */}
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
  },
});

export default FindNearbyDonations;