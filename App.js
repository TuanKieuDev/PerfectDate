import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React from 'react';
import SignIn from './src/screens/SignIn';
import Register from './src/screens/Register';
import Personal from './src/screens/Personal'; 
import Heading from './src/components/Heading';
import StylesShare from './src/config/styles';
import RootStack from './src/navigation/RootStack'

const App = () => {

  return (
    <RootStack/>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    paddingTop: StylesShare.screenHeight/10,
  }
});
