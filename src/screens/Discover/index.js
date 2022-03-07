import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Discover = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Discover</Text>
      <Button title="DiscoverDetail" onPress={()=>navigation.navigate('DiscoverDetail')}/>
    </View>
  )
}

export default Discover

const styles = StyleSheet.create({})