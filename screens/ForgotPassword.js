import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FindNearbyDonations = ({ navigation }) => {
  const [donations, setDonations] = useState([
    { id: '1', name: 'Clothing Donation', distance: '2.5 km', addedAt: '2024-11-10' },
    { id: '2', name: 'Books Donation', distance: '3.2 km', addedAt: '2024-11-12' },
    { id: '3', name: 'Furniture Donation', distance: '5.1 km', addedAt: '2024-11-08' },
    { id: '4', name: 'Toys Donation', distance: '1.8 km', addedAt: '2024-11-13' },
  ]);

  const [sortOption, setSortOption] = useState('nearest');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sortDonations = (option) => {
    let sortedDonations = [...donations];

    switch (option) {
      case 'nearest':
        sortedDonations.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'newest':
        sortedDonations.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      case 'oldest':
        sortedDonations.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        break;
      default:
        break;
    }

    setDonations(sortedDonations);
    setSortOption(option);
    setIsModalVisible(false); // Close the modal after sorting
  };

  const navigateToItemInfo = (item) => {
    // Use navigation.reset() to reset the stack to go directly to ItemInfo
    navigation.reset({
      index: 0,
      routes: [{ name: 'ItemInfo', params: { item } }],
    });
  };

  const navigateBackToHome = () => {
    // Reset the stack to navigate directly to Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateBackToHome()}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Find Nearby Donations</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal for sorting options */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => sortDonations('nearest')} style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Nearest</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortDonations('newest')} style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortDonations('oldest')} style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Oldest</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.modalOptionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.donationItem}
            onPress={() => navigateToItemInfo(item)} // Navigate to ItemInfo screen
          >
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>📷</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.donationName}>{item.name}</Text>
              <View style={styles.distanceContainer}>
                <Ionicons name="location-outline" size={16} color="#888" />
                <Text style={styles.donationDistance}>{item.distance} away</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  donationItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  imageText: {
    fontSize: 24,
    color: '#888',
  },
  itemInfo: {
    flex: 1,
  },
  donationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donationDistance: {
    fontSize: 16,
    color: '#888',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#000',
  },
  closeModalButton: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
  },
});

export default FindNearbyDonations;