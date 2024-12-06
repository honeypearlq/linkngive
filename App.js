import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Import screens
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUpForm';
import Home from './screens/Home'; // Main Home screen
import FindNearbyDonations from './screens/FindNearbyDonations';
import DonateItem from './screens/DonateItem';
import Profile from './screens/Profile';
import UploadItem from './screens/UploadItem';
import ManageItems from './screens/ManageItems';
import ItemInfo from './screens/ItemInfo';

// Import fonts
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  const StackNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Raleway_700Bold',
          fontSize: 18,
        },
        headerBackTitleStyle: {
          fontFamily: 'Raleway_400Regular',
          fontSize: 16,
        },
        headerTintColor: '#74112f',
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="FindNearbyDonations" component={FindNearbyDonations} options={{ headerShown: false }}/>
      <Stack.Screen name="DonateItem" component={DonateItem} options={{ headerShown: false }}/>
      <Stack.Screen name="UploadItem" component={UploadItem} options={{ headerShown: false }}/>
      <Stack.Screen name="ManageItems" component={ManageItems} options={{ headerShown: false }}/>
      <Stack.Screen name="ItemInfo" component={ItemInfo} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );

  const DrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontFamily: 'Raleway_400Regular',
          fontSize: 16,
        },
        drawerActiveTintColor: '#74112f',
        drawerInactiveTintColor: '#888',
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}