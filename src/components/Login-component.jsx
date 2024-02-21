import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../store/authSlice";

const LoginComponent = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const res = await fetch("http://localhost:9090/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const result = await res.json();
    switch (res.status) {
      case 200:
        alert(result.message);
        dispatch(setLogin({ user: result.userData, token: result.token }));
        setTimeout(() => {
          navigate("/");
        }, 1000);
        break;

      case 400:
        alert(result.message);
        break;

      case 401:
        alert(result.message);
        break;

      case 404:
        alert(result.message);
        break;

      default:
        alert("An unexpected error occurred. Please try again later");
        break;
    }
  };

  const clearForm = () => {
    emailRef.current.value = " ";
    passwordRef.current.value = "";
  };

  const formHandler = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div className="border-2 border-gray-300 rounded-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
      <form className="space-y-4  text-gray-600" onSubmit={formHandler}>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            ref={emailRef}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            ref={passwordRef}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="text-center py-4">
        Don't have an account yet?{" "}
        <Link
          to="/register"
          className="text-blue-400 font-semibold underline cursor-pointer"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};

export default LoginComponent;
