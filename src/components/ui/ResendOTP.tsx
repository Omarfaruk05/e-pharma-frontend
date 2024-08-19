"use client";

import {
  useGetSingleUserQuery,
  useResendOTPMutation,
} from "@/redux/api/userApi";
import {
  getOTPTime,
  getUserId,
  storeExpriedOTPTime,
  storeUserId,
} from "@/services/auth.service";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IData {
  userId: string;
  email: string;
}

const ResendOTP = () => {
  const [OTPTime, setOTPTime] = useState<number>(59);
  const [againCoutn, setAgainConun] = useState<boolean>(false);
  const userId = getUserId();

  const { data, isLoading } = useGetSingleUserQuery(userId);

  const email = data?.email;

  const [resendOTPVerification] = useResendOTPMutation();

  useEffect(() => {
    const expiresAt = getOTPTime();

    const currentDate = new Date();
    const expirationDate = new Date(expiresAt);
    const differenceInMilliseconds =
      Number(expirationDate) - Number(currentDate);
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    setOTPTime(differenceInSeconds);
  }, [againCoutn]);
  useEffect(() => {
    if (OTPTime <= 0) return;

    const availavleTime = setInterval(() => setOTPTime(OTPTime - 1), 1000);

    return () => clearInterval(availavleTime);
  }, [OTPTime]);

  const handleResendOTP = async () => {
    const data: IData = {
      userId,
      email,
    };

    try {
      const res = await resendOTPVerification(data).unwrap();

      if (res?.userId) {
        setAgainConun(!againCoutn);
        await storeUserId({ userId: res?.userId });
        await storeExpriedOTPTime({ expiresAt: res?.expiresAt });
        toast.success("OTP resended successfull.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-between  mt-5 items-center">
      <button
        disabled
        className="bg-white text-gray-800 font-semibold py-2 px-5 min-w-20 rounded-md"
      >
        {OTPTime}
      </button>
      <button
        disabled={OTPTime !== 0 && true}
        onClick={handleResendOTP}
        className="bg-white rounded-md text-sky-700 py-2 px-4 font-semibold"
      >
        Resend OTP
      </button>
    </div>
  );
};

export default ResendOTP;
