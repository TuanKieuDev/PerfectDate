import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {signOut} from 'firebase/auth';
import { authentication } from '../../../firebase/firebase-config';

const Personal = () => {

  const [isSignedIn, setIsSignedIn] = useState(true);
  const signOutUser = () => {
    signOut(authentication)
      .then(re => {
        setIsSignedIn(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <Button title='Sign Out' onPress={signOutUser}/>
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({});
