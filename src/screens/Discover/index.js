import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../../components/Button';
import {db} from '../../../firebase/firebase-config';
import {collection, getDocs} from 'firebase/firestore/lite';
import Card from '../../components/Card';
import StylesShare from '../../config/styles';

const Discover = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [data.length==0]);

  const getData = async () => {
    const modelCol = collection(db, 'model');
    const modelSnapshot = await getDocs(modelCol);
    setLoading(false);
    const modelList = modelSnapshot.docs.map(doc => doc.data());
    setData(modelList);
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

  const removeTopCard = useCallback(()=>{
    setData((prevState)=>prevState.slice(1));
    swipe.setValue({x: 0, y: 0})
  }, [swipe])

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          {data
            ?.map(({name, images}, index) => {
              const isFirst = index === 0;
              const dragHandlers = isFirst ? panResponder.panHandlers : {};

              return (
                <Card
                  key={name}
                  name={name}
                  source={images[0]}
                  isFirst={isFirst}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  {...dragHandlers}
                />
              );
            })
            .reverse()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
});
