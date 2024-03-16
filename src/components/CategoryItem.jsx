import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/shop/shopSlice";

const CategoryItem = ({navigation, category }) => {
  const dispatch = useDispatch()

  const formatCategoryName = (category) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card style={{ marginVertical: 20, marginHorizontal: 20 }}>
      <Pressable 
      onPress={() => {
        dispatch(setCategorySelected(category));
        navigation.navigate("ItemListCategories", { category })
      }}>
        <Text style={styles.text}>{formatCategoryName(category)}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  text: {
    width: "100%",
    fontSize: 25,
    fontFamily: "oswaldRegular",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  }
});
