"use client";
import React, { useState } from "react";
import Input from "./Input";
import { useLoginMutation } from "@/redux/api/userApi";
import { storeUserInfo } from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slice/userSlice";

const LoginForm = ({ close }: { close: () => void }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { email, password } = formValues;
    const user = { email, password };

    try {
      const res = await login(user).unwrap();

      if (res?.accessToken) {
        await storeUserInfo({ accessToken: res?.accessToken });
        dispatch(loginSuccess());
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin} className="text-black space-y-4">
        <p className="text-sm  text-center my-1 text-white">Please Login</p>

        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />

        <input
          className=" bg-sky-800 text-white w-full p-2 rounded-md"
          type="submit"
          value={"Login"}
        />
      </form>
    </div>
  );
};

export default LoginForm;
