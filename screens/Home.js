import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Go back only if there is a screen to go back to */}
        <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          {/* Menu Button */}
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
          {/* Profile Button */}
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={() => navigation.navigate('Profile')} // Navigates to Profile screen
          >
            <Icon name="user" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Glad you're here! Let’s make a positive impact.</Text>
      <Text style={styles.subText}>What would you like to do today?</Text>

      {/* Centered Action Buttons */}
      <View style={styles.buttonsContainer}>
        {/* Find Nearby Donations Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('FindNearbyDonations')} // Navigates to FindNearbyDonations screen
        >
          <Icon name="search" size={60} color="#000" />
          <Text style={styles.buttonText}>Find Nearby Donations</Text>
        </TouchableOpacity>

        {/* Donate Item Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('DonateItem')} // Navigates to DonateItem screen
        >
          <Icon name="gift" size={60} color="#000" />
          <Text style={styles.buttonText}>Donate Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'flex-start', // Align the header at the top
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  menuButton: {
    marginRight: 15,
  },
  profileButton: {
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  buttonsContainer: {
    flex: 1, // This ensures the buttons take up available space and are centered
    justifyContent: 'center', // Centers the buttons vertically
    alignItems: 'center', // Centers the buttons horizontally
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15, // Makes the buttons a bit rounder
    paddingVertical: 30, // Makes the button taller
    paddingHorizontal: 40, // Makes the button wider
    alignItems: 'center',
    marginBottom: 25, // Space between buttons
    width: '80%', // Makes the button width responsive and centered
  },
  buttonText: {
    fontSize: 18, // Increased font size for visibility
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Home;