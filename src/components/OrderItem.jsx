import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { colors } from "../global/colors.js";
import Card from './Card';

const OrderItem = ({ item }) => {
  const orderId = item.orderId;
  const cartItems = item.cartItems;

  return (
    <Card style={styles.orderContainer}>
      <Text style={styles.text}>Order ID: {orderId}</Text>
      <Text style={styles.text}>Products:</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item: cartItem, index }) => (
          <View key={`${orderId}_cartItem_${index}`} style={styles.cartItem}>
            <Text style={styles.cartItemText}>{cartItem.quantity} - {cartItem.title} - {cartItem.quantity * cartItem.price} $</Text>
          </View>
        )}
        keyExtractor={(cartItem, index) => `${orderId}_cartItem_${index}`}
      />
      <Text style={styles.text}>Created at: {item.orderCreatedAt}</Text>
      <Text style={styles.text}>Total: {item.total}$</Text>
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 25,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.grayScale2
  },
  text: {
    fontSize: 14,
    marginLeft: "4%",
    width: "100%",
    color: "white",
    textAlign: "left",
    fontFamily: "oswaldRegular",
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginLeft: 14,
  },
  cartItemText: {
    fontSize: 10,
    color: "white",
    fontFamily: "oswaldRegular",
    marginLeft: 10,
  },
});
