"use client";

import React, { useState } from "react";
import Input from "./Input";
import { useRouter } from "next/router";
import { useAddUserMutation } from "@/redux/api/userApi";
import { storeUserId } from "@/services/auth.service";
import { toast } from "react-toastify";

const SingupForm = ({ isSignup }: { isSignup: () => void }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addUser] = useAddUserMutation();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const isPasswordMatched =
    (formValues.password || formValues.confirmPassword) &&
    formValues.password !== formValues.confirmPassword;
  console.log(isPasswordMatched);
  const disabled = isPasswordMatched;

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const { name, email, password } = formValues;
    console.log(name, email, password);
    const user = { name, email, password };

    try {
      const res = await addUser(user).unwrap();

      if (res?.userId) {
        await storeUserId({ userId: res?.userId });
        toast.success("Signup successfull.");
        isSignup();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSignup} className="text-black space-y-4">
        <p className="text-sm  text-center my-1 text-white">Please Singup</p>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
        />
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
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        {isPasswordMatched && (
          <small className="text-red-500 mx-2">
            Password and confirm password is not matched.
          </small>
        )}
        <input
          {...({ disabled } as any)}
          className=" bg-sky-800 text-white w-full p-2 rounded-md"
          type="submit"
          value={"Signup"}
        />
      </form>
    </div>
  );
};

export default SingupForm;
