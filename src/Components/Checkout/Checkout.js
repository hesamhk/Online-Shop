import React, { useEffect } from "react";
import "./checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartItemsReset, orderReset } from "../../Reudx/action";
import { toast, ToastContainer } from "react-toastify";
import { render } from "react-dom";
import Swal from "sweetalert2";

function Checkout() {
  const { order } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.login);

  const isLogin = userInfo?.user?.token;

  // const sweet = () =>
  //   Swal.fire("Good job!", "You clicked the button!", "success");

  // const notify = () =>
  //   toast.success("Success", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: false,
  //     draggable: false,
  //     progress: undefined,
  //     theme: "light",
  //   });

  // const doneHandler = () => {
  //   dispatch(cartItemsReset());
  // };

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    // dispatch(cartItemsReset());
  }, [navigate]);
  return (
    <div class="parent">
      <div class="div1">
        {!order?.orderItems ? (
          <div className="h-[80px] bg-slate-300 m-4 rounded-lg ">
            <div className="text-center pt-6 text-stone-50 text-2xl">
              Your Cart is Empty!
            </div>
          </div>
        ) : cartItems?.length === 0 ? (
          <div className="h-[80px] bg-slate-300 m-4 rounded-lg ">
            <div className="text-center pt-6 text-stone-50 text-2xl">
              Your Cart is Empty!
            </div>
          </div>
        ) : (
          <section>
            <div class="">
              <div class="pt-9 bg-gray-50">
                <div class="max-w-lg px-4 m-6 space-y-8">
                  <div>
                    <p class="text-2xl font-medium tracking-tight text-gray-900">
                      Total Price: ${order.totalPrice}
                    </p>

                    <p class="mt-1 text-sm text-gray-600">
                      For the purchase of
                    </p>
                  </div>
                  {order?.orderItems?.map((item) => {
                    return (
                      <div>
                        <div class="flow-root">
                          <ul class="-my-4 divide-y divide-gray-100">
                            <li class="flex items-center py-4">
                              <img
                                src={item.product.image}
                                alt=""
                                class="object-cover w-16 h-16 rounded"
                              />

                              <div class="ml-4">
                                <h3 class="text-sm text-gray-900">
                                  {item.product.name}
                                </h3>

                                <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                                  <div>
                                    <dt class="inline">Color:</dt>
                                    <dd class="inline">{item.product.color}</dd>
                                  </div>

                                  <div>
                                    <dt class="inline">Price:</dt>
                                    <dd class="inline">{item.product.price}</dd>
                                  </div>
                                  <div>
                                    <dt class="inline">Address : </dt>
                                    <dd class="inline">
                                      {order.shippingAddress.address}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <div class="div2">
        {!order?.orderItems ? null : (
          <button
            onClick={() => navigate("/cart")}
            className="w-[100px] h-[50px] bg-slate-500 rounded-md hover:bg-slate-400 text-white"
          >
            Edit
          </button>
        )}
      </div>
      <div class="div3">
        {!order?.orderItems ? null : (
          <button
            onClick={() => {
              dispatch(cartItemsReset());
              // sweet();
            }}
            className="w-[100px] h-[50px] bg-slate-500 rounded-md hover:bg-slate-400 text-white"
          >
            Done
          </button>
        )}
      </div>
      {console.log(order)}
    </div>
  );
}

export default Checkout;
