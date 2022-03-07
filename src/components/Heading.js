import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StylesShare from '../config/styles'

const Heading = ({children, style, ...props}) => {
  return <Text {...props} style={[style, styles.text]}>{children}</Text>
}

export default Heading

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Bold",
        fontSize:38,
        //color: 'black',
        textTransform: 'uppercase',
        textAlign:'center',
        paddingTop: 110,
    }
})