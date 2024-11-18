// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        contact: contactReducer,
    },
});