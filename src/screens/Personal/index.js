import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {signOut} from 'firebase/auth';
import { authentication } from '../../../firebase/firebase-config';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/Button';

const Personal = () => {
  const navigation = useNavigation()

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
      <Button title='Change Password' onPress={()=>navigation.navigate('ChangePassword')}/>
      <View style={{width:'50%', alignSelf:'center'}}>
        <AppButton color='app' textColor={'white'} title="ĐĂNG XUẤT" onPress={()=>navigation.navigate('SignIn')} />
      </View>
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({});
