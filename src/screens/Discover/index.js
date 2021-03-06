import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, {useState, useEffect,useLayoutEffect, useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../../firebase/firebase-config';
import {collection, getDocs, where, query} from 'firebase/firestore/lite';
import Card from '../../components/Card';
import StylesShare from '../../config/styles';
import RoundButton from '../../components/RoundButton';
import ActivityIndicator from '../../components/ActivityIndicator'

const Discover = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isGirl, setIsGirl] = useState(true);

  useEffect(() => {
    
    isGirl?getDataFemale():getDataMale();
  }, [data.length == 0]);

  const getDataMale = async () => {
    setLoading(true);
    const modelCol = query(
      collection(db, 'model'),
      where('genres', '==', 'male'),
    );
    try {
      const modelSnapshot = await getDocs(modelCol);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      const modelList = modelSnapshot.docs.map(doc => doc.data());
      setData(modelList);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getDataFemale = async () => {
    setLoading(true);
    const modelCol = query(
      collection(db, 'model'),
      where('genres', '==', 'female'),
    );
    try {
      const modelSnapshot = await getDocs(modelCol);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      const modelList = modelSnapshot.docs.map(doc => doc.data());
      setData(modelList);
    } catch (error) {
      console.log('error', error);
    }
  };

  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      tiltSign.setValue(y0 > (StylesShare.screenHeight * 0.75) / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setData(prevState => prevState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  return (
    <>
        <ActivityIndicator visible={loading}/>
        <SafeAreaView>
        <View style={styles.container}>
          {data
            ?.map(({name, images, id}, index) => {
              const isFirst = index === 0;
              const dragHandlers = isFirst ? panResponder.panHandlers : {};

              return (
                <Card
                  key={name}
                  name={name}
                  id={id}
                  source={images[0]}
                  isFirst={isFirst}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  screenName="DiscoverDetail"
                  {...dragHandlers}
                />
              );
            })
            .reverse()}
          
        </View>
        </SafeAreaView>
        <View style={styles.choiceButton}>
            <RoundButton name="female" size={20} color="#ff006f" onPress={()=>{getDataFemale();setIsGirl(true)}}/>
            <RoundButton name="male" size={20} color="#00eda6" onPress={()=>{getDataMale();setIsGirl(false)}}/>
        </View>
    </>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  choiceButton: {
    position: 'absolute',
    flexDirection: 'row',
    //top: StylesShare.screenHeight * 0.78,
    bottom:20,
    width: '100%',
    justifyContent: 'space-around',
    zIndex: -1,
  },
});
