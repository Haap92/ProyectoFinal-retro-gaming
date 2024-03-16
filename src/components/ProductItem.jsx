import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { setProductIdSelected } from "../features/shop/shopSlice";

const ProductItem = ({ product, navigation }) => {
  const dispatch = useDispatch()
  return (
    <Pressable onPress={() => {
      dispatch(setProductIdSelected(product))
      navigation.navigate("ItemDetail", { productDetailId: product.id })
    }}>
      <ProductCard style={styles.productContainer}>
        <Image
          style={styles.image}
          source={{ uri: product.images[0] }}
          resizeMode="cover"
        />
        <Text style={styles.text}>{product.title}</Text>
      </ProductCard>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productContainer: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontSize: 14,
    width: "100%",
    color: "white",
    textAlign: "center",
    fontFamily: "oswaldRegular",
  },
  image: {
    width: 200,
    height: 200,
  },
});