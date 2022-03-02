import {StyleSheet, Button, View, TextInput, Text} from 'react-native';
import React, {useState} from 'react';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {authentication} from '../../../firebase/firebase-config';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const registerUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        setIsSignedIn(true);
      })
      .catch(re => {
        console.log(re);
      });
  };
  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={password => setPassword(password)}></TextInput>
      <Button title="register" onPress={registerUser} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
