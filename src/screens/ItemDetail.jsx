import { Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import spinner from '../../assets/spinner.gif';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/shop/cartSlice.js";
import Counter from "../components/Counter.jsx";
import { reset } from "../features/counter/counterSlice.js";
import CustomButton from "./../components/CustomButton.jsx";
import { commonStyles } from '../global/commonStyles';

 
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
    <View style={commonStyles.headerContainer}>
      <View style={commonStyles.container}>
        {product ? (
          <View style={commonStyles.productContainer}>
            <Image source={{ uri: product.images[0] }} style={commonStyles.image} />
            <Text style={commonStyles.title}>{product.title}</Text>
            <Text style={commonStyles.description}>{product.description}</Text>
            <Text style={commonStyles.price}>Price: ${product.price}</Text>
            <Text style={commonStyles.discount}>Discount: {product.discountPercentage}%</Text>
            <Text style={commonStyles.rating}>Rating: {product.rating}</Text>
            <Text style={commonStyles.brand}>Brand: {product.brand}</Text>
            <Text style={commonStyles.category}>Category: {product.category}</Text>
            <Counter/>  
            <Pressable 
              style={commonStyles.addToCart}  
              onPress={() => {
                onAddCart();
                navigation.navigate("CartTab");
              }}>
              <Text style={commonStyles.addToCartText}>Add to Cart!</Text>
            </Pressable>
          </View>
        ) : (
          <View style={commonStyles.spinnerContainer}>
            <Image source={spinner} style={commonStyles.image} />
            <Text style={commonStyles.title}>Loading...</Text>
          </View>
        )}
        <CustomButton
          title="Go Back!!"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default ItemDetail;