import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import StylesShare from '../config/styles'
import { useNavigation } from '@react-navigation/native'

const AccountSector = ({imgSource,name,screenName, props}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.shadowBox} onPress={() => navigation.navigate(screenName, props)}> 
        <Image source={imgSource} style={styles.img}/>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
  )
}

export default AccountSector

const styles = StyleSheet.create({
    shadowBox: {
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#c6ccc8',
        padding: 10,
        backgroundColor: '#fff',
    },
    img: {
        width:40,
        height:40,
    },
    name:{
        marginLeft:10,
        fontFamily: StylesShare.fontFamily,
        fontSize:17,
    },
})