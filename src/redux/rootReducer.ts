import { baseApi } from "./api/baseApi";
import userReducer from "./slice/userSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
  //   searchAndFilter: searchAndFilterReducer,
};
