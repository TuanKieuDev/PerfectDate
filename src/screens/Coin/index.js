import {StyleSheet, View, SafeAreaView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppText from '../../components/Text';
import {db} from '../../../firebase/firebase-config';
import {collection, getDocs, where, query, doc} from 'firebase/firestore/lite';
import ActivityIndicator from '../../components/ActivityIndicator';
import StylesShare from '../../config/styles';

const Coin = ({route}) => {
  const dataUser = route.params;
  const [coin, setCoin] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const usersCol = query(
      collection(db, 'users'),
      where('email', '==', dataUser.email),
    );
    try {
      const usersSnapshot = await getDocs(usersCol);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      setCoin(usersList[0].points);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator visible={loading} />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <AppText style={{fontSize: 25}}>Point hiện tại: </AppText>
            <AppText style={{color: 'red', fontSize: 25}}>{coin}</AppText>
          </View>
          <View style={{marginVertical:20}}>
            <AppText>Quét mã QR dưới đây để nạp thêm point</AppText>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <AppText>Tỉ lệ quy đổi: </AppText>
              <AppText style={{fontWeight: 'bold', color: StylesShare.app}}>1000 VNĐ = 1 Point</AppText>
            </View>
          </View>

          <View style={{marginTop:20}}>
            <Image source={require('../../assets/images/qr.png')} style={{width:250, height:250, alignSelf: 'center'}}/>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Coin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
