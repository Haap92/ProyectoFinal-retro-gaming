import { FlatList, Pressable, Text, View, Image } from "react-native";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from '../../assets/emptyCart.png';
import checkout from '../../assets/checkout.png';
import { usePostOrderMutation } from "../services/shopService";
import { cleanCart } from "../features/shop/cartSlice.js";
import { setConfirmedOrder } from "../features/shop/confirmedOrderSlice.js";
import { commonStyles } from '../global/commonStyles';

const Cart = ({ navigation }) => {
    const {user} = useSelector(state => state.authReducer.value)
    const cartItems = useSelector((state) => state.cartReducer.value.items);
    const total = useSelector((state) => state.cartReducer.value.total);
    const generateOrderId = () => {
        const timestamp = Date.now().toString(36);
        const randomNum = Math.random().toString(36).substr(2, 5); 
        return timestamp + randomNum; 
    }
    const orderId = generateOrderId();
    const orderCreatedAt = new Date().toLocaleString();
    const [triggerPost] = usePostOrderMutation();
    const dispatch = useDispatch();

    const confirmCart = ()=> {
        triggerPost({ orderId, orderCreatedAt, total, cartItems, user});
        dispatch(setConfirmedOrder({ orderId }));
    }

    const onCleanCart = ()=> {
        dispatch(cleanCart());
    }

    return (
        <View style={commonStyles.headerContainer}>
            <View style={commonStyles.container}>
                {cartItems.length > 0 ?(
                <View>
                    <FlatList
                    data={cartItems}
                    renderItem={({ item }) => <CartItem item={item} />}
                    keyExtractor={(cartItem) => cartItem.id}
                    style={commonStyles.flatList}
                    />
                    <View style={commonStyles.checkoutContainer}>
                        <Text style={commonStyles.totalText}>Total: {total}$</Text>
                        <Pressable onPress={() => {
                            confirmCart();
                            onCleanCart();
                            navigation.navigate("OrdersTab");
                        }}>
                            <Image source={checkout} style={commonStyles.checkout} />
                        </Pressable>
                    </View>
                </View> ) : (
                <View style={commonStyles.spinnerContainer}>
                    <Image source={emptyCart} style={commonStyles.image} />
                    <Text style={commonStyles.title}>Your Cart is Empty.</Text>
                </View>
                )}
        
            </View>
        </View>
    );
};

export default Cart;