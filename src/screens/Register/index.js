import {StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {authentication} from '../../../firebase/firebase-config';
import Heading from '../../components/Heading';
import StylesShare from '../../config/styles';
import AppButton from '../../components/Button';
import AppTextInput from '../../components/TextInput';
import ErrorMessage from '../../components/ErrorMessage'
import { stringify } from '@firebase/util';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation()
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cf_password, setCfPassword] = useState('');
  const [error, setError] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

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
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bgSignIn.jpeg')}
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
        resizeMode="cover">
        <Image source={require('../../assets/icons/Logo.png')} style={styles.logo}/>
        <Heading style={{color: 'white'}}>Perfect Date</Heading>
        <Text style={{fontFamily: StylesShare.fontFamily, textAlign:'center', color:'white', fontStyle:'italic'}}>Hẹn hò là chuyện nhỏ</Text>
        <View style={styles.mainField}>
            <ErrorMessage
                error={error}
                visible={loginFailed}
            />
            <AppTextInput
              placeholder="Email"
              icon="user"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            
            <AppTextInput
              placeholder="Password"
              icon="key"
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry
            />

            <AppTextInput
              placeholder="Confirm password"
              icon="key"
              value={cf_password}
              onChangeText={cf_password => setCfPassword(cf_password)}
              secureTextEntry
            />
            
          <AppButton color='app' textColor={'white'} title="Xác nhận" onPress={()=>navigation.navigate('SignIn')} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainField: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop:StylesShare.screenHeight/20,
  },
  logo: {
    width:74, 
    height:70, 
    position:'absolute',
    top:30,
    left:(StylesShare.screenWidth/2)-37
  }
});

