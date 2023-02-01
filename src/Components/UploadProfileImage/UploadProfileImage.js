import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { uploadProfile } from "../../Reudx/action";

function UploadProfileImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { upload, error, loading, success } = useSelector(
    (state) => state.uploadprofile
  );
  const { userInfo } = useSelector((state) => state.login);
  const isLogin = userInfo?.user?.token;
  const [pic, setPic] = useState(null);

  const formData = new FormData();
  formData.append("profile-image", pic);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadProfile(formData));
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
        <div>
          {
            (success &&
              toast.success(upload.message, {
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
          <form>
            <div className="w-[500px] h-[500px] bg-slate-300 grid grid-rows-2 mx-auto mt-8 rounded-lg">
              <div className="justify-self-center mt-[120px]">
                <p className="font-bold text-2xl font-sans pb-2">
                  Upload Your Image
                </p>
                <span className="text-slate-500 pl-3">
                  JPG,PNG files are allowed
                </span>
              </div>
              <label
                for="tag"
                className="w-[370px] h-[220px] cursor-pointer justify-self-center bg-slate-200 rounded-lg"
              >
                <input
                  id="tag"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setPic(e.target.files[0]);
                  }}
                ></input>
                <FontAwesomeIcon
                  className="pt-10 ml-36 text-[50px]"
                  icon={faCloudArrowUp}
                />
                <span className="ml-16 pt-10 block">
                  Please Click and Upload Your File.
                </span>
              </label>
              <button
                className="mb-3 mt-3 bg-slate-200 h-[40px] w-[95px] justify-self-center rounded-md"
                type="submit"
                onClick={submitHandler}
              >
                Done
              </button>
            </div>
          </form>
          {console.log(upload)}
          {console.log(error)}
        </div>
      )}
    </>
  );
}

export default UploadProfileImage;
