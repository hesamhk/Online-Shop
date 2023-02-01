import {
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart, getProductDetails } from "../../Reudx/action";

function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [qty, setQty] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productdetails
  );

  const { cartItems, success } = useSelector((state) => state.cart);
  const checkProductIncart = cartItems.find(
    (item) => item.product === product?._id
  );
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id]);

  const addToCartHandler = () => {
    console.log("first");
    if (checkProductIncart) {
      toast.warn("It is in the Cart.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(addToCart(id, qty));
      navigate("/cart");
    }
  };
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
        <section>
          <div class="relative max-w-screen-xl px-4 py-8 mx-auto">
            <div class="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
              <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                <img
                  src={product.image}
                  class=" w-full aspect-square rounded-xl"
                />
              </div>

              <div class="sticky top-0">
                <strong class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                  Pre Order
                </strong>

                <div class="flex justify-between mt-8">
                  <div class="max-w-[35ch]">
                    <h1 class="text-2xl font-bold">{product.name}</h1>
                    <p className="pt-3">Brand : {product.brand}</p>
                  </div>

                  <p class="text-lg font-bold">$ {product.price}</p>
                </div>

                <details class="group relative mt-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary class="block">
                    <div>
                      <div class="prose max-w-none group-open:hidden">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </summary>
                </details>

                <form class="mt-8">
                  <div class="mt-8">
                    <button
                      disabled={product.countInStock === 0}
                      type="submit"
                      class="block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500 disabled:bg-slate-400"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                    <ToastContainer />
                    {product.countInStock === 0 ? (
                      <span
                        class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-6 ml-3 text-base text-yellow-700 inline-flex items-center w-full"
                        role="alert"
                      >
                        <FontAwesomeIcon
                          className="text-amber-300 pr-2"
                          icon={faTriangleExclamation}
                        />
                        Not available.
                      </span>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDetails;

