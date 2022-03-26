import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import StylesShare from '../../config/styles';
import AppButton from '../../components/Button';
import AppTextInput from '../../components/TextInput';
import ErrorMessage from '../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {query, collection, where, getDocs} from 'firebase/firestore/lite';
import {db} from '../../../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const navigation = useNavigation();
  //text input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    const accountCol = query(
      collection(db, 'users'),
      where('email', '==', email),
      where('password', '==', password),
    );
    try {
      const accountSnapshot = await getDocs(accountCol);
      const accountList = accountSnapshot.docs.map(doc => doc.data());
      if (accountList.length > 0) {
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(accountList[0]))
        } catch (error) {
          console.log(error,'error AsyncStorage');
        }
        navigation.navigate('MainTab');
      } else {
        Alert.alert(
          'Đăng nhập thất bại',
          'Quý khách vui lòng đăng nhập đúng tài khoản đã đăng kí để sử dụng dịch vụ.',
          [{text: 'OK', onPress: () => {}}],
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/bgSignIn.jpeg')}
        style={{
          backgroundColor: 'black',
          height: StylesShare.screenHeight / 2.7,
          justifyContent: 'center',
        }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{flex: 1, position: 'absolute'}}
          />
        ) : null}
        <Image
          source={require('../../assets/icons/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Perfect Date</Text>
        <Text
          style={{
            fontFamily: StylesShare.fontFamily,
            textAlign: 'center',
            color: 'white',
            fontStyle: 'italic',
          }}>
          Hẹn hò là chuyện nhỏ
        </Text>
      </ImageBackground>

      <View style={styles.mainField}>
        <ErrorMessage error={error} visible={loginFailed} />
        <AppTextInput
          placeholder="Email"
          icon="at"
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
        <AppButton
          color="app"
          textColor={'white'}
          title="ĐĂNG NHẬP"
          onPress={() => handleLogin(email, password)}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: StylesShare.screenHeight / 25,
          }}>
          <View
            style={{
              width: StylesShare.screenWidth / 2 - 80,
              height: 3,
              backgroundColor: StylesShare.app,
            }}
          />
          <Text>Kết nối với</Text>
          <View
            style={{
              width: StylesShare.screenWidth / 2 - 80,
              height: 3,
              backgroundColor: StylesShare.app,
            }}
          />
        </View>

        <View
          style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/facebook.png')}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/twitter.png')}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/google-plus.png')}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text
            style={{
              fontFamily: StylesShare.fontFamily,
            }}>
            Bạn chưa có tài khoản?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{
                color: StylesShare.app,
                fontWeight: 'bold',
                fontFamily: StylesShare.fontFamily,
              }}>
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: StylesShare.fontFamily,
    fontWeight: 'bold',
    fontSize: 40,
  },
  mainField: {
    marginTop: -25,
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 20,
  },
  logo: {
    width: 74,
    height: 70,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: StylesShare.screenWidth / 2 - 90,
  },
});
