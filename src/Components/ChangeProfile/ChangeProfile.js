import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Reudx/action";
import * as Yup from "yup";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function ChangeProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector(
    (state) => state.changeprofile
  );

  const { userInfo } = useSelector((state) => state.login);

  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
      city: "",
    },
    onSubmit: (values) => {
      dispatch(
        changeProfile(
          values.firstname,
          values.lastname,
          values.gender,
          values.age,
          values.city
        )
      );
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required").min(3),
      lastname: Yup.string().required("Required").min(4),
      gender: Yup.string().required("Required").min(3),
      city: Yup.string().required("Required").min(3),
      age: Yup.string().required("Required"),
    }),
  });
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
        <div class="ml-[100px] mt-10">
          {
            (success &&
              toast.success(user.message, {
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
          }
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={formik.handleSubmit}>
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          {...formik.getFieldProps("firstname")}
                          id="first-name"
                          autocomplete="given-name"
                          class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {formik.touched.firstname && formik.errors.firstname ? (
                          <div
                            class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                            role="alert"
                          >
                            <FontAwesomeIcon
                              className="text-amber-300 pr-2"
                              icon={faTriangleExclamation}
                            />
                            {formik.errors.firstname}
                          </div>
                        ) : null}
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          {...formik.getFieldProps("lastname")}
                          type="text"
                          id="last-name"
                          autocomplete="family-name"
                          class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {formik.touched.lastname && formik.errors.lastname ? (
                          <div
                            class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                            role="alert"
                          >
                            <FontAwesomeIcon
                              className="text-amber-300 pr-2"
                              icon={faTriangleExclamation}
                            />
                            {formik.errors.lastname}
                          </div>
                        ) : null}
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          {...formik.getFieldProps("city")}
                          type="text"
                          id="city"
                          autocomplete="address-level2"
                          class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="gender"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <input
                          {...formik.getFieldProps("gender")}
                          type="text"
                          id="gender"
                          autocomplete="address-level1"
                          class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {formik.touched.gender && formik.errors.gender ? (
                          <div
                            class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                            role="alert"
                          >
                            <FontAwesomeIcon
                              className="text-amber-300 pr-2"
                              icon={faTriangleExclamation}
                            />
                            {formik.errors.gender}
                          </div>
                        ) : null}
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="age"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Age
                        </label>
                        <input
                          {...formik.getFieldProps("age")}
                          type="text"
                          id="age"
                          autocomplete="age"
                          class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {formik.touched.age && formik.errors.age ? (
                          <div
                            class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                            role="alert"
                          >
                            <FontAwesomeIcon
                              className="text-amber-300 pr-2"
                              icon={faTriangleExclamation}
                            />
                            {formik.errors.age}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {console.log(error)}
          {console.log(user)}
        </div>
      )}
    </>
  );
}

export default ChangeProfile;
