import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DiscoverDetail = ({route}) => {
  const navigation = useNavigation()
  const name = route.params
  console.log('name', name);
  return (
    <SafeAreaView>
      <Text>{name}</Text>
      <Button title='Checkout' onPress={()=> navigation.navigate('Checkout')}/>
    </SafeAreaView>
  )
}

export default DiscoverDetail

const styles = StyleSheet.create({})