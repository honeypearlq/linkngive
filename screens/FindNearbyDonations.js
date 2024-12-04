import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure firebaseConfig is set up

const FindNearbyDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'donations'), (snapshot) => {
      const donationsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Donations</Text>
      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.donationItem}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No donations available yet.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  donationItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#666' },
});

export default FindNearbyDonations;
