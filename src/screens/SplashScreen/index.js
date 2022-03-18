import {StyleSheet, View, Platform} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import StylesShare from '../../config/styles';
import LottieView from 'lottie-react-native';

const Splash = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.MainContainer}>
      <LottieView
        source={require('../../assets/lottie/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={()=> navigation.navigate('Onboarding')}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: StylesShare.app,
  },
});
