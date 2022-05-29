import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import StylesShare from '../../config/styles';
import AppButton from '../../components/Button';
import AppTextInput from '../../components/TextInput';
import ErrorMessage from '../../components/ErrorMessage';
import {useNavigation} from '@react-navigation/native';
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore/lite';
import {db} from '../../../firebase/firebase-config';

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cf_password, setCfPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorCfPassword, setErrorCfPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');

  const validateEmail = email => {
    var emailRe = /\S+@\S+\.\S+/;
    return emailRe.test(email);
  };

  const validatePassword = password => {
    //it nhat 1 ki tu in hoa, 1 ki in thuong, 1 chu so va do dai >=8
    let passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passRe.test(password);
  };

  const validateForm = async (e, p) => {
    if (validateEmail(e) && validatePassword(p)) {
      return true;
    }
    if (!validateEmail(e)) {
      setErrorEmail('Vui lòng điền email theo mẫu: abc@xyz.com');
    }
    if (!validatePassword(p)) {
      setErrorPassword(
        'Mật khẩu phải có ít nhất 8 kí tư, bao gồm chữ in hoa, in thường và chữ số',
      );
    }
    if (!a) {
      setErrorEmail('Tài khoản đã tồn tại');
    }
    // if(password!=cf_password){
    //   setErrorCfPassword('Xác nhận mật khẩu không khớp, vui lòng thử lại.')
    // }
    return false;
  };


  const checkExist = async email => {
    const emailCol = query(
      collection(db, 'users'),
      where('email', '==', email),
    );
    try {
      const emailSnapshot = await getDocs(emailCol);
      const emailList = emailSnapshot.docs.map(doc => doc.data());
      if (emailList.length > 0) {
        setErrorEmail('Email đã tồn tại, vui lòng thử lại.');
        return true;
      }
      return false;
    } catch (error) {
      console.log('error', error);
    }
  };

  const checkEmpty = (e, p, u) => {
    if (e.trim().length > 0 && p.trim().length > 0 && u.trim().length > 0)
      return true;
    return false;
  };

  const handleSubmit = async (email, password, username) => {
    const ran = Math.floor(Math.random() * 100000000);
    const check = await checkExist(email);
    const validate = await validateForm(email, password)

    if (
      validate &&
      !check &&
      checkEmpty(email, password, username)
    ) {
      try {
        await setDoc(doc(db, 'users', `${ran}`), {
          dated: [],
          email: email,
          like: [],
          password: password,
          points: 1000,
          username: username,
        });
        Alert.alert(
          'Đăng kí thành công',
          'Quý khách vui lòng đăng nhập lại để sử dụng dịch vụ',
          [{text: 'OK', onPress: () => navigation.navigate('SignIn')}],
        );
      } catch (error) {
        console.log(error,'errr');
      }
    } else {
      Alert.alert(
        'Đăng kí thất bại',
        'Quý khách vui lòng đăng kí theo đúng mẫu để sử dụng dịch vụ',
        [{text: 'OK', onPress: () => {}}],
      );
      console.log('nonnnnnnn');
    }
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/bgSignIn.jpeg')}
        style={{
          backgroundColor: 'black',
          height: StylesShare.screenHeight / 2.7,
          justifyContent: 'center',
        }}>
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
        <AppTextInput
          placeholder="Username"
          icon="account"
          value={username}
          onChangeText={username => setUsername(username)}
        />

        <AppTextInput
          placeholder="Email"
          icon="at"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <ErrorMessage
          error={errorEmail}
          visible={!validateEmail(email) || checkExist(email)}
        />

        <AppTextInput
          placeholder="Password"
          icon="key"
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />
        <ErrorMessage
          error={errorPassword}
          visible={!validatePassword(password)}
        />

        {/* <AppTextInput
            placeholder="Confirm password"
            icon="key"
            value={cf_password}
            onChangeText={cf_password => setCfPassword(cf_password)}
            secureTextEntry
          />
          <ErrorMessage error={errorCfPassword} visible={password==cf_password?false:true} /> */}

        <AppButton
          color="app"
          textColor={'white'}
          title="Xác nhận"
          onPress={() => handleSubmit(email, password, username)}
        />
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
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
});
