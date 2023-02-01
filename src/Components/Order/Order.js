import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { allOrder } from "../../Reudx/action";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector((state) => state.allorder);
  const { userInfo } = useSelector((state) => state.login);
  const { id } = useParams;

  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    dispatch(allOrder());
  }, [dispatch]);

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
      ) : order ? (
        <>
          {order?.map((item) => {
            return (
              <>
                {item.orderItems?.map((item2) => {
                  return (
                    <div>
                      <div className="py-3 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                        <div className="flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                Customer’s Cart
                              </p>
                              <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                  <img
                                    onClick={() =>
                                      navigate(`/orderDetails/${item._id}`)
                                    }
                                    className="w-full hidden md:block"
                                    src={item2.product.image}
                                  />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                      {item2.product.name}
                                    </h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                      <p className="text-sm leading-none text-gray-800">
                                        <span className="text-gray-300">
                                          Brand:
                                        </span>
                                        {item2.product.brand}
                                      </p>
                                      <p className="text-sm leading-none text-gray-800">
                                        <span className="text-gray-300">
                                          Category:
                                        </span>
                                        {item2.product.category}
                                      </p>
                                      <p className="text-sm leading-none text-gray-800">
                                        <span className="text-gray-300">
                                          Color:
                                        </span>
                                        {item2.product.color}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base xl:text-lg leading-6">
                                      {item2.product.price}
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                                      {item2.qty}
                                    </p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                      ${item2.product.price * item2.qty}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {console.log(order)}
                      {console.log(id)}
                    </div>
                  );
                })}
              </>
            );
          })}
          {order?.orderItems?.map((item, index) => {
            return (
              <div>
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                      <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                          Customer’s Cart
                        </p>
                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full hidden md:block"
                              src={item[index].product.image}
                            />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                {item[index].product.name}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-300">Brand: </span>{" "}
                                  {item[index].product.brand}
                                </p>
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-300">
                                    Category:{" "}
                                  </span>{" "}
                                  {item[index].product.category}
                                </p>
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-300">Color: </span>{" "}
                                  {item[index].product.color}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base xl:text-lg leading-6">
                                {item[index].product.price}
                              </p>
                              <p className="text-base xl:text-lg leading-6 text-gray-800">
                                {item[index].qty}
                              </p>
                              <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                {item[index].product.price * item[index].qty}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="h-[80px] bg-slate-300 m-4 rounded-lg ">
          <div className="text-center pt-6 text-stone-50 text-2xl">
            No orders registered !
          </div>
          {console.log(order)}
        </div>
      )}
    </>
  );
}

export default Order;
