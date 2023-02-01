import { Route, Routes } from "react-router-dom";
import "./App.css";
import Address from "./Components/Address/Address";
import Cart from "./Components/Cart/Cart";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import ChangeProfile from "./Components/ChangeProfile/ChangeProfile";
import Checkout from "./Components/Checkout/Checkout";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import NotFound from "./Components/NotFound";
import Order from "./Components/Order/Order";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Profile from "./Components/Profile/Profile";
import Setting from "./Components/Setting/Setting";
import Signup from "./Components/Signup/Signup";
import UploadProfileImage from "./Components/UploadProfileImage/UploadProfileImage";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="productDetails/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="address" element={<Address />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order" element={<Order />} />
        <Route path="orderDetails/:id" element={<OrderDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Setting />}>
          <Route path="changeprofile" element={<ChangeProfile />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="uploadprofileimage" element={<UploadProfileImage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
