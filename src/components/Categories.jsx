import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from "../services/shopService";

const Categories = ({ navigation }) => {
  const { data } = useGetCategoriesQuery();
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CategoryItem navigation={navigation} category={item} />
      )}
      keyExtractor={(category) => category}
      numColumns={1}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
  },
});

export default Categories;
