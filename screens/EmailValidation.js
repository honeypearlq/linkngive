import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

class EmailValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  // Function to validate the email
  validateEmail = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(this.state.email)) {
      Alert.alert("Email is Valid");
    } else {
      Alert.alert("Email is Not Valid");
    }
  };

  render() {
    return (
      <View style={{ alignSelf: 'center', marginTop: 100 }}>
        <TextInput
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            height: 40,
            width: 200,
            backgroundColor: 'lightgray',
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <Button
          title="Validate Email"
          onPress={this.validateEmail}
        />
      </View>
    );
  }
}

export default EmailValidation;