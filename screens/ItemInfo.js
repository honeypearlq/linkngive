import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ItemInfo = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons 
          name="chevron-back" 
          size={24} 
          color="black" 
          onPress={() => {
            // Reset the stack and navigate to Home when going back from ItemInfo
            navigation.reset({
              index: 0, // Clear all previous screens
              routes: [{ name: 'Home' }] // Navigate to Home
            });
          }}
        />
        <Text style={styles.title}>Item Info</Text>
        <Ionicons 
          name="person-circle-outline" 
          size={24} 
          color="black" 
          onPress={() => navigation.navigate('Profile')} // Navigate to Profile screen
        />
      </View>

      <Text style={styles.description}>
        Explore the details of the donated item, message the giver for more information. You can also like the item for future reference!
      </Text>

      <View style={styles.imageContainer}>
        <Image style={styles.imagePlaceholder} source={{ uri: 'https://via.placeholder.com/150' }} />
      </View>

      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Category: {item.category}</Text>
      <Text style={styles.itemDetails}>Condition: {item.condition}</Text>
      <Text style={styles.itemDetails}>Location: {item.location}</Text>

      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message Item Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.likeButton}>
        <Ionicons name="heart-outline" size={24} color="black" />
      </TouchableOpacity>
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
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: '#d9d9d9',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  messageButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  likeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default ItemInfo;