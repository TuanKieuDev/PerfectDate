import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import StylesShare from "../config/styles";


function AppButton({ title, onPress, color = "primary",textColor }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: StylesShare[color] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, {color:textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: StylesShare.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    // color: 'white',
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
