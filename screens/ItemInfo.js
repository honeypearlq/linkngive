import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ItemInfo = ({ route, navigation }) => {
  const { item } = route.params; // Receive the item passed via route.params
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="#74112f"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}
        />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Item Info</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.textWrapper}>
        <Text style={styles.welcomeText}>{item.itemName}</Text> {/* Display the name of the item */}
        <Text style={styles.subText}>
          Check out this donated item. Message the giver for more information or save it for later by liking!
        </Text>
      </View>

      {/* Image Frame */}
      <View style={styles.imageContainer}>
        {/* Use photoURL or a placeholder if photoURL is not available */}
        <Image
          style={styles.image}
          source={{ uri: item.photoURL || 'https://via.placeholder.com/150' }} 
        />
      </View>

      {/* Item Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemDetail}>
          <Text style={styles.label}>Location:</Text> {item.location} {/* Display item location */}
        </Text>
        <Text style={styles.itemDetail}>
          <Text style={styles.label}>Distance:</Text> {item.distance} km {/* Display distance */}
        </Text>
        <Text style={styles.itemDetail}>
          <Text style={styles.label}>Donor Name:</Text> {item.sender} {/* Display donor name */}
        </Text>
        <Text style={styles.itemDetail}>
          <Text style={styles.label}>Date:</Text> 
          {item.createdAt 
            ? new Date(item.createdAt.seconds * 1000).toLocaleString() 
            : 'N/A'}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Message Item Owner</Text>
        </TouchableOpacity>

        {/* Like Button */}
        <TouchableOpacity style={styles.likeButton} onPress={() => setIsLiked(!isLiked)}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf4f2',
    paddingTop: Platform.OS === 'android' ? 70 : 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    color: '#2f332a',
    borderBottomColor: '#74112f',
    borderBottomWidth: 5,
    textAlign: 'center',
    width: '40%',
    paddingBottom: 5,
    marginRight: 35,
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    color: '#2f332a',
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Raleway_400Regular',
    color: '#888',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  itemDetail: {
    fontSize: 16,
    fontFamily: 'Raleway_400Regular',
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Raleway_700Bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#74112f',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  likeButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#74112f',
  },
});

export default ItemInfo;
