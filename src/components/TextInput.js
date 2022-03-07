import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import StylesShare from "../config/styles";
import Icon from "react-native-vector-icons/AntDesign"


function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color='black'
          style={styles.icon}
        />
      )}
      <TextInput
        autoCapitalize="none"
        placeholderTextColor={StylesShare.medium}
        style={StylesShare.fontFamily}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StylesShare.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf:'center'
  },
});

export default AppTextInput;
