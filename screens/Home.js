import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Home = ({ navigation, userName }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Go back only if there is a screen to go back to */}
        <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="user" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
      <Text style={styles.subText}>What would you like to do today?</Text>

      {/* Action Buttons */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('FindNearbyDonations')}  // Navigate to FindNearbyDonations screen
      >
        <Icon name="search" size={48} color="#000" />
        <Text style={styles.buttonText}>Find Nearby Donations</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('DonateItem')}  // Navigate to Donate Item screen
      >
        <Icon name="gift" size={48} color="#000" />
        <Text style={styles.buttonText}>Donate Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
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
  actionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Home;