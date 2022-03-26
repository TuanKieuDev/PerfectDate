import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";


const Heart = ({style}) => {
  return (
    <View style={style}>
      <LottieView
        style={styles.heartLottie}
        source={require('../assets/lottie/heart.json')}
        autoPlay
      />
    </View>
  )
}

export default Heart

const styles = StyleSheet.create({
    heartLottie: {
        width:80,
        height:80,
    }
})