import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Ensure firebase config is properly set up
import { doc, setDoc, collection } from 'firebase/firestore';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const validateForm = () => {
    if (name.length < 10 || name.length > 20) {
      setError('Name must be between 10 and 20 characters.');
      return false;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError('');
    if (!validateForm()) return;

    setModalVisible(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, {
        name,
        email,
        phone: '',
        address: '',
        profileImage: '',
        dob: '',
      });

      console.log('User signed up and data saved:', user);
      setSuccessModalVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.replace('MainApp'); // Navigate to MainApp after signup
      }, 3000);
    } catch (error) {
      console.error('Error signing up:', error.code, error.message);
      setError(error.code === 'auth/email-already-in-use'
        ? 'This email is already in use.'
        : error.message);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.signupContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>LINK 'N' GIVE</Text>
      </View>
      <Text style={styles.title}>Empower Generosity, Together</Text>
      <View style={styles.signupForm}>
        <TextInput
          placeholder=" Name"
          value={name}
          onChangeText={setName}
          style={styles.inputField}
        />
        <TextInput
          placeholder=" Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputField}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            style={styles.passwordField}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#777" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
          Log In
        </Text>
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#faf4f2',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f332a',
    fontFamily: 'Raleway_700Bold',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2f332a',
    fontFamily: 'Raleway_700Bold',
  },
  signupForm: {
    marginBottom: 20,
  },
  inputField: {
    height: 50,
    borderBottomColor: '#74112f',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'Raleway_400Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#74112f',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  passwordField: {
    flex: 1,
    height: 50,
    fontFamily: 'Raleway_400Regular',
  },
  eyeIcon: {
    marginLeft: 10,
    color: '#74112f',
  },
  submitButton: {
    backgroundColor: '#74112f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Raleway_700Bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Raleway_400Regular',
  },
  linkText: {
    color: '#74112f',
    fontFamily: 'Raleway_700Bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Raleway_400Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: '#74112f',
  },
  successText: {
    fontSize: 18,
    color: '#2f332a',
    fontFamily: 'Raleway_700Bold',
  },
});

export default SignUp;