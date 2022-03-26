import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import StylesShare from '../config/styles';
import {useNavigation} from '@react-navigation/native';
import AppText from './Text';
import Icon from 'react-native-vector-icons/Entypo';
import Heart from './Heart';

const LikeCard = ({item, screenName, ...rest}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(screenName, item.id)}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: item.images[0]}} style={styles.img} />
        <View style={styles.info}>
            <AppText style={styles.name}>{item.name}</AppText>
            <AppText>{item.age} tuổi</AppText>
            <View style={{flexDirection: 'row', marginTop:10}}>
                <Icon name="location" size={20} color="blue" />
                <AppText style={styles.locationTxt}>
                  {item.location}
                </AppText>
              </View>
        </View>
      </View>

      <Heart style={styles.heart}/>
    </TouchableOpacity>
  );
};

export default LikeCard;

const styles = StyleSheet.create({
  container: {
    width: StylesShare.screenWidth - 40,
    height: 120,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    //shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    marginLeft:10,
  },
  name: {
    fontSize:22,
    color: StylesShare.app,
  },
  locationTxt: {
      marginLeft: 10, 
      fontWeight: '500'
  },
  heart: {
    position: 'absolute',
    right:10
  }
});
