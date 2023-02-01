import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
  allOrderReducer,
  cartReducer,
  changePasswordReducer,
  changeProfileReducer,
  getProfileReducer,
  loginReducer,
  oneOrderReducer,
  orderReducer,
  productDetailsReducer,
  productsReducer,
  uploadProfileReducer,
  userSignupReducer,
} from "./reducer";

const middleWare = [thunk];
const reducers = combineReducers({
  products: productsReducer,
  productdetails: productDetailsReducer,
  cart: cartReducer,
  signup: userSignupReducer,
  login: loginReducer,
  order: orderReducer,
  user: getProfileReducer,
  changeprofile: changeProfileReducer,
  changepassword: changePasswordReducer,
  uploadprofile: uploadProfileReducer,
  allorder: allOrderReducer,
  oneorder: oneOrderReducer,
});

const cartItemsLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userLocalStorage = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const orderLocalStorage = localStorage.getItem("order")
  ? JSON.parse(localStorage.getItem("order"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsLocalStorage },
  login: { userInfo: userLocalStorage },
  order: { order: orderLocalStorage },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
