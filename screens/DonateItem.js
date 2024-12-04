import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DonateItem = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate an Item</Text>
      <Text style={styles.subtitle}>
        Choose an option to either upload an item or manage your posted items.
      </Text>

      {/* Buttons for uploading or managing items */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UploadItem')}
        >
          <Image 
            source={require('../assets/upload.png')}  
            style={styles.buttonImage} 
          />
          <Text style={styles.buttonText}>Upload Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageItems')}
        >
          <Image 
            source={require('../assets/manage.png')} 
            style={styles.buttonImage} 
          />
          <Text style={styles.buttonText}>Manage Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#faf4f2', 
    padding: 20, 
    paddingTop: 40, 
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    color: '#2f332a',
    textAlign: 'center',
    marginBottom: 27,
    marginTop: 50,
    borderBottomColor: '#74112f',
    borderBottomWidth: 5,
    width: '50%',
    alignSelf: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    fontFamily: 'Raleway_400Regular', 
    color: '#888', 
    marginBottom: 40, 
    textAlign: 'center',
  },
  buttonContainer: { 
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#74112f',  // Matching the primary color
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '80%',
    marginBottom: 25,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  buttonText: { 
    fontSize: 18, 
    fontFamily: 'Raleway_700Bold', 
    color: '#fff',
    textAlign: 'center',
  },
});

export default DonateItem;