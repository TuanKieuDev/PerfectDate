import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {authentication} from '../../../firebase/firebase-config';
import Heading from '../../components/Heading';
import StylesShare from '../../config/styles';
import AppButton from '../../components/Button';
import AppTextInput from '../../components/TextInput';

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  //text input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
        setIsSignedIn(true);
      })
      .catch(re => {
        console.log(re);
      });
  };

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
          {isSignedIn === true ? (
            <AppButton color='app' textColor={'white'} title="ĐĂNG XUẤT" onPress={signOutUser} />
          ) : (
            <AppButton color='app' textColor={'white'} title="ĐĂNG NHẬP" onPress={signInUser} />
          )}
          {/* <Button title="register" onPress={registerUser}/> */}
          <Text style={{fontFamily: StylesShare.fontFamily, fontSize:14, textAlign:'center', marginTop:50}}>Bạn chưa có tài khoản? </Text>
          <AppButton color='secondary' textColor={'white'} title="ĐĂNG KÍ" onPress={signOutUser} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignIn;

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
    top:10,
    left:(StylesShare.screenWidth/2)-37
  }
});
