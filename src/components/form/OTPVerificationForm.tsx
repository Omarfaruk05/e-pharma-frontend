import React, { useState } from "react";
import Input from "./Input";

const OTPVerificationForm = () => {
  const [formValues, setFormValues] = useState({
    otp: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { otp } = formValues;
    console.log(otp);

    // const data = await FirebaseAuthEmailPasswordCreateUser(
    //   name,
    //   email,
    //   password,
    //   acceptTerms
    // );

    // if (data?.user?.email) {
    //   handleDrawer;
    //   navigate("/");
    //   window.location.reload();
    // }
  };
  return (
    <div>
      <form onSubmit={handleLogin} className="text-black space-y-4">
        <p className="text-sm  text-center my-1 text-white">
          Please check mail inbox for otp.
        </p>
        <Input
          type="text"
          name="otp"
          id="otp"
          placeholder="OTP"
          value={formValues.otp}
          onChange={handleChange}
        />

        <input
          className=" bg-sky-800 text-white w-full p-2 rounded-md"
          type="submit"
          value={"Verify OTP"}
        />
      </form>
    </div>
  );
};

export default OTPVerificationForm;
