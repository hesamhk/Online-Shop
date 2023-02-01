import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getProfile } from "../../Reudx/action";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.login);

  const isLogin = userInfo?.user?.token;
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    dispatch(getProfile());
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
      ) : (
        <div>
          <div class="h-full">
            <div class="border-b-2 block md:flex">
              <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                <div class="flex justify-between">
                  <span class="text-xl font-semibold block">Profile</span>
                  <a
                    onClick={() => navigate("/setting")}
                    class="-mt-2 text-md font-bold text-white cursor-pointer bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                  >
                    Edit
                  </a>
                </div>

                <div class="w-full p-8 mx-2 flex justify-center">
                  <img
                    id="showImage"
                    class="max-w-xs w-32 items-center border"
                    src={user.user?.image}
                    alt=""
                  />
                </div>
              </div>

              <div class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                <div class="rounded  shadow p-6">
                  <div class="pb-4">
                    <label
                      for="about"
                      class="font-semibold text-gray-700 block pb-1"
                    >
                      Email
                    </label>
                    <input
                      disabled
                      id="email"
                      class="border-1  rounded-r px-4 py-2 w-full"
                      type="email"
                      value={user.user?.email}
                    />
                  </div>
                  <div class="pb-6">
                    <label
                      for="name"
                      class="font-semibold text-gray-700 block pb-1"
                    >
                      Username
                    </label>
                    <div class="flex">
                      <input
                        disabled
                        id="username"
                        class="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        value={user.user?.username}
                      />
                    </div>
                  </div>{" "}
                  <div class="pb-6">
                    <label
                      for="name"
                      class="font-semibold text-gray-700 block pb-1"
                    >
                      Mobile
                    </label>
                    <div class="flex">
                      <input
                        disabled
                        id="username"
                        class="border-1  rounded-r px-4 py-2 w-full"
                        type="text"
                        value={user.user?.mobile}
                      />
                    </div>
                    <div class="pb-6">
                      <label
                        for="name"
                        class="font-semibold text-gray-700 block pb-1"
                      >
                        First Name
                      </label>
                      <div class="flex">
                        <input
                          disabled
                          id="username"
                          class="border-1  rounded-r px-4 py-2 w-full"
                          type="text"
                          value={user.user?.firstname}
                        />
                      </div>
                    </div>
                    <div class="pb-6">
                      <label
                        for="name"
                        class="font-semibold text-gray-700 block pb-1"
                      >
                        Last Name
                      </label>
                      <div class="flex">
                        <input
                          disabled
                          id="username"
                          class="border-1  rounded-r px-4 py-2 w-full"
                          type="text"
                          value={user.user?.lastname}
                        />
                      </div>
                    </div>
                    <div class="pb-6">
                      <label
                        for="name"
                        class="font-semibold text-gray-700 block pb-1"
                      >
                        Age
                      </label>
                      <div class="flex">
                        <input
                          disabled
                          id="username"
                          class="border-1  rounded-r px-4 py-2 w-full"
                          type="text"
                          value={user.user?.age}
                        />
                      </div>
                    </div>
                    <div class="pb-6">
                      <label
                        for="name"
                        class="font-semibold text-gray-700 block pb-1"
                      >
                        City
                      </label>
                      <div class="flex">
                        <input
                          disabled
                          id="username"
                          class="border-1  rounded-r px-4 py-2 w-full"
                          type="text"
                          value={user.user?.city}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {console.log(user)}
        </div>
      )}
    </>
  );
}

export default Profile;
