import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundButton from './RoundButton'
import StylesShare from '../config/styles'

const Footer = () => {
  return (
    <View style={styles.container}>
      <RoundButton name="forward" size={30} color='#ff006f'/>
      <RoundButton name="forward" size={30} color='#00eda6'/>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        top:StylesShare.screenHeight *0.82,
        width: 170,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: -1
    }
})