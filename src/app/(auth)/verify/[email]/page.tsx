"use client";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import Loader from "@/app/components/Loader";
import {Loader2} from "lucide-react";

const inputs = Array(4).fill(""); // create a blank array of 4 index
let newInputIndex = 0;

const VerifyAccount: React.FC = () => {
  const router = useRouter();
  const params = useParams<{ email: string }>();
  const decodedEmail = decodeURIComponent(params.email);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resendRef = useRef<HTMLParagraphElement | null>(null);
  const [sending, setSending] = useState(false);
  const [resending, setResending] = useState(false);
  const [OTP, setOTP] = useState<{ [key: number]: string }>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [nextInputIndex, setNextInputIndex] = useState(0);

  const BoxRefs = useRef<HTMLDivElement | null>(null);

  const CorrectOTP = () => {
    const boxRefsChildren = BoxRefs.current?.children;

    if (boxRefsChildren) {
      for (let i = 0; i < boxRefsChildren.length; i++) {
        const inputElement = boxRefsChildren[i] as HTMLInputElement;
        if (inputElement) {
          inputElement.classList.add("correct-otp");

          setTimeout(() => {
            inputElement.classList.remove("correct-otp");
          }, 2000);
        }
      }
    }
  };

  const WrongOTP = () => {
    const boxRefsChildren = BoxRefs.current?.children;

    if (boxRefsChildren) {
      for (let i = 0; i < boxRefsChildren.length; i++) {
        const inputElement = boxRefsChildren[i] as HTMLInputElement;
        if (inputElement) {
          inputElement.classList.add("wrong-otp");
          inputElement.classList.add("Shake");

          setTimeout(() => {
            inputElement.classList.remove("wrong-otp");
            inputElement.classList.remove("Shake");
          }, 1200);
        }
      }
    }
  };

  const isObjValid = (obj: { [key: number]: string }) => {
    let arr = Object.values(obj);
    return arr.every((val) => val.trim());
  };

  const handleOTPChange = (value: string, index: number) => {
    let newOTP = { ...OTP };
    newOTP[index] = value;
    setOTP(newOTP);

    let lastInputIndex = inputs.length - 1;
    if (!value) {
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    }

    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [nextInputIndex]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      handleOTPChange("", index);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setSending(true);
    if (isObjValid(OTP)) {
      var val = "";

      Object.values(OTP).forEach((v) => {
        val += v;
      });
      
    try {
      const response = await axios.post(`/api/verify-code`, {
        email: params.email,
        code: val
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      CorrectOTP();
      setSending(false);
      setTimeout(() => {
        router.replace("/sign-in");
      }, 2000);
    } catch (error) {
      setSending(false);
      console.error("Error in OTP checking", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
      WrongOTP();
    }
    }else {
      setSending(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter all 4 digits!",
      });
      WrongOTP();
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const response = await axios.post(`/api/resend-code`, {
        email: params.email
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      if (resendRef.current) {
        resendRef.current.textContent =
          "Please wait up to 30 sec after sending an OTP";
        resendRef.current.classList.add("text-gray-400");
        resendRef.current.classList.add("pointer-events-none");

        setTimeout(() => {
          if (resendRef.current) {
            resendRef.current.textContent = "Resend OTP";
            resendRef.current.classList.remove("text-gray-400");
            resendRef.current.classList.remove("pointer-events-none");
          }
        }, 30000);
      }
      setResending(false);
    } catch (error) {
      setResending(false);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  return (
    <section className="">
      <div className="color"></div>
      <div className="color"></div>
      <div className=" overflow-hidden absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] shadow-md rounded-3xl max-w-screen-sm w-80 md:w-96 m-auto mt-4 flex flex-col justify-center items-center">
        <div className="h-[50%] bg-[#0000002c] glass w-full p-10 flex flex-col gap-8 justify-center items-center">
          <p className="text-center text-gray-300">
            We have sent an OTP to{" "}
            {<span className="cool-text">{decodedEmail}.</span>} Please enter it
            below to continue.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div className="flex gap-4" ref={BoxRefs}>
              {inputs.map((digit, index) => (
                <input
                  className="rounded-lg h-10 w-10 text-black bg-slate-200 text-center font-semibold custom-input"
                  key={index}
                  type="text"
                  maxLength={1}
                  value={OTP[index]}
                  onChange={(e) => handleOTPChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={nextInputIndex === index ? inputRef : null}
                />
              ))}
            </div>
            <div className={`button2 translate-y-3 ${sending?"opacity-60 pointer-events-none":""}`}>
              <div className="button-layer2"></div>
            <button
              type="submit"
              className={` btn h-12 w-48  bg-[#000000] text-black  transition-all duration-200 flex justify-center items-center uppercase text-center font-bold  tracking-wide rounded-2xl`}
              >
              {sending ?( <><Loader2 className="mr-2 h-6 w-6  animate-spin"/> Please wait...</>) : ("Verify")}
            </button>
              </div>
          </form>
          {resending?( <Loader/>):""}
          <p
            className="text-gray-300 hover:text-white font-semibold text-center cursor-pointer transition-all delay-100 ease-in"
            onClick={handleResend}
            title=""
            ref={resendRef}
          >
            Resend OTP
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
