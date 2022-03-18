import React from "react";
import { Text } from "react-native";
import StylesShare from "../config/styles";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[{fontSize:16, fontFamily: StylesShare.fontFamily}, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;