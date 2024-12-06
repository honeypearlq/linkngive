import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'; // Adjust path as necessary
import Profile from './Profile'; // Adjust path as necessary

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide the default header
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        {/* Add other screens as necessary */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
