import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import StylesShare from '../config/styles';
import AppText from './Text';

const DateCard = ({item, ...rest}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.img} />
      <View style={styles.info}>
        <AppText style={styles.name}>{item.name}</AppText>
        <AppText style={styles.date}>{item.date}</AppText>
        <AppText style={styles.title}>{item.title}</AppText>
      </View>
    </View>
  );
};

export default DateCard;

const styles = StyleSheet.create({
  container: {
    width: StylesShare.screenWidth - 40,
    height: 120,
    backgroundColor: '#fff',
    flexDirection:'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
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
  date: {
    marginTop:10,
    fontSize:18,
    color: 'green',
  },
  title: {
    marginTop:10, 
    fontSize: 20,
    color: 'purple'
  },
});
