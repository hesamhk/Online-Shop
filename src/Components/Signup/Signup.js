import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userSignup } from "../../Reudx/action";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function Signup() {
  const dispatch = useDispatch();
  const { userInfo, loading, error, success } = useSelector(
    (state) => state.signup
  );
  const navigate = useNavigate();

  const isSignup = localStorage.getItem("userInfo");

  useEffect(() => {
    if (isSignup) {
      navigate("/");
    }
  }, [dispatch, navigate, isSignup]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    },
    onSubmit: (values) => {
      dispatch(
        userSignup(
          values.username,
          values.email,
          values.password,
          values.mobile
        )
      );
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be 20 charecter")
        .min(7, "Bayd balatar az 7 klme bshe")
        .matches(/^[a-z0-9_\.]+$/, "Invalid Username")
        .required("Required"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email")
        .required("Requierd"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Invalid Password"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      mobile: Yup.string()
        .required("Required")
        .matches(
          /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
          "Invalid Mobile Number"
        ),
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
        <div>
          {
            (success &&
              toast.success("Registration was successful.", {
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
          <section class="bg-white">
            <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
              <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                <img
                  alt="Pattern"
                  src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  class="absolute inset-0 h-full w-full object-cover mt-1"
                />
              </aside>

              <main
                aria-label="Main"
                class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
              >
                <div class="max-w-xl lg:max-w-3xl">
                  <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Welcome to Hesam Shopping.
                  </h1>

                  <form
                    class="mt-8 grid grid-cols-6 gap-6"
                    onSubmit={formik.handleSubmit}
                  >
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="UserName"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>

                      <input
                        type="text"
                        id="UserName"
                        name="username"
                        class={
                          formik.touched.username && formik.errors.username
                            ? "mt-1 w-full h-7 p-2 rounded-md border-2 border-red-600 bg-white text-sm text-gray-700 shadow-sm"
                            : "mt-1 w-full h-7 p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div
                          class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                          role="alert"
                        >
                          <FontAwesomeIcon
                            className="text-amber-300 pr-2"
                            icon={faTriangleExclamation}
                          />
                          {formik.errors.username}
                        </div>
                      ) : null}
                    </div>

                    <div class="col-span-6">
                      <label
                        for="Email"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>

                      <input
                        type="email"
                        id="Email"
                        name="email"
                        class={
                          formik.touched.email && formik.errors.email
                            ? "mt-1 w-full h-7 rounded-md border-2 border-red-600 bg-white text-sm text-gray-700 shadow-sm"
                            : "mt-1 w-full h-7 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div
                          class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                          role="alert"
                        >
                          <FontAwesomeIcon
                            className="text-amber-300 pr-2"
                            icon={faTriangleExclamation}
                          />
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="Password"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>

                      <input
                        type="password"
                        id="Password"
                        name="password"
                        class={
                          formik.touched.password && formik.errors.password
                            ? "mt-1 w-full h-7 rounded-md border-2 border-red-600 bg-white text-sm text-gray-700 shadow-sm"
                            : "mt-1 w-full h-7 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div
                          class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                          role="alert"
                        >
                          <FontAwesomeIcon
                            className="text-amber-300 pr-2"
                            icon={faTriangleExclamation}
                          />
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="PasswordConfirmation"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Password Confirmation
                      </label>

                      <input
                        type="password"
                        id="PasswordConfirmation"
                        name="confirmPassword"
                        class={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "mt-1 w-full h-7 rounded-md border-2 border-red-600 bg-white text-sm text-gray-700 shadow-sm"
                            : "mt-1 w-full h-7 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                      />
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div
                          class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                          role="alert"
                        >
                          <FontAwesomeIcon
                            className="text-amber-300 pr-2"
                            icon={faTriangleExclamation}
                          />
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="mobile"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Mobile
                      </label>

                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        class={
                          formik.touched.mobile && formik.errors.mobile
                            ? "mt-1 w-full h-7 rounded-md border-2 border-red-600 bg-white text-sm text-gray-700 shadow-sm"
                            : "mt-1 w-full h-7 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile}
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
                    </div>

                    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      >
                        Create an account
                      </button>

                      <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account ?
                        <a
                          onClick={() => navigate("/login")}
                          class="text-gray-700 underline pl-1 cursor-pointer"
                        >
                          Log in
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </section>
          {console.log(userInfo)}
          {console.log(error)}
        </div>
      )}
    </>
  );
}

export default Signup;
