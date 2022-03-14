import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StylesShare from '../../config/styles';
import AccountSector from '../../components/AccountSector';

const Personal = () => {
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      setDataUser(JSON.parse(jsonValue));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.navigate('SignIn');
    } catch (e) {
      console.log(e);
    }

    console.log('Done SignOut.');
  };

  console.log(dataUser);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[{marginTop: StylesShare.screenHeight / 15, padding:20}]}>
        <View style={styles.userInfo}>
          <Image
            source={require('../../assets/icons/facebook.png')}
            style={{alignSelf: 'center'}}
          />
          <View style={styles.userDetail}>
            <Text style={styles.textName}>{dataUser?.username}</Text>
            <Text style={styles.textEmail}>{dataUser?.email}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: StylesShare.screenWidth-40,
          height: 1,
          backgroundColor: '#c6ccc8',
        }}
      />

      <AccountSector name={'Nạp Points'} imgSource={require('../../assets/icons/coin.png')}/>
      <AccountSector name={'Lịch sử hẹn hò'} imgSource={require('../../assets/icons/date_checked.png')}/>
      <AccountSector name={'Đổi mật khẩu'} imgSource={require('../../assets/icons/edit.png')} screenName={'ChangePassword'}/>

      <View style={{width: '50%', alignSelf: 'center'}}>
        <AppButton
          color="app"
          textColor={'white'}
          title="ĐĂNG XUẤT"
          onPress={() => handleSignOut()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  shadowBox: {
    marginTop:10,
    flexDirection:'row',

    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#c6ccc8',
    padding: 20,
    backgroundColor: '#fff',
  },
  userDetail: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  textName: {
    fontSize: 30,
    fontFamily: StylesShare.fontFamily,
  },
  textEmail: {
    fontFamily: StylesShare.fontFamily,
  },
  userInfo: {
    flexDirection: 'row',
  },
});
