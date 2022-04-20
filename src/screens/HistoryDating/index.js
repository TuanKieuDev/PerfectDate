import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {db} from '../../../firebase/firebase-config';
import {collection, getDocs, where, query, doc} from 'firebase/firestore/lite';
import ActivityIndicator from '../../components/ActivityIndicator';
import AppText from '../../components/Text';
import DateCard from '../../components/DateCard';

const HistoryDating = ({route}) => {
  const dataUser = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().getTime();

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
      setData(usersList[0].dated);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('date', (new Date()).getTime());
  console.log('date2', Date.parse(data[0]?.date));
  return (
    <>
      {loading ? (
        <ActivityIndicator visible={loading} />
      ) : (
        <SafeAreaView style={styles.container}>
          {data.map((item, index) => (
              <View style={{opacity:(Date.parse(item?.date)<today)?0.2:1}} key={index}>
                <DateCard item={item}/>
              </View>
              ))}
        </SafeAreaView>
      )}
    </>
  )
}

export default HistoryDating

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
})