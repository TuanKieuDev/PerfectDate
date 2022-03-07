import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Favourite = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Favourite</Text>
      <Button title='DiscoverDetail' onPress={()=>navigation.navigate('DiscoverDetail')}/>
    </View>
  )
}

export default Favourite

const styles = StyleSheet.create({})