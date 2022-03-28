import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import StylesShare from '../config/styles';
import LinearGradient from 'react-native-linear-gradient';
import Choice from './Choice';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Card = ({
  name,
  source,
  isFirst,
  swipe,
  tiltSign,
  screenName,
  id,
  ...rest
}) => {
  const navigation = useNavigation();

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            {opacity: likeOpacity},
          ]}>
          <Choice type="like" color="#00eda6" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            {opacity: nopeOpacity},
          ]}>
          <Choice type="nope" color="#ff006f" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate}],
  };

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}>
      <Image source={{uri: source}} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />
      <Text style={styles.name}>{name}</Text>
      {/* {isFirst && renderChoice()} */}
      <TouchableOpacity onPress={() => navigation.navigate(screenName, id)}>
        <Text style={styles.detail}>Chi tiết</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    //top: 50,
  },
  image: {
    width: width * 0.9,
    height: height * 0.73,
    borderRadius: 20,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    borderRadius: 20,
  },
  name: {
    position: 'absolute',
    bottom: 42,
    left: 22,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: StylesShare.fontFamily,
  },
  detail: {
    color: 'orange',
    position: 'absolute',
    zIndex:999,
    bottom: 10,
    right: 10,
    fontFamily: StylesShare.fontFamily,
    fontSize: 20,
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{rotate: '-30deg'}],
  },
  nopeContainer: {
    right: 45,
    transform: [{rotate: '30deg'}],
  },
});
