import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import CartItem from "../components/CartItem";
import { colors } from "../global/colors.js";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from '../../assets/emptyCart.png';
import checkout from '../../assets/checkout.png';
import { usePostOrderMutation } from "../services/shopService";
import { cleanCart } from "../features/shop/cartSlice.js";
import { setConfirmedOrder } from "../features/shop/confirmedOrderSlice.js"

const Cart = ({ navigation }) => {
    const {user, localId} = useSelector(state => state.authReducer.value)
    const cartItems = useSelector((state) => state.cartReducer.value.items);
    const total = useSelector((state) => state.cartReducer.value.total);
    const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5); 
        return timestamp + randomNum; 
    }
    const orderId = generateOrderId();
    const orderCreatedAt = new Date().toLocaleString();
    const [triggerPost, result] = usePostOrderMutation();
    const dispatch = useDispatch();

    const confirmCart = ()=> {
        triggerPost({ orderId, orderCreatedAt, total, cartItems, user});
        dispatch(setConfirmedOrder({ orderId }));
    }

    const onCleanCart = ()=> {
        dispatch(cleanCart());
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                {cartItems.length > 0 ?(
                <View>
                    <FlatList
                    data={cartItems}
                    renderItem={({ item }) => <CartItem item={item} />}
                    keyExtractor={(cartItem) => cartItem.id}
                    style={styles.flatList}
                    />
                    <View style={styles.checkoutContainer}>
                        <Text style={styles.totalText}>Total: {total}$</Text>
                        <Pressable onPress={() => {
                            confirmCart();
                            onCleanCart();
                            navigation.navigate("OrdersTab");
                        }}>
                            <Image source={checkout} style={styles.checkout} />
                        </Pressable>
                    </View>
                </View> ) : (
                <View style={styles.spinnerContainer}>
                    <Image source={emptyCart} style={styles.image} />
                    <Text style={styles.title}>Your Cart is Empty.</Text>
                </View>
                )}
        
            </View>
        </View>
    );
};

export default Cart;

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
    checkoutContainer:{
        width: 300, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', 
        backgroundColor: colors.grayScale2,
    },
    totalText: {
        fontFamily: 'oswaldBold',
        fontSize: 18,
        color: colors.mustard0
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
    checkout: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "oswaldRegular",
        color: colors.mustard0
     },
});