import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../components/Text';
import StylesShare from '../../config/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import { db } from '../../../firebase/firebase-config';
import { doc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore/lite';


const Checkout = ({route}) => {
  const dataUser = route.params;
  console.log(dataUser, 'daaaa');
  const navigation = useNavigation();
  const [selected, setSelected] = useState(100);
  const [points, setPoints] = useState(0);
  const data = [
    {
      id: '0',
      image: require('../../assets/icons/member1.png'),
      title: 'Gói VIP',
      options: [
        'Ra mắt gia đình',
        'Vào bếp',
        'Rửa bát(đối với nữ) / Chúc rượu(đối với nam)',
        'Ôm, nắm tay',
        'Đi chơi',
        'Chụp ảnh đăng lên mạng xã hội',
      ],
      price: 2000,
    },
    {
      id: '1',
      image: require('../../assets/icons/member2.png'),
      title: 'Gói cơ bản',
      options: ['Ôm, nắm tay', 'Đi chơi', 'Chụp ảnh đăng lên mạng xã hội'],
      price: 1000,
    },
    {
      id: '2',
      image: require('../../assets/icons/member3.png'),
      title: 'Gói trải nghiệm',
      options: ['Nắm tay', 'Đi chơi'],
      price: 500,
    },
  ];

  const handleSubmit = async() => {
    const rest = dataUser.points - points;
    if (selected == 100) {
      Alert.alert('Lỗi thanh toán', 'Quý khách chưa chọn gói dịch vụ sử dụng', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      if (rest >= 0) {
        const usersCol = query(
          collection(db, 'users'),
          where('email', '==', dataUser.email),
        );
        try {
          const usersSnapshot = await getDocs(usersCol);
          await updateDoc(doc(db, 'users', `${usersSnapshot.docs[0].id}`), {
            points: rest,
          });
          Alert.alert(
            'Thanh toán thành công',
            'Thông tin chi tiết về cuộc hẹn sẽ được gửi tới email của quý khách trong thời gian sớm nhất.\n\nCảm ơn quý khách.',
            [{text: 'OK', onPress: () => navigation.navigate('Discover')}],
          );
        } catch (error) {
          console.log('error', error);
        }
      } else {
        Alert.alert('Lỗi thanh toán', 'Số dư của quý khách không đủ, vui lòng nạp thêm để sửa dụng.', [
          {text: 'OK', onPress: () => {}},
        ]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={styles.title}>Các gói dịch vụ</AppText>
        {data.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.box,
              {borderColor: item.id == selected ? StylesShare.app : 'black'},
            ]}
            onPress={() => {
              setSelected(item.id);
              setPoints(item.price);
            }}
            key={index}>
            <View style={styles.boxTitle}>
              <Image source={item.image} style={{width: 60, height: 60}} />
              <AppText style={{fontSize: 30, fontWeight: '400'}}>
                {item.title}
              </AppText>
            </View>
            <View>
              {item.options.map((item, index) => (
                <View style={{flexDirection: 'row'}} key={index}>
                  <Icon
                    name="star"
                    color={'green'}
                    style={{marginTop: 2, paddingHorizontal: 10}}
                  />
                  <AppText>{item}</AppText>
                </View>
              ))}
            </View>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <AppText style={{fontWeight: 'bold'}}>Price: </AppText>
              <AppText style={{textDecorationLine: 'line-through'}}>
                {item.price * 3}{' '}
              </AppText>
              <AppText style={{color: 'red'}}>{item.price}</AppText>
              <AppText> (points)</AppText>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{padding: 10}}>
          <AppText>
            Chú ý: Mọi chi phí phát sinh như: đi lại, ăn uống, vé tham quan,...
            đều do khách hàng chi trả
          </AppText>
          <View style={{height: 10}}></View>
          <AppText>
            Vui lòng có hành vi đúng mực, tôn trọng bạn hẹn. Nên nhớ chúng tôi
            có đầy đủ thông tin của bạn để khởi tố nếu như có hành vi vi phạm
            pháp luật.
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => handleSubmit()}>
          <AppText style={styles.checkoutTxt}>Xác nhận</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: StylesShare.app,
    fontWeight: '500',
    textAlign: 'center',
  },
  box: {
    borderWidth: 1.5,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  boxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutBtn: {
    width: '50%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: StylesShare.app,
    alignSelf: 'center',
    borderRadius: 40,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});
