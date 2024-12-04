import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Import Raleway fonts from Expo Google Fonts package
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular, 
    Raleway_700Bold,   
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null; 
  } else {
    SplashScreen.hideAsync(); 
  }

  return (
    <ImageBackground 
      source={require('../assets/background.png')} 
      style={styles.container} 
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Menu Button */}
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        {/* App Title */}
        <Text style={styles.headerTitle}>Link 'n' Give</Text>

        {/* Profile Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search donations or items..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Welcome Message */}
      <View style={styles.textWrapper}>
        <Text style={styles.welcomeText}>Welcome! Are you ready to make a difference?</Text>
        <Text style={styles.subText}>What would you like to do today?</Text>
      </View>

      {/* Centered Action Buttons */}
      <View style={styles.buttonsContainer}>
        {/* Find Nearby Donations Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('FindNearbyDonations')}
        >
          <Image 
            source={require('../assets/find.png')}  
            style={styles.buttonImage} 
          />
          <Text style={styles.buttonText}>Find Nearby Donations</Text>
        </TouchableOpacity>

        {/* Donate Item Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('DonateItem')}
        >
          <Image 
            source={require('../assets/donate.png')}  
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Donate Items</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf4f2',
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#800020',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 2,
    marginVertical: 20,
    borderColor: "#74112f",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    fontFamily: 'Raleway_400Regular',
    color: '#000',
  },
  textWrapper: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 80, 
  },
  buttonsContainer: {
    position: 'absolute', 
    bottom: 50, 
    left: 0,
    right: 0,
    alignItems: 'center', 
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
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#74112f',
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    marginTop: 10, 
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonImage: {
    width: 80, 
    height: 80, 
    marginBottom: 10, 
  },
});

export default Home;