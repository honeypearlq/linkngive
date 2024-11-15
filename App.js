import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

// Import screens
import GetStarted from './screens/GetStarted';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUpForm';
import Home from './screens/Home';
import FindNearbyDonations from './screens/FindNearbyDonations';
import ItemInfo from './screens/ItemInfo';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';

// Enable screens for better performance with React Navigation
enableScreens();

// Initialize stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        
        {/* Initial screen */}
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />

        {/* Authentication screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: 'Reset Password' }}
        />

        {/* Main app screens */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FindNearbyDonations"
          component={FindNearbyDonations}
          options={{ title: 'Nearby Donations' }}
        />
        <Stack.Screen
          name="ItemInfo"
          component={ItemInfo}
          options={{ title: 'Item Info' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}