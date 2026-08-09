import axios from "axios";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { server } from "../main";
import AnimatedOTPInput from "@/components/smoothui/animated-o-t-p-input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../apiInterceptor.js";
import { AppData } from "../context/AppContext";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState("");
  const [verifyBtn, setverifyBtn] = useState(false);

  const storedEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  const { fetchUser } = AppData();

  const handleOtp = async (e) => {
    e.preventDefault();
    setverifyBtn(true);
    console.log(email, otp);

    try {
      const { data } = await api.post(
        `${server}/api/v1/verify`,
        {
          email: storedEmail,
          otp: Number(otp),
        },
        { withCredentials: true },
      );

      toast.success(data.message);
      setOtp(null);
      localStorage.clear("email");

      await fetchUser();

      navigate("/ ");
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

export default VerifyOtp;
