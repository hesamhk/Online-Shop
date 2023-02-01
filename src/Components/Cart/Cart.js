import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  addToCart,
  removeProduct,
  getProductDetails,
  plus,
  minus,
  getProfile,
} from "../../Reudx/action";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.productdetails);
  const { userInfo, loading, error } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = userInfo?.user?.token;

  const [qty, setQty] = useState(1);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const removeProductHandler = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      {loading ? (
        <div role="status" className="w-[100%] m-auto block">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mt-[200px] mx-[700px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : error ? (
        (toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        }),
        (<ToastContainer />))
      ) : (
        <>
          {cartItems?.length === 0 ? (
            <div className="h-[80px] bg-slate-300 m-4 rounded-lg ">
              <div className="text-center pt-6 text-stone-50 text-2xl">
                Your Cart is Empty!
              </div>
            </div>
          ) : (
            <div>
              <header class="text-center mt-3">
                <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>
              {cartItems.map((item, index) => {
                return (
                  <section key={item.product}>
                    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                      <div class="max-w-3xl mx-auto">
                        <div class="mt-1">
                          <ul class="space-y-4">
                            <li class="flex items-center">
                              <img
                                src={item.image}
                                alt=""
                                class="object-cover w-16 h-16 rounded"
                              />

                              <div class="ml-4">
                                <h3 class="text-sm text-gray-900">
                                  {item.name}
                                </h3>

                                <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                                  <div>
                                    <dt class="inline">Price :</dt>
                                    <dd class="inline">${item.price}</dd>
                                  </div>
                                </dl>
                              </div>

                              <div class="flex items-center justify-end flex-1 gap-2">
                                <butoton
                                  onClick={() => {
                                    setEdit(true);
                                    setSelected(index);
                                  }}
                                >
                                  {edit && index === selected ? (
                                    <div class="flex items-center gap-1">
                                      {item.qty === 1 ? (
                                        <i
                                          class="fa-solid fa-trash hover:text-red-500 cursor-pointer"
                                          onClick={() =>
                                            removeProductHandler(item.product)
                                          }
                                        ></i>
                                      ) : (
                                        <button
                                          type="button"
                                          class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                          onClick={() => {
                                            setQty((last) => last - 1);
                                            dispatch(minus(item.product));
                                          }}
                                        >
                                          -
                                        </button>
                                      )}

                                      <input
                                        type="number"
                                        id="Quantity"
                                        value={item.qty}
                                        class="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                      />

                                      <button
                                        disabled={item.countInStock <= item.qty}
                                        type="button"
                                        class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                                        onClick={() => {
                                          setQty((last) => last + 1);
                                          dispatch(plus(item.product));
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  ) : (
                                    "Edit"
                                  )}
                                </butoton>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}

              <div className="grid grid-cols-2 grid-rows-1 w-[100%] align-bottom">
                <div>
                  <span className="p-8 m-3">
                    Total Price: $
                    {cartItems.reduce(
                      (acc, curr) => acc + curr.price * curr.qty,
                      0
                    )}
                  </span>
                </div>
                <div className="justify-self-end">
                  <button
                    onClick={() => {
                      if (!isLogin) {
                        navigate("/login");
                      } else {
                        navigate("/address");
                      }
                    }}
                    class="block px-5 py-3 mr-12 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
