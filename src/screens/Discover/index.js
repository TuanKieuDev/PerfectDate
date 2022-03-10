import { StyleSheet, Text, View, Button, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../components/Button'
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore/lite';


const Discover = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(()=> {
    getData()
  }, []);

  const getData = async () => {
    const modelCol = collection(db, 'model');
    const modelSnapshot = await getDocs(modelCol);
    setLoading(false);
    const modelList = modelSnapshot.docs.map(doc => doc.data())
    setData(modelList)
  }


  return (
    <SafeAreaView>
      {loading?<ActivityIndicator/>:
      <>
      {console.log(data)}
      <Text>{data[0]?.description}</Text>
      <Image source={{uri: data[0]?.images[0]}} style={{width:100, height:100}}/>
      <Button title="DiscoverDetail" onPress={()=>navigation.navigate('DiscoverDetail')}/>
      </>
      }
    </SafeAreaView>
  )
}

export default Discover

const styles = StyleSheet.create({})