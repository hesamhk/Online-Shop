import axios from "axios";

export const getProducts = () => async (dispatch, getState) => {
  dispatch({ type: "productsRequest" });
  try {
    const { data } = await axios.get("http://kzico.runflare.run/product/");
    JSON.stringify(data);
    dispatch({ type: "productsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "productsFailed", payload: error.message });
  }
};

export const getProductDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: "productDetailRequest" });
  try {
    const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);
    dispatch({ type: "productDetailSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "productDetailFailed", payload: error.message });
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);
  dispatch({
    type: "cartAddItem",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  JSON.stringify(data);
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateProduct = (id) => (dispatch, getState) => {
  dispatch({ type: "updateCart", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeProduct = (id) => (dispatch, getState) => {
  dispatch({ type: "removeItem", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const plus = (id) => (dispatch, getState) => {
  dispatch({ type: "plus", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const minus = (id) => (dispatch, getState) => {
  dispatch({ type: "minus", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const userSignup =
  (username, email, password, mobile) => async (dispatch, getState) => {
    dispatch({ type: "requestSignup" });
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username,
          email,
          password,
          mobile,
        }
      );
      dispatch({ type: "successSignup", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: "failedSignup", payload: error.response.data });
    }
  };

export const userLogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: "requestLogin", loading: true });
    const { data } = await axios.post("http://kzico.runflare.run/user/login", {
      email,
      password,
    });
    dispatch({
      type: "successLogin",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "failedLogin",
      payload: error.response.data,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("order");
  dispatch({ type: "successLogout" });
};

export const orderAction =
  (orderItems, address, city, postalCode, phone, totalPrice) =>
  async (dispatch, getState) => {
    dispatch({ type: "requestOrder" });
    try {
      const {
        login: { userInfo },
      } = getState();
      const { data } = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems,
          shippingAddress: {
            address,
            city,
            postalCode,
            phone,
          },
          paymentMethod: "cash",
          shippingPrice: "5",
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.user.token}`,
          },
        }
      );
      dispatch({ type: "successOrder", payload: data });
      localStorage.setItem("order", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: "failedOrder", payload: error.response.data });
    }
  };

export const cartItemsReset = () => (dispatch) => {
  dispatch({ type: "cartReset" });
  localStorage.removeItem("cartItems");
};

export const orderReset = () => (dispatch, getState) => {
  dispatch({ type: "orderReset" });
  localStorage.removeItem("order");
};

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "getProfileRequest", loading: true });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get("http://kzico.runflare.run/user/profile", {
      headers: {
        authorization: `Bearer ${userInfo.user.token}`,
      },
    });
    dispatch({ type: "getProfileSuccess", payload: data, loading: false });
  } catch (error) {
    dispatch({
      type: "getProfileFailed",
      loading: false,
      payload: error.response.data,
    });
  }
};

export const changeProfile =
  (firstname, lastname, gender, age, city) => async (dispatch, getState) => {
    try {
      dispatch({ type: "changeProfileRequest" });
      const {
        login: { userInfo },
      } = getState();
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname,
          lastname,
          gender,
          age,
          city,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.user.token}`,
          },
        }
      );
      dispatch({ type: "changeProfileSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "changeProfileFailed",
        payload: error.response.data,
      });
    }
  };

export const changePassword =
  (old_password, new_password) => async (dispatch, getState) => {
    try {
      dispatch({ type: "changePasswordRequest" });
      const {
        login: { userInfo },
      } = getState();
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password,
          new_password,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.user.token}`,
          },
        }
      );
      dispatch({ type: "changePasswordSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "changePasswordFailed", payload: error.response.data });
    }
  };

export const uploadProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "uploadRequest" });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.post(
      "http://kzico.runflare.run/user/profile-image",
      formData,
      {
        headers: {
          authorization: `Bearer ${userInfo.user.token}`,
        },
      }
    );
    dispatch({ type: "uploadSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "uploadFailed", payload: error.response.data });
  }
};

export const allOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "allOrderRequest", loading: true });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get("http://kzico.runflare.run/order/", {
      headers: {
        authorization: `Bearer ${userInfo.user.token}`,
      },
    });
    dispatch({ type: "allOrderSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "allOrderSuccess", payload: error.response.data });
  }
};

export const orderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "orderDetailRequest" });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get(`http://kzico.runflare.run/order/${id}`, {
      headers: {
        authorization: `Bearer ${userInfo.user.token}`,
      },
    });
    dispatch({ type: "orderDetailSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "orderDetailFailed", payload: error.response.data });
  }
};
