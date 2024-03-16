import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import shopReducer from '../features/shop/shopSlice';
import cartReducer from '../features/shop/cartSlice';
import authReducer from "../features/auth/authSlice";
import ordersReducer from "../features/shop/ordersSlice"
import confirmedOrderReducer from "../features/shop/confirmedOrderSlice"
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";

export default configureStore({
  reducer: {
    counter: counterReducer,
    shopReducer,
    cartReducer,
    ordersReducer,
    confirmedOrderReducer,
    authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware),
});

setupListeners(configureStore.dispatch);
