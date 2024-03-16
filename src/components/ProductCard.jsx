import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../global/colors.js"

const ProductCard = ({ children, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.grayScale2,
    padding: 10,
    margin: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: colors.mustard0,
    borderWidth: 2,
    justifyContent: "space-between"

  },
});
