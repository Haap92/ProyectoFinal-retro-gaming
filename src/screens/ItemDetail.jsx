import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../global/colors.js";
import spinner from '../../assets/spinner.gif';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/shop/cartSlice.js";
import Counter from "../components/Counter.jsx";
import { reset } from "../features/counter/counterSlice.js";

 
const ItemDetail = ({ navigation }) => {
  const [product, setProduct] = useState(null);
  const quantity = useSelector(state => state.counter.value);
  const productDetailId = useSelector(state => state.shopReducer.value.productIdSelected)

  const dispatch = useDispatch();

  const onAddCart = () => {
    dispatch(addItem({...product, quantity: quantity}));
    dispatch(reset(quantity));
  };

  useEffect(() => {
    const productFound = productDetailId;
    setProduct(productFound);
  }, [productDetailId]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        {product ? (
          <View style={styles.productContainer}>
            <Image source={{ uri: product.images[0] }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.discount}>Discount: {product.discountPercentage}%</Text>
            <Text style={styles.rating}>Rating: {product.rating}</Text>
            <Text style={styles.brand}>Brand: {product.brand}</Text>
            <Text style={styles.category}>Category: {product.category}</Text>
            <Counter/>  
            <Pressable 
              style={styles.addToCart}  
              onPress={() => {
                onAddCart();
                navigation.navigate("CartTab");
              }}>
              <Text style={styles.addToCartText}>Add to Cart!</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.spinnerContainer}>
            <Image source={spinner} style={styles.image} />
            <Text style={styles.title}>Loading...</Text>
          </View>
        )}
        <Button 
          style={styles.goBack}  
          color={colors.mustard0} 
          title="Go Back!!" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grayScale0,
  },

  container: {
    flex: 1,
    width: "80%",
    alignItems: "stretch",
    justifyContent: "space-evenly"

  },
  productContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.grayScale1,
  },
  spinnerContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.grayScale0,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "oswaldRegular",
    color: colors.mustard0
  },
  description: {
    marginBottom: 10,
    color: colors.mustard0
  },
  price: {
    marginBottom: 5,
    color: "white"
  },
  discount: {
    marginBottom: 5,
    color: "white"
  },
  rating: {
    marginBottom: 5,
    color: "white"
  },
  brand: {
    marginBottom: 5,
    color: "white"
  },
  category: {
    marginBottom: 5,
    color: "white"
  },
  goBack: {
    width: 100,
    height: 50,
    color: "white",
    borderRadius: 25
  },
  addToCart: {
    marginTop: 20,
    backgroundColor: colors.mustard0,
    borderRadius: 5
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "oswaldRegular",
    margin: 5
  }
});