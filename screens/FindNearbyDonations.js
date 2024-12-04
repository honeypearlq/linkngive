import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const FindNearbyDonations = ({ navigation }) => {
  const [donations, setDonations] = useState([]);
  const [sortType, setSortType] = useState('nearest'); // Default sorting by nearest

  // Sample data for donations with image URLs and additional info
  const sampleDonations = [
    {
      id: '1',
      name: 'Brand New Earphones',
      distance: 2,
      image: 'https://tech101.com.ph/wp-content/uploads/2023/02/Realme-Buds-Classic-Original-Wired-Earphone-1.jpg',
      date: '2023-12-01',
      sender: 'Emmanuel Sonquipal',
      location: 'Lapasan, Cagayan De Oro',
    },
    {
      id: '2',
      name: 'Coding Books (Year Old)',
      distance: 5,
      image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc16cb4c1-862b-49ab-b3f1-73b9ce6c2c36_3528x2871.jpeg',
      date: '2023-11-20',
      sender: 'Carl Dominguez',
      location: 'USTP-CDO, Cagayan de Oro',
    },
    {
      id: '3',
      name: 'Powerbank (5 Months Old)',
      distance: 1,
      image: 'https://www.cellularline.com/medias/webPResize700x700-webPConversionMediaFormat-PBESSENCE20000K-01-MAIN-HR.webp?context=bWFzdGVyfHJvb3R8MTAxMjcwfGltYWdlL3dlYnB8aGQ3L2g4OS85Njk3ODQzMTE4MTEwLndlYnB8NDJjMmMwOWYzNjY1MGFiMDhmNDZkNjQyMWJkYjUxNWIwMzI0MjkwNmI5MDhjMDMyZDk5ZjM1ODQ4OGE3ZDJlZQ',
      date: '2023-11-25',
      sender: 'Jelhoney Rollan',
      location: 'Cugman, Cagayan de Oro City',
    },
    {
      id: '4',
      name: 'Trousers for Women',
      distance: 10,
      image: 'https://img.ws.mms.shopee.ph/7b90b7640cb278d55a2504ce268e6f78',
      date: '2023-12-03',
      sender: 'Marian Yecyec',
      location: 'Nazareth, Cagayan de Oro',
    },
    {
      id: '5',
      name: 'Make Up',
      distance: 30,
      image: 'https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg',
      date: '2023-12-03',
      sender: 'Pearl Quinto',
      location: 'Opol, Cagayan de Oro',
    },
    {
      id: '6',
      name: 'Dog Food',
      distance: 90,
      image: 'https://www.choicestores.ie/cdn/shop/collections/dog-food-choice-stores.jpg?v=1720191659',
      date: '2024-12-01',
      sender: 'Pilgu',
      location: 'Macasandig, Cagayan de Oro',
    },
  ];

  useEffect(() => {
    setDonations(sampleDonations); // Set donations on component mount
  }, []);

  const sortDonations = (type) => {
    setSortType(type);
    const sortedDonations = [...donations];
    if (type === 'nearest') {
      sortedDonations.sort((a, b) => a.distance - b.distance);
    } else if (type === 'newest') {
      sortedDonations.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === 'oldest') {
      sortedDonations.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setDonations(sortedDonations); // Update the donations state after sorting
  };

  const handleItemPress = (item) => {
    navigation.navigate('ItemInfo', { item }); // Navigate to ItemInfo screen on item press
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Nearby Donations</Text>
      <View style={styles.sortWrapper}>
        {/* Sorting buttons */}
        <TouchableOpacity
          style={[styles.sortButton, sortType === 'nearest' && styles.activeSort]}
          onPress={() => sortDonations('nearest')}
        >
          <Text style={styles.sortButtonText}>Nearest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortType === 'newest' && styles.activeSort]}
          onPress={() => sortDonations('newest')}
        >
          <Text style={styles.sortButtonText}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortType === 'oldest' && styles.activeSort]}
          onPress={() => sortDonations('oldest')}
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
                <Image source={{ uri: item.image }} style={styles.donationImage} />
                <View style={styles.textContent}>
                  <Text style={styles.donationName}>{item.name}</Text>
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
    backgroundColor: '#faf4f2',
  },

  title: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    color: '#2f332a',
    textAlign: 'center',
    marginBottom: 27,
    marginTop: 50,
    borderBottomColor: '#74112f',
    borderBottomWidth: 5,
    width: '70%',
    alignSelf: 'center',
  },

  sortWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  sortButton: {
    fontSize: 16,
    color: '#74112f',
    marginRight: 20,
    fontFamily: 'Raleway_400Regular',
  },

  sortButtonText: {
    fontSize: 16,
    color: '#74112f',
    fontFamily: 'Raleway_400Regular',
  },

  activeSort: {
    borderBottomWidth: 2,
    borderBottomColor: '#74112f',
  },

  donationItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  donationContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Raleway_700Bold',
    color: '#2f332a',
  },

  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  locationSticker: {
    padding: 4,
    borderRadius: 20,
    marginRight: -5,
  },

  locationText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway_400Regular',
  },

  donationLocation: {
    fontSize: 14,
    color: '#7a7a7a',
    fontFamily: 'Raleway_400Regular',
  },

  donationDistance: {
    fontSize: 14,
    color: '#7a7a7a',
    fontFamily: 'Raleway_400Regular',
  },

  donorName: {
    fontSize: 14,
    fontFamily: 'Raleway_400Regular',
    color: '#7a7a7a',
    marginTop: 5,
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7a7a7a',
  },
});

export default FindNearbyDonations;