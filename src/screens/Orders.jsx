import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Image, Text } from "react-native";
import OrderItem from "../components/OrderItem";
import { colors } from "../global/colors.js";
import { useGetOrdersbyUserQuery } from "../services/shopService.js";
import sad from "../../assets/sad.png"
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../features/shop/ordersSlice.js";

const Orders = () => {
  const {user, localId} = useSelector(state => state.authReducer.value)
  const orders = useSelector((state) => state.ordersReducer.value);
  const confirmedOrder = useSelector((state) => state.confirmedOrderReducer.value);
  const dispatch = useDispatch();
  const { data: ordersByUser, isLoading, error, refetch } = useGetOrdersbyUserQuery(user.toString());

  useEffect(() => {
    if (ordersByUser || confirmedOrder) {
      refetch();
      const sortedOrders = Object.values(ordersByUser).sort((a, b) => {
        const dateA = new Date(a.orderCreatedAt);
        const dateB = new Date(b.orderCreatedAt);
        return dateB - dateA;
      });

      dispatch(setOrders(sortedOrders));
    }
  }, [ordersByUser, confirmedOrder]);

  return (
    <View style={styles.headerContainer}>
        <View style={styles.container}>
        {orders && orders.length > 0 ? 
          (
            <FlatList
              data={orders}
              renderItem={({ item }) => <OrderItem item={item} />}
              keyExtractor={(item) => item.orderId}
              style={styles.flatList}
            />
          ) : (
            <View style={styles.spinnerContainer}>
              <Image source={sad} style={styles.image} />
              <Text style={styles.title}>Orders not available at this time.</Text>
            </View>
          )
        }
        </View>
    </View>
  );
};

export default Orders;

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
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
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
});
