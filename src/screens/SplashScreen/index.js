import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import StylesShare from '../../config/styles';

const Splash = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    const hideSplashScreen = () => {
        setIsVisible(false);
    }

    useEffect(()=> {
        setTimeout(() => {
            hideSplashScreen();
            navigation.navigate('Onboarding');
        },1000)
    }, []);

    const renderSplash = () => {
        return(
            <View style={styles.SplashScreen_RootView}>
                <View style={styles.SplashScreen_ChildView}>
                    <Image source={require('../../assets/icons/Logo.png')} style={{width:150, height:150, resizeMode:"contain"}}/>
                </View>
            </View>
        )
    }
  return (
    <View style={styles.MainContainer}>
      {isVisible?renderSplash():null}
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 20 : 0,
        backgroundColor: StylesShare.app
      },
    
      SplashScreen_RootView: {
        justifyContent: "center",
        flex: 1,
        margin: 10,
        position: "absolute",
        width: "100%",
        height: "100%",
      },
    
      SplashScreen_ChildView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
})