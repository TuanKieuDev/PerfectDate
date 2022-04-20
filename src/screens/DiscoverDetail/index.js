import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore/lite';
import {db} from '../../../firebase/firebase-config';
import StylesShare from '../../config/styles';
import Icon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AppText from '../../components/Text';
import ActivityIndicator from '../../components/ActivityIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiscoverDetail = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const id = route.params;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [isLiked]);

  const getData = async () => {
    const modelCol = query(collection(db, 'model'), where('id', '==', id));
    try {
      const modelSnapshot = await getDocs(modelCol);
      const modelList = modelSnapshot.docs.map(doc => doc.data());
      setData(modelList[0]);
      const jsonValue = await AsyncStorage.getItem('userInfo');
      // setDataUser(JSON.parse(jsonValue));
      const re = JSON.parse(jsonValue);
      const usersCol = query(
        collection(db, 'users'),
        where('email', '==', re.email),
      );
      const usersSnapshot = await getDocs(usersCol);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      setDataUser(usersList[0]);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const generateColor = index => {
    switch (index) {
      case 1:
        return 'red';
        break;
      case 2:
        return 'blue';
        break;
      case 3:
        return 'green';
        break;
      case 0:
        return 'violet';
        break;
      default:
        break;
    }
  };

  const handleLike = async () => {
    const usersCol = query(
      collection(db, 'users'),
      where('email', '==', dataUser?.email),
    );
    try {
      const usersSnapshot = await getDocs(usersCol);
      await updateDoc(doc(db, 'users', `${usersSnapshot.docs[0].id}`), {
        like: arrayUnion(`${data?.id}`),
      });
      isLiked == false ? setIsLiked(true) : setIsLiked(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleUnlike = async () => {
    const usersCol = query(
      collection(db, 'users'),
      where('email', '==', dataUser?.email),
    );
    try {
      const usersSnapshot = await getDocs(usersCol);
      await updateDoc(doc(db, 'users', `${usersSnapshot.docs[0].id}`), {
        like: arrayRemove(`${data?.id}`),
      });
      //setIsLiked(false);
      isLiked == true ? setIsLiked(false) : setIsLiked(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  // console.log('idddd', dataUser);
  return (
    <>
      <ActivityIndicator visible={loading} />
      <View>
        <ScrollView style={styles.container}>
          <Image source={{uri: data?.images[0]}} style={styles.img} />

          <View style={{paddingHorizontal: 20}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.txt, styles.name]}>{data?.name}</Text>
                <AntIcon
                  name="checkcircle"
                  size={25}
                  color="green"
                  style={{marginTop: 5, marginLeft: 10}}
                />
              </View>

              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Icon name="location" size={20} color="blue" />
                <Text style={{fontSize: 16, marginLeft: 10, fontWeight: '500'}}>
                  {data?.location}
                </Text>
              </View>
              <AppText>{data?.age} tuổi</AppText>

              {/* <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  Lượt thích:{' '}
                </Text>
                <Text style={{color: 'red', fontSize: 16}}>{data?.liked}</Text>
              </View> */}
              {dataUser?.like.includes(`${data?.id}`) ? (
                <TouchableOpacity
                  style={styles.likePosition}
                  onPress={() => handleUnlike()}>
                  {/* <Image
                    source={require('../../assets/icons/member1.png')}
                    style={{width: 60, height: 60}}
                  /> */}
                  <AntIcon size={40} name="heart" color={'red'}/>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.likePosition}
                  onPress={() => handleLike()}>
                  {/* <Image
                    source={require('../../assets/icons/member2.png')}
                    style={{width: 60, height: 60}}
                  /> */}
                  <AntIcon size={40} name="hearto"/>
                </TouchableOpacity>
              )}
            </View>

            <View>
              <Text style={styles.title}>Giới thiệu</Text>
              <AppText>{data?.description}</AppText>
            </View>

            <Text style={styles.title}>Sở thích</Text>
            <View style={{flexDirection: 'row'}}>
              {data?.information.habit.map((item, index) => (
                <View
                  style={[
                    styles.habitBox,
                    {backgroundColor: generateColor(index)},
                  ]}
                  key={index}>
                  <Text style={[styles.txt, styles.habitName]}>{item}</Text>
                </View>
              ))}
            </View>

            <View>
              <Text style={styles.title}>Khác</Text>
              <AppText>Chiều cao: {data?.information.height} cm</AppText>
              <AppText>Cân nặng: {data?.information.weight} kg</AppText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('Checkout', {dataUser: dataUser, dataMol: data})}>
            <Image
              source={require('../../assets/icons/Booking.png')}
              style={{width: 40, height: 40, marginTop: -10, marginRight: 10}}
            />
            <AppText style={styles.checkoutTxt}>Lên lịch</AppText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default DiscoverDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  img: {
    width: StylesShare.screenWidth,
    height: StylesShare.screenWidth * 1.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontFamily: StylesShare.fontFamily,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  txt: {
    fontFamily: StylesShare.fontFamily,
  },
  name: {
    color: StylesShare.app,
    fontSize: 30,
    fontWeight: 'bold',
  },
  likePosition: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  habitBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 30,
    marginHorizontal: 5,
  },
  habitName: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
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
