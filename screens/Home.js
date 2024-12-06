import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Link 'n' Give</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search donations or items..."
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.welcomeText}>Welcome! Are you ready to make a difference?</Text>
        <Text style={styles.subText}>What would you like to do today?</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('FindNearbyDonations')}
        >
          <Image source={require('../assets/find.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Find Nearby Donations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('DonateItem')}
        >
          <Image source={require('../assets/donate.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Donate Items</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf4f2', paddingHorizontal: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#800020', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 5 },
  headerTitle: { fontSize: 20, fontFamily: 'Raleway_700Bold', color: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 5, padding: 2, marginVertical: 20, borderColor: "#74112f", borderBottomWidth: 1, paddingLeft: 15, fontSize: 16, fontFamily: "Raleway_700Bold" },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1, fontFamily: 'Raleway_400Regular', color: '#000' },
  textWrapper: { justifyContent: 'center', alignItems: 'center', marginBottom: 80 },
  buttonsContainer: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' },
  welcomeText: { fontSize: 24, fontFamily: 'Raleway_700Bold', color: '#2f332a', marginBottom: 5, textAlign: 'center' },
  subText: { fontSize: 16, fontFamily: 'Raleway_400Regular', color: '#888', textAlign: 'center', marginBottom: 20 },
  actionButton: { backgroundColor: '#74112f', borderRadius: 15, paddingVertical: 40, alignItems: 'center', marginBottom: 20, width: '80%' },
  buttonText: { fontSize: 20, fontFamily: 'Raleway_700Bold', color: '#fff', textAlign: 'center', marginTop: 10 },
  buttonImage: { width: 80, height: 80, marginBottom: 10 },
});

export default Home;
