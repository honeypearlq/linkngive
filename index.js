import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';
import { name as appName } from './app.json';

// Register the root component
registerRootComponent(App);

// Register the app component
AppRegistry.registerComponent(appName, () => App);