import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';  // Import expo-font for font loading
import * as SplashScreen from 'expo-splash-screen'; // For splash screen management

// Import screens
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUpForm';
import Home from './screens/Home';
import FindNearbyDonations from './screens/FindNearbyDonations';
import DonateItem from './screens/DonateItem';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';
import UploadItem from './screens/UploadItem';
import ManageItems from './screens/ManageItems';

// Import font hooks from the Expo font packages
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

const Stack = createNativeStackNavigator();

export default function App() {
  // Load fonts using the correct imports from the Expo font packages
  const [fontsLoaded] = useFonts({
    Raleway_400Regular, // Raleway Regular
    Raleway_700Bold,    // Raleway Bold
  });

  // Keep the splash screen visible while the fonts are loading
  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null; // Or a loading component
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // Change to 'Login' or any other desired screen
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Raleway_700Bold',  // Apply Raleway for titles
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontFamily: 'Raleway_400Regular',  // Apply Raleway for back titles
            fontSize: 16,
          },
          headerTintColor: '#74112f', // Customize back button color
        }}
      >
        {/* Remove GetStarted screen */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />

        {/* Main app screens */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen
          name="FindNearbyDonations"
          component={FindNearbyDonations}
          options={{ title: 'Nearby Donations' }}
        />
        <Stack.Screen name="DonateItem" component={DonateItem} options={{ title: 'Donate Item' }} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: 'Reset Password' }}
        />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />

        {/* Additional screens */}
        <Stack.Screen name="UploadItem" component={UploadItem} options={{ title: 'Upload Item' }} />
        <Stack.Screen name="ManageItems" component={ManageItems} options={{ title: 'Manage Items' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}