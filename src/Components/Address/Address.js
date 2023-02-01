import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../../Reudx/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Address() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error, success } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.login);

  const isLogin = userInfo?.user?.token;

  const { cartItems } = useSelector((state) => state.cart);
  const [orderItems, setOrderItems] = useState([]);

  const totalP = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    if (success) {
      navigate("/checkout");
    }
  }, [navigate, success, isLogin]);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      postalcode: "",
      mobile: "",
    },
    onSubmit: (values) => {
      dispatch(
        orderAction(
          orderItems,
          values.address,
          values.city,
          values.postalcode,
          values.mobile,
          totalP
        )
      );
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      postalcode: Yup.string().required("Required"),
      mobile: Yup.string()
        .required("Required")
        .matches(
          /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
          "Invalid Mobile Number"
        ),
    }),
  });
  // const checkOrder = order.orderItems?.find(
  //   (item) => item.name === cartItems.name
  // );

  return (
    <>
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
        (toast.error(error?.message, {
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
        <div className="mt-[70px]">
          <div class="w-full md:w-96 md:max-w-full mx-auto">
            <span className="text-3xl mb-[10px]">Form Address</span>
            <div class="p-6 mt-5 border border-gray-300 sm:rounded-md">
              <form
                enctype="multipart/form-data"
                onSubmit={formik.handleSubmit}
              >
                <label class="block mb-6">
                  <span class="text-gray-700">Address</span>
                  <input
                    {...formik.getFieldProps("address")}
                    type="text"
                    class="
              bg-slate-50
              p-2
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        "
                    placeholder=""
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div
                      class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <FontAwesomeIcon
                        className="text-amber-300 pr-2"
                        icon={faTriangleExclamation}
                      />
                      {formik.errors.address}
                    </div>
                  ) : null}
                </label>

                <label class="block mb-6">
                  <span class="text-gray-700">City</span>
                  <input
                    {...formik.getFieldProps("city")}
                    type="text"
                    class="
              bg-slate-50

              p-2
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        "
                    placeholder=""
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div
                      class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <FontAwesomeIcon
                        className="text-amber-300 pr-2"
                        icon={faTriangleExclamation}
                      />
                      {formik.errors.city}
                    </div>
                  ) : null}
                </label>

                <label class="block mb-6">
                  <span class="text-gray-700">Postal code</span>
                  <input
                    {...formik.getFieldProps("postalcode")}
                    type="text"
                    class="
              bg-slate-50

              p-2
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        "
                    placeholder=""
                  />
                  {formik.touched.postalcode && formik.errors.postalcode ? (
                    <div
                      class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <FontAwesomeIcon
                        className="text-amber-300 pr-2"
                        icon={faTriangleExclamation}
                      />
                      {formik.errors.postalcode}
                    </div>
                  ) : null}
                </label>

                <label class="block mb-6">
                  <span class="text-gray-700">Mobile</span>
                  <input
                    {...formik.getFieldProps("mobile")}
                    type="text"
                    class="
              bg-slate-50

              p-2
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        "
                    placeholder=""
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div
                      class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <FontAwesomeIcon
                        className="text-amber-300 pr-2"
                        icon={faTriangleExclamation}
                      />
                      {formik.errors.mobile}
                    </div>
                  ) : null}
                </label>

                <div class="mb-6">
                  <button
                    // disabled={checkOrder}
                    onClick={() => {
                      cartItems.map((item) => {
                        orderItems.push({
                          product: item.product,
                          qty: item.qty,
                        });
                      });
                    }}
                    type="submit"
                    class="
          h-10
          px-5
          text-indigo-100
          bg-slate-500
          rounded-lg
          transition-colors
          duration-150
          focus:shadow-outline
          hover:bg-indigo-800
        "
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          {console.log(order)}
          {console.log(error)}
          {console.log(cartItems)}
          {console.log(success)}
        </div>
      )}
    </>
  );
}

export default Address;
