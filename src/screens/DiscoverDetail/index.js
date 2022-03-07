import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DiscoverDetail = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>DiscoverDetail</Text>
      <Button title='Checkout' onPress={()=> navigation.navigate('Checkout')}/>
    </View>
  )
}

export default DiscoverDetail

const styles = StyleSheet.create({})