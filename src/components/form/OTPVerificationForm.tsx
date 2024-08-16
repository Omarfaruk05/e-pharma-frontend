import React, { useState } from "react";
import Input from "./Input";
import { useVerifyOTPMutation } from "@/redux/api/userApi";
import { getUserId, storeUserInfo } from "@/services/auth.service";
import { toast } from "react-toastify";

const OTPVerificationForm = ({
  isLogedIn,
  isSignup,
}: {
  isLogedIn: () => void;
  isSignup: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    otp: "",
  });

  const [verifyOTP] = useVerifyOTPMutation();

  const userId = getUserId();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleVerifyOTP = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const { otp } = formValues;
    otp.toString();
    const data = { userId, otp };
    try {
      const res = await verifyOTP(data).unwrap();

      if (res?._id) {
        setIsLoading(false);
        toast.success("OTP verificaton Successfull.");
        isLogedIn();
        isSignup();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleVerifyOTP} className="text-black space-y-4">
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
