import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../../firebase/firebase-config'

const Favourite = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text>Favourite</Text>
      {/* <Button title='Set' onPress={setData}/> */}
      <Button title='DiscoverDetail' onPress={()=>navigation.navigate('DiscoverDetail')}/>
    </SafeAreaView>
  )
}

export default Favourite

const styles = StyleSheet.create({})