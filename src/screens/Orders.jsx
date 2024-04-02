import React, { useEffect } from "react";
import { FlatList, View, Image, Text } from "react-native";
import OrderItem from "../components/OrderItem";
import { useGetOrdersbyUserQuery } from "../services/shopService.js";
import sad from "../../assets/sad.png"
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../features/shop/ordersSlice.js";
import { commonStyles } from '../global/commonStyles';

const Orders = () => {
  const {user} = useSelector(state => state.authReducer.value)
  const orders = useSelector((state) => state.ordersReducer.value);
  const confirmedOrder = useSelector((state) => state.confirmedOrderReducer.value);
  const dispatch = useDispatch();
  const { data: ordersByUser, refetch } = useGetOrdersbyUserQuery(user.toString());

  useEffect(() => {
    if (ordersByUser || confirmedOrder) {
      refetch()
      const sortedOrders = ordersByUser ? Object.values(ordersByUser).sort((a, b) => {
        const dateA = new Date(a.orderCreatedAt);
        const dateB = new Date(b.orderCreatedAt);
        return dateB - dateA;
      }) : [];
  
      dispatch(setOrders(sortedOrders));
    }
  }, [ordersByUser, confirmedOrder]);

  return (
    <View style={commonStyles.headerContainer}>
        <View style={commonStyles.container}>
        {orders !== undefined && orders.length > 0 ? 
          (
            <FlatList
              data={orders}
              renderItem={({ item }) => <OrderItem item={item} />}
              keyExtractor={(item) => item.orderId}
              style={commonStyles.flatList}
            />
          ) : (
            <View style={commonStyles.spinnerContainer}>
              <Image source={sad} style={commonStyles.image} />
              <Text style={commonStyles.title}>Orders not available at this time.</Text>
            </View>
          )
        }
        </View>
    </View>
  );
};

export default Orders;