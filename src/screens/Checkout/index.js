import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../components/Text';
import StylesShare from '../../config/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import AppModal from '../../components/AppModal';

const Checkout = () => {
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
  const [showWarning, setShowWarning] = useState(false);
  const [showWarning2, setShowWarning2] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <AppModal 
        visible={showWarning}
        onRequestClose={() => setShowWarning(false)}
        headerTitle="Lên lịch thành công"
        bodyContent="Mọi thông tin về cuộc hẹn sẽ được gửi về
        email của quý khách trong thời gian sớm nhất. Xin trân thành cảm
        ơn quý khách."
        // screenName="MainTab"
        onPress={() => setShowWarning(false)}
        />

      <AppModal 
        visible={showWarning2}
        onRequestClose={() => setShowWarning2(false)}
        headerTitle="Lỗi thanh toán"
        bodyContent="Vui lòng chọn gói dịch vụ rồi thử lại sau."
        // screenName="Checkout"
        onPress={() => setShowWarning2(false)}
        />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={styles.title}>Các gói dịch vụ</AppText>
        {data.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.box,
              {borderColor: item.id == selected ? StylesShare.app : 'black'},
            ]}
            onPress={() => {
              setSelected(item.id)
              setPoints(item.price)
              }}>
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
          onPress={() => selected!=100 ? setShowWarning(true): setShowWarning2(true)}>
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
