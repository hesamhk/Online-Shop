export const productsReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case "productsRequest":
      return { loading: true, products: [] };
    case "productsSuccess":
      return { loading: false, products: payload };
    case "productsFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: [] },
  { type, payload }
) => {
  switch (type) {
    case "productDetailRequest":
      return { loading: true, error: "" };
    case "productDetailSuccess":
      return { loading: false, product: payload, error: "" };
    case "productDetailFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case "cartAddItem":
      const item = payload;

      const existItem = state.cartItems.find((x) => x.product === x.item);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
          success: true,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          success: true,
        };
      }
    case "removeItem":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };
    case "cartReset":
      return {};
    case "plus":
      const indexPlus = state.cartItems.findIndex((i) => i.product === payload);
      state.cartItems[indexPlus].qty++;
      return { ...state, ...state.cartItems };
    case "minus":
      const indexMinus = state.cartItems.findIndex(
        (i) => i.product === payload
      );
      state.cartItems[indexMinus].qty--;
      return { ...state, ...state.cartItems };
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "requestSignup":
      return { loading: true, success: false };
    case "successSignup":
      return { loading: false, userInfo: payload, success: true };
    case "failedSignup":
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};

export const loginReducer = (state = { userInfo: [] }, { type, payload }) => {
  switch (type) {
    case "requestLogin":
      return { loading: true };
    case "successLogin":
      return { loading: false, userInfo: payload };
    case "failedLogin":
      return { ...state, loading: false, error: payload };
    case "successLogout":
      return {};
    default:
      return state;
  }
};

export const orderReducer = (state = { order: [] }, { type, payload }) => {
  switch (type) {
    case "requestOrder":
      return { loading: true };
    case "successOrder":
      return { loading: false, order: payload, success: true };
    case "failedOrder":
      return { loading: false, error: payload };
    case "orderReset":
      return {};

    default:
      return state;
  }
};

export const getProfileReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case "getProfileRequest":
      return { ...state, loading: true };
    case "getProfileSuccess":
      return { ...state, loading: false, user: payload };
    case "getProfileFailed":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export const changeProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "changeProfileRequest":
      return { ...state, loading: true };
    case "changeProfileSuccess":
      return { ...state, loading: false, user: payload, success: true };
    case "changeProfileFailed":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "changePasswordRequest":
      return { loading: true };
    case "changePasswordSuccess":
      return { loading: false, pass: payload, success: true };
    case "changePasswordFailed":
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const uploadProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "uploadRequest":
      return { loading: true };
    case "uploadSuccess":
      return { loading: false, upload: payload, success: true };
    case "uploadFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const allOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "allOrderRequest":
      return { loading: true };
    case "allOrderSuccess":
      return { loading: false, order: payload };
    case "allOrderFailed":
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const oneOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "orderDetailRequest":
      return { loading: true };
    case "orderDetailSuccess":
      return { loading: false, order: payload };
    case "orderDetailFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};
