import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDocs, query, collection, where} from 'firebase/firestore/lite';
import {db} from '../../../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicator from '../../components/ActivityIndicator';
import LikeCard from '../../components/LikeCard';
import AppText from '../../components/Text';
import Icon from 'react-native-vector-icons/AntDesign'

const Favourite = ({navigation}) => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('userInfo');
    const re = JSON.parse(jsonValue);
    const usersCol = query(
      collection(db, 'users'),
      where('email', '==', re.email),
    );
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    console.log(usersList[0].like);
    try {
      if (usersList[0].like.length > 0) {
        const modelCol = query(
          collection(db, 'model'),
          where('id', 'in', usersList[0].like),
        );
        const modelSnapshot = await getDocs(modelCol);
        const modelList = modelSnapshot.docs.map(doc => doc.data());
        setData(modelList);
        // console.log(modelList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderItem = ({item}) => (
    <LikeCard item={item} screenName={'DiscoverDetail'} />
  );

  return (
    <>
    {console.log(data, 'dattt')}
      {loading ? (
        <ActivityIndicator visible={loading} />
      ) : (
        data.length != 0 ? (
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AppText>Bạn chưa thích đối tượng nào cả</AppText>
          <Icon name='frowno' size={70} style={{marginTop:10}}/>
        </View>
      )
      )
      }
    </>
  );
};

export default Favourite;

const styles = StyleSheet.create({});
