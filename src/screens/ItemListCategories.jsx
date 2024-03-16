import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import ProductItem from "../components/ProductItem";
import Searchbar from "../components/Searchbar";
import { colors } from "../global/colors.js"
import { useSelector } from "react-redux";
import { useGetProductsbyCategoryQuery } from "../services/shopService.js";

function ItemListCategories({ navigation }) {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const category = useSelector((state)=> state.shopReducer.value.categorySelected);
  const { data: productsFilteredByCategory, isLoading, error} = useGetProductsbyCategoryQuery(category);
  useEffect(() => {
    const lowercaseKeyword = keyword.toLowerCase();
    if (productsFilteredByCategory) {
      const productsRaw = Object.values(productsFilteredByCategory);
      const filteredProducts = productsRaw.filter((product) =>
        product.title.toLowerCase().includes(lowercaseKeyword)
      );
      setProducts(filteredProducts);
    } 
  }, [productsFilteredByCategory, keyword]);

  return (
    <View style={styles.headerContainer}>
      <Searchbar onSearch={setKeyword} />
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
        <Button 
          style={styles.goBack}  
          color={colors.mustard0} 
          title="Go Back!!" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
}

export default ItemListCategories;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grayScale0
  },
  searchbar:{
    alignItems: "center",
    backgroundColor: colors.grayScale1
  },
  container: {
    flex: 1,
    width: "80%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "stretch",
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
  },
  goBack:{
    width: 100,
    height: 50,
    color: "white",
    borderRadius: 25
  }
});
