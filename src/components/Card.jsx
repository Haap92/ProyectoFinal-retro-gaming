import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../global/colors.js"

const Card = ({ children, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: colors.grayScale2,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: colors.mustard0,
    borderWidth: 2,
  },
});
