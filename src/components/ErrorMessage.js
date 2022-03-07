import React from "react";
import { StyleSheet,Text } from "react-native";
import StylesShare from "../config/styles";


function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { 
      color: "red", 
      fontFamily: StylesShare.fontFamily,
    },
});

export default ErrorMessage;
