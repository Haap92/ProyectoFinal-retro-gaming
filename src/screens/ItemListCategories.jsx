import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import ProductItem from "../components/ProductItem";
import Searchbar from "../components/Searchbar";
import { useSelector } from "react-redux";
import { useGetProductsbyCategoryQuery } from "../services/shopService.js";
import CustomButton from "./../components/CustomButton.jsx";
import { commonStyles } from '../global/commonStyles';

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
    <View style={commonStyles.headerContainer}>
      <Searchbar onSearch={setKeyword} />
      <View style={commonStyles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={commonStyles.flatList}
        />
        <CustomButton
          title="Go Back!!"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

export default ItemListCategories;