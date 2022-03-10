import { StyleSheet, Animated, View, TouchableWithoutFeedback } from 'react-native'
import React, {useCallback, useRef} from 'react'
import Icon from 'react-native-vector-icons/Fontisto'

const RoundButton = ({name, size, color, onPress}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback(
      (newValue) => {
          Animated.spring(scale, {
              toValue: newValue,
              friction: 4,
              useNativeDriver: true,
          }).start()
      },
      [scale]
  );

  return (
    <TouchableWithoutFeedback
        onPressIn={()=>animateScale(0.8)}
        delayPressIn={0}
        onPressOut={()=>{
            animateScale(1);
            onPress();
        }}
        delayPressOut={110}
    >
        <Animated.View style={[styles.container, {transform: [{scale}]}]}>
            <Icon name={name} size={size} color={color}/>
        </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default RoundButton

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})