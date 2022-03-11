import {StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/Heading';
import StylesShare from '../../config/styles';
import AppButton from '../../components/Button';
import AppTextInput from '../../components/TextInput';
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigation } from '@react-navigation/native';
import { query, collection, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../../../firebase/firebase-config';


const SignIn = () => {
  const navigation = useNavigation()
  //text input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleLogin = async(email,password) => {
    const accountCol = query(
      collection(db, 'users'),
      where('email', '==', email),
      where('password', '==', password)
    );
    try {
      const accountSnapshot = await getDocs(accountCol);
      const accountList = accountSnapshot.docs.map(doc => doc.data());
      if (accountList.length>0) {
        navigation.navigate('MainTab')
      }else{
        alert('Đăng nhập thất bại')
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/bgSignIn.jpeg')}
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
        resizeMode="cover">
          {loading?<ActivityIndicator size="large" style={{flex:1, position:'absolute'}}/>:null}
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
            
          
          <AppButton color='app' textColor={'white'} title="ĐĂNG NHẬP" onPress={()=> handleLogin(email,password)} />
          <Text style={{fontFamily: StylesShare.fontFamily, fontSize:14, textAlign:'center', marginTop:50}}>Bạn chưa có tài khoản? </Text>
          <AppButton color='secondary' textColor={'white'} title="ĐĂNG KÍ" onPress={()=>navigation.navigate('SignUp')} />
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
    top:30,
    left:(StylesShare.screenWidth/2)-37
  }
});
