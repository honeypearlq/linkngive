import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'; 
import Profile from './Profile'; 
import SavedPlaces from './SavedPlaces';
import PaymentMethods from './PaymentMethods';
import Support from './Support';
import Feedback from './Feedback';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require('./assets/profile-avatar.png')} // Update with the correct path to your avatar image
          style={styles.avatar}
        />
        <Text style={styles.name}>Pearl Quinto</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <Text style={styles.editProfile}>View Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // Hide the default header
        }}
      >
        {/* Main screens */}
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={{ drawerLabel: 'History' }} 
        />
        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
          options={{ drawerLabel: 'Profile' }} 
        />
        
        {/* Additional Drawer Screens */}
        <Drawer.Screen 
          name="SavedPlaces" 
          component={SavedPlaces} 
          options={{ drawerLabel: 'Saved Places' }} 
        />
        <Drawer.Screen 
          name="PaymentMethods" 
          component={PaymentMethods} 
          options={{ drawerLabel: 'Payment Methods' }} 
        />
        <Drawer.Screen 
          name="Support" 
          component={Support} 
          options={{ drawerLabel: 'Support' }} 
        />
        <Drawer.Screen 
          name="Feedback" 
          component={Feedback} 
          options={{ drawerLabel: 'Feedback' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editProfile: {
    color: '#007BFF',
    fontSize: 14,
  },
  drawerItemsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 10,
  },
});

export default AppNavigator;
