import axios from "axios";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { server } from "../main";
import AnimatedOTPInput from "@/components/smoothui/animated-o-t-p-input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState("");
  const [verifyBtn, setverifyBtn] = useState(false);

  const storedEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleOtp = async (e) => {
    e.preventDefault();
    setverifyBtn(true);
    console.log(email, otp);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/verify`,
        {
          email: storedEmail,
          otp: Number(otp),
        },
        { withCredentials: true },
      );

      await toast.success(data.message);
      localStorage.clear("email");

      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setverifyBtn(false);
    }
  };
  return (
    <form
      onSubmit={handleOtp}
      className="min-h-screen flex flex-col items-center justify-center gap-8"
    >
      {/* <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div> */}
      <AnimatedOTPInput
        required
        value={otp}
        onChange={(value) => setOtp(value)}
      />

      <Button type="submit" disabled={verifyBtn}>
        {verifyBtn ? "verifying....." : "verify"}
      </Button>
    </form>
  );
};

export default Verify;
