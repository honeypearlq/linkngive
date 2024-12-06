import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';  
import * as SplashScreen from 'expo-splash-screen'; 

// Import Raleway fonts from Expo Google Fonts package
import { Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Load fonts using the expo-font hook
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

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      // Navigate to MainApp (adjust based on your navigator name)
      navigation.replace('MainApp'); // Replacing to clear login from navigation stack
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('Failed to log in. Please try again.');
      }
      console.error('Error logging in:', err);
    }
  };  

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsModalVisible(true); // Show modal on successful email send
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
      console.error('Error sending password reset email:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Log In title */}
      <Text style={styles.title}>Log In to Empower Generosity</Text>

      <TextInput
        style={styles.input}
        placeholder=" Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#74112f" />
        </TouchableOpacity>
      </View>

      {/* Position Remember Me on the left */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Remember Me</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Forgot Password link now under login button */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Don't have an account? */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Modal for confirmation of password reset email */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>A password reset email has been sent to {email}.</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#faf4f2', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'center', 
    marginBottom: 20,
    fontFamily: 'Raleway_700Bold', 
    color: '#2f332a',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'Raleway_400Regular', 
    borderBottomColor: '#74112f',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomColor: '#74112f',
  },
  inputPassword: {
    flex: 1,
    height: 40,
    fontFamily: 'Raleway_400Regular', 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontFamily: 'Raleway_400Regular', 
  },
  forgotPassword: {
    fontFamily: 'Raleway_700Bold', 
    color: '#74112f',
    marginTop: 10,  
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#74112f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Raleway_700Bold', 
    fontSize: 18
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Raleway_400Regular', 
  },
  signupLink: {
    color: '#74112f',
    fontFamily: 'Raleway_700Bold', 
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Raleway_400Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Raleway_400Regular',
  },
  closeButton: {
    backgroundColor: '#74112f',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Raleway_700Bold',
  },
});

export default LoginScreen;
