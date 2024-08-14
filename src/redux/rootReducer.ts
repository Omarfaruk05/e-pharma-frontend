import { baseApi } from "./api/baseApi";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
  cart: cartReducer,
  //   searchAndFilter: searchAndFilterReducer,
};
