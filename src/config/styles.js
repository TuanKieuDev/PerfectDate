import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export const StylesShare = {
  primary: 'purpose',
  secondary: 'red',
  app: '#db165e',
  light: "#f8f4f4",
  medium: "#6e6969",
  dark: "#0c0c0c",
  danger: "#ff5252",
  while: '#FFF',
  black: '#000',
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  fontFamily: 'Roboto-Regular',
  
}

export default StylesShare;