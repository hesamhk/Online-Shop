import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { getProfile, userLogin } from "../../Reudx/action";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.login);

  const isLogin = userInfo?.user;

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [dispatch, navigate, isLogin]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLogin(values.email, values.password));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email")
        .required("Requierd"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Invalid Password"
        ),
    }),
  });

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
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
              action=""
              class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl"
            >
              <p class="text-lg font-medium">Sign in to your account</p>

              <div>
                <label for="email" class="text-sm font-medium">
                  Email
                </label>

                <div class="relative mt-1">
                  <input
                    type="email"
                    id="email"
                    class={
                      formik.touched.email && formik.errors.email
                        ? "w-full rounded-lg border-2 border-red-600 p-4 pr-12 text-sm shadow-sm"
                        : "w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                    }
                    placeholder="Enter email"
                    {...formik.getFieldProps("email")}
                  />
                  <>
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
                  </>
                </div>
              </div>

              <div>
                <label for="password" class="text-sm font-medium">
                  Password
                </label>

                <div class="relative mt-1">
                  <input
                    type="password"
                    id="password"
                    class={
                      formik.touched.password && formik.errors.password
                        ? "w-full rounded-lg border-2 border-red-600 p-4 pr-12 text-sm shadow-sm"
                        : "w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                    }
                    placeholder="Enter password"
                    {...formik.getFieldProps("password")}
                  />
                  <>
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
                  </>
                </div>
              </div>

              <button
                type="submit"
                class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>

              <p class="text-center text-sm text-gray-500">
                No account ?
                <a
                  class="underline pl-1 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
