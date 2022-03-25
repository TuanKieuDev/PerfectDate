import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {collection, getDocs, where, query} from 'firebase/firestore/lite';
import {db} from '../../../firebase/firebase-config';
import StylesShare from '../../config/styles';
import Icon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AppText from '../../components/Text'

const DiscoverDetail = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const id = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const modelCol = query(collection(db, 'model'), where('id', '==', id));
    try {
      const modelSnapshot = await getDocs(modelCol);
      const modelList = modelSnapshot.docs.map(doc => doc.data());
      setData(modelList[0]);
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

  console.log(data?.information.habit);

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
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
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  Lượt thích:{' '}
                </Text>
                <Text style={{color: 'red', fontSize: 16}}>{data?.liked}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.title}>Giới thiệu</Text>
              <AppText>
                {data?.description}
              </AppText>
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
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={()=>navigation.navigate('Checkout', data)}>
            <Image source={require('../../assets/icons/Booking.png')} style={{width:40, height:40, marginTop:-10, marginRight:10}}/>  
            <AppText style={styles.checkoutTxt}>Lên lịch</AppText>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
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
    flexDirection:'row',
    backgroundColor: StylesShare.app,
    alignSelf: 'center',
    borderRadius:40,
    marginVertical:30,
    justifyContent:'center',
    alignItems:'center'
  },
  checkoutTxt: {
    fontSize:20,
    fontWeight:'600',
    color:'#fff',
  }
});
