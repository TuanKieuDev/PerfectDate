import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Choice = ({type, color}) => {
  return (
    <View style={[styles.container, {borderColor: color}]}>
      <Text style={[styles.text, {color}]}>{type}</Text>
    </View>
  );
};

export default Choice;

const styles = StyleSheet.create({
  container: {
    borderWidth: 7,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
});
