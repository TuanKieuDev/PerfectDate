import {StyleSheet, Alert, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../components/Text';
import AppTextInput from '../../components/TextInput';
import AppButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import ErrorMessage from '../../components/ErrorMessage';
import { db } from '../../../firebase/firebase-config';
import { doc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore/lite';


const ChangePassword = ({route}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCf, setNewPasswordCf] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [showErrorNewPassword, setShowErrorNewPassword] = useState(false);
  const [errorPasswordCf, setErrorPasswordCf] = useState('');
  const [showErrorPasswordCf, setShowErrorPasswordCf] = useState(false);

  const navigation = useNavigation();
  const dataUser = route.params;

  const validatePassword = password => {
    // it nhat 1 ki tu in hoa, 1 ki in thuong, 1 chu so va do dai >=8
    let passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passRe.test(password);
  };

  const update = async(password) => {
    const usersCol = query(
      collection(db, 'users'),
      where('email', '==', dataUser.email),
    );
    try {
      const usersSnapshot = await getDocs(usersCol);
      await updateDoc(doc(db, 'users', `${usersSnapshot.docs[0].id}`), {
        password: password
      })

      Alert.alert(
        "Cập nhật mật khẩu thành công",
        "Quý khách vui lòng đăng nhập lại để sử dụng dịch vụ",
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel"
          // },
          { text: "OK", onPress: () => navigation.navigate('SignIn') }
        ]
      );
      
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleSubmit = async (password, new_password, cf_new_password) => {
    if (password != dataUser.password) {
      setErrorPassword('Mật khẩu hiện tại không đúng.');
      setShowErrorPassword(true);
    } else if (!validatePassword(new_password)) {
      setErrorNewPassword(
        'Mật khẩu mới phải có 1 chữ in hoa, 1 chữ in thường và ít nhất 8 kí tự',
      );
      setShowErrorNewPassword(true);
    } else if (new_password != cf_new_password) {
      setErrorPasswordCf('Xác nhận mật khẩu mới không khớp.');
      setShowErrorPasswordCf(true);
    }
    else{
      update(new_password)
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{paddingHorizontal: 10}}>
        <AppTextInput
          placeholder="Mật khẩu hiện tại"
          icon="security"
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />
        <ErrorMessage error={errorPassword} visible={showErrorPassword} />

        <AppTextInput
          placeholder="Mật khẩu mới"
          icon="key"
          value={newPassword}
          onChangeText={newPassword => setNewPassword(newPassword)}
          secureTextEntry
        />
        <ErrorMessage error={errorNewPassword} visible={showErrorNewPassword} />

        <AppTextInput
          placeholder="Nhập lại mật khẩu mới"
          icon="key"
          value={newPasswordCf}
          onChangeText={newPasswordCf => setNewPasswordCf(newPasswordCf)}
          secureTextEntry
        />
        <ErrorMessage error={errorPasswordCf} visible={showErrorPasswordCf} />

        <AppButton
          color="app"
          textColor={'white'}
          title="Cập nhật mật khẩu"
          onPress={() => handleSubmit(password, newPassword, newPasswordCf)}
        />

        <AppButton
          color="light"
          textColor={'black'}
          title="Huỷ"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
