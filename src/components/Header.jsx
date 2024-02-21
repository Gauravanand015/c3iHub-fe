import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/authSlice";
import { Outlet } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({ token: state.token }));
  const logoutHandler = () => {
    dispatch(setLogout({ user: null, password: null }));
  };
  return (
    <>
      <div className="h-16 w-full bg-slate-500 flex justify-around items-center">
        <h1 className="text-3xl text-white">Inventory Management</h1>

        {token && (
          <button
            className="px-4 py-2 bg-slate-50 text-black font-semibold rounded-lg hover:bg-slate-200 transition-duration-300"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Header;
