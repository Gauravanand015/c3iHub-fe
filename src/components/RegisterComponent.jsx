import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
const RegisterComponent = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const register = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const res = await fetch("http://localhost:9090/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const result = await res.json();
    switch (result.message) {
      case "This email is already registered. Please try using a different email.":
        alert(
          "This email is already registered. Please try using a different email."
        );
        break;

      case "Successfully registered":
        alert("Successfully registered");
        clearForm();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        break;

      default:
        alert("An unexpected error occurred. Please try again later.");
        break;
    }
  };

  const clearForm = () => {
    nameRef.current.value = " ";
    emailRef.current.value = " ";
    passwordRef.current.value = "";
  };

  const formHandler = (event) => {
    event.preventDefault();
    register();
  };

  return (
    <div className="border-2 border-gray-300 rounded-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 text-center font-semibold ">Register</h2>
      <form className="space-y-4 text-gray-600" onSubmit={formHandler}>
        <div>
          <label htmlFor="name" className="block mb-1 text-center font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            ref={nameRef}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-center font-medium">
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
          <label
            htmlFor="password"
            className="block mb-1 text-center font-medium"
          >
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
          Register
        </button>
      </form>
      <p className="text-center py-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-400 font-semibold underline cursor-pointer"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};

export default RegisterComponent;
