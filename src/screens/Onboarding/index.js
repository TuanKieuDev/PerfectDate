import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Ion from 'react-native-vector-icons/dist/Ionicons'
import {useNavigation} from '@react-navigation/native'

const Onboarding = () => {
    const navigation = useNavigation();
    const slides = [
        {
            key: "slide1",
            image: require("../../assets/images/onboarding/ob1.png"),
            title: "Welcome to React Native News App.",
            text: "Here you can read latest news updates. By registering to this application.",
        },
        {
            key: "slide2",
            image: require("../../assets/images/onboarding/ob2.png"),
            title: "Read News",
            text: "Read news at anywhere at any place just by connecting to the internet.",
        },
        {
            key: "slide3",
            image: require("../../assets/images/onboarding/ob3.png"),
            title: "Add to favorite",
            text: "Add to your favorite read list and also you can add comments.",
        },
    ]

    const _renderItem = ({item}) => {
        return (
            <View style={styles.slide}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image}/>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                </View>
            </View>
        )
    }


    const _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ion name="arrow-forward-outline" color="rgba(255,255,255, .9)" size={24} />
            </View>
        )
    }

    const _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ion name="md-checkmark" color="rgba(255,255,255, .9)" size={24} />
            </View>
        )
    }

    const _renderSkipButton = () => {
        return (
            <View  style={styles.skipView}>
                <Text style={styles.skipTextColor}>Skip</Text>
            </View>
        )
    }

    const _onEndReached = () => {
        navigation.navigate('SignIn');
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            renderSkipButton={_renderSkipButton}
            onDone={_onEndReached}
            onSkip={_onEndReached}
            dotClickEnabled={true}
            showNextButton
            showDoneButton
            showSkipButton
        />
    )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingStart: '8%',
    paddingRight: '8%',
  },
  title: {
    color: '#182952',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingStart: '8%',
    paddingRight: '8%',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipTextColor: {
    color: '#062743',
    fontWeight: 'bold',
  },
  skipView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Onboarding




