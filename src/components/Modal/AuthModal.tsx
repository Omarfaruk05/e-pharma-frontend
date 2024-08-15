"use client";
import Portal from "./Protal";
import { IoCloseCircleOutline } from "react-icons/io5";
import authImg from "../../assects/Medeasy-website.webp";
import Image from "next/image";
import { useState } from "react";
import SingupForm from "../form/SingupForm";
import LoginForm from "../form/LoginForm";
import OTPVerificationForm from "../form/OTPVerificationForm";

const AuthModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [login, setLogin] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);
  if (!isOpen) return null;

  const isSignup = () => setSignup(!signup);
  const isLogedIn = () => setLogin(!login);

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-xl relative">
          <IoCloseCircleOutline
            className="absolute right-2 top-2 text-white"
            onClick={close}
            size={32}
          />
          <div className="flex text-white rounded-xl">
            <div className="hidden lg:block">
              <Image
                className="rounded-md w-[700px]"
                src={authImg}
                alt="auth_image"
              />
            </div>
            <div className="flex flex-col justify-between bg-sky-400 p-4 rounded-xl w-96 text-center space-y-3 pt-10">
              <div>
                <h5 className="text-3xl font-semibold text-center">E Pharma</h5>
              </div>
              {signup ? (
                <OTPVerificationForm
                  isLogedIn={isLogedIn}
                  isSignup={isSignup}
                />
              ) : login ? (
                <LoginForm close={close} />
              ) : (
                <SingupForm isSignup={isSignup} />
              )}
              <div>
                {login ? (
                  <p className="text-center mt-3">
                    <span>Create a new Account?</span> {""}
                    <span
                      onClick={() => setLogin(!login)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Sing up
                    </span>
                  </p>
                ) : (
                  <p className="text-center mt-3">
                    <span>Already Have an Account?</span>{" "}
                    <span
                      onClick={() => setLogin(!login)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Log in
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AuthModal;
