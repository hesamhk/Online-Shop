import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { changePassword } from "../../Reudx/action";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pass, loading, error, success } = useSelector(
    (state) => state.changepassword
  );
  const { userInfo } = useSelector((state) => state.login);

  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
    },
    onSubmit: (values) => {
      dispatch(changePassword(values.oldpassword, values.newpassword));
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string().required("Required"),
      newpassword: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Invalid Password"
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
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {
            (success &&
              toast.success(pass.message, {
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
          <div class="w-full max-w-md space-y-8">
            <div>
              <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Change your password
              </h2>
            </div>
            <form class="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <label for="oldpassword" class="sr-only">
                    Old Password
                  </label>
                  <input
                    {...formik.getFieldProps("oldpassword")}
                    id="oldpassword"
                    type="password"
                    autocomplete="oldpassword"
                    required
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Old Password"
                  />
                  {formik.touched.oldpassword && formik.errors.oldpassword ? (
                    <div
                      class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <FontAwesomeIcon
                        className="text-amber-300 pr-2"
                        icon={faTriangleExclamation}
                      />
                      {formik.errors.oldpassword}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label for="newpassword" class="sr-only">
                    New Password
                  </label>
                  <input
                    {...formik.getFieldProps("newpassword")}
                    id="newpassword"
                    type="password"
                    autocomplete="newpassword"
                    required
                    class="relative block w-full mt-3 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="New Password"
                  />
                  {formik.touched.newpassword && formik.errors.newpassword ? (
                    <div
                      class="bg-yellow-100 rounded-lg pl-3 pt-2 pb-2 mb-3 mt-1 text-base text-yellow-700 inline-flex items-center w-full"
                      role="alert"
                    >
                      <FontAwesomeIcon
                        className="text-amber-300 pr-2"
                        icon={faTriangleExclamation}
                      />
                      {formik.errors.newpassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Change Password
                </button>
              </div>
            </form>
          </div>
          {console.log(pass)}
          {console.log(error)}
        </div>
      )}
    </>
  );
}

export default ChangePassword;
