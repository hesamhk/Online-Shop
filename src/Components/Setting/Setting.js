import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const [selected1, setSelected1] = useState();
  const [selected2, setSelected2] = useState();
  const [selected3, setSelected3] = useState();

  const { userInfo } = useSelector((state) => state.login);

  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <ul class="flex border-b border-gray-100">
        <li class="flex-1" onClick={() => navigate("/setting/changeprofile")}>
          <a class="relative block p-4" href="">
            {selected1 ? (
              <span class="absolute inset-x-0 -bottom-px h-px w-full bg-pink-600"></span>
            ) : null}

            <div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 flex-shrink-0 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>

              <span
                onClick={() => {
                  setSelected1(true);
                  setSelected2(false);
                  setSelected3(false);
                  navigate("/setting/changeprofile");
                }}
                class="ml-3 text-sm font-medium text-gray-900"
              >
                Change Profile
              </span>
            </div>
          </a>
        </li>

        <li
          class="flex-1"
          onClick={() => {
            setSelected1(false);
            setSelected2(true);
            setSelected3(false);
            navigate("/setting/changepassword");
          }}
        >
          <a class="relative block p-4" href="">
            {selected2 ? (
              <span class="absolute inset-x-0 -bottom-px h-px w-full bg-pink-600"></span>
            ) : null}
            <div class="flex items-center justify-center">
              <FontAwesomeIcon icon={faKey} className="text-gray-500" />
              <span class="ml-3 text-sm font-medium text-gray-900">
                Change Password
              </span>
            </div>
          </a>
        </li>

        <li
          class="flex-1"
          onClick={() => {
            setSelected1(false);
            setSelected2(false);
            setSelected3(true);
            navigate("/setting/uploadprofileimage");
          }}
        >
          <a class="relative block p-4" href="">
            {selected3 ? (
              <span class="absolute inset-x-0 -bottom-px h-px w-full bg-pink-600"></span>
            ) : null}
            <div class="flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} />

              <span
                onClick={() => navigate("/setting/uploadprofileimage")}
                class="ml-3 text-sm font-medium text-gray-900"
              >
                Upload Profile Image
              </span>
            </div>
          </a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Setting;
