"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import { Loader2 } from "lucide-react";
import MailLockIcon from "@mui/icons-material/MailLock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTriangleExclamation);

export default function Component() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [invalidUser, setInvalidUser] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [reset, setReset] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!token || !id) {
      toast({
        variant: "destructive",
        title: "Invalid Request!",
      });
    }
    const checkToken = async () => {
      setBusy(true);
      try {
        const response = await axios.post("/api/verify-token", {
          id,
          token,
        });
        toast({
          title: "Token Verified",
          description: response.data.message,
        });
        setBusy(false);
      } catch (error) {
        setBusy(false);
        const axiosError = error as AxiosError<APIResponse>;
        let errorMessage = axiosError.response?.data.message as string;
        setInvalidUser(errorMessage);
        toast({
          variant: "destructive",
          title:
            "An error occurred during token verification. Please try again",
          description: errorMessage,
        });
      }
    };
    checkToken();
  }, []);

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    const { password, confirmPassword } = data;
    if (password.trim().length < 4) {
      return setError("Password must be atleast 4 characters long!");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match! Please check and try again.");
    }
    try {
      setReset(true);
      const response = await axios.post<APIResponse>(`/api/reset-password`, {
        id,
        password: data.password,
      });
      toast({
        variant: "success",
        title: "Password Changed Successfully!",
        description: response.data.message,
      });
      setReset(false);
      router.replace("/reset-password");
      setSuccess(true);
    } catch (error) {
      setReset(false);
      console.error("Error in changing password", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        variant: "destructive",
        title: "Failed to change password",
        description: errorMessage,
      });
    }
  };
  if (success) {
    return (
      <section className="">
        <div className="color"></div>
        <div className="color"></div>
        <div className="overflow-hidden top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] absolute shadow-md rounded-3xl max-w-screen-sm w-full m-auto mt-4 flex flex-col justify-center items-center">
          <div className="h-[50%] bg-[#0000001f] glass w-full py-12 flex flex-col gap-12 justify-center items-center">
            <h1 className="my-3 uppercase font-extrabold text-3xl w-52 text-center poppins-regular font-gradient">
              Password Updated
            </h1>
            <div className="text-center">
              <VerifiedIcon fontSize="large" style={{ scale: "2.6" }} />
            </div>
            <p>Your password has been updated!</p>
            <Link href="/sign-in">
              <button className="bg-[#00000097] hover:scale-105 transition-all duration-300 rounded-2xl font-semibold tracking-wide text-white h-12 w-44 uppercase">
                Login
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (invalidUser) {
    return (
      <section className="">
        <div className="color"></div>
        <div className="color"></div>
        <div className="overflow-hidden top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] absolute shadow-md rounded-3xl max-w-screen-sm w-full m-auto mt-4 flex flex-col justify-center items-center">
          <div className="h-[50%] bg-[#0000001f] glass w-full py-32 flex flex-col gap-6 justify-center items-center">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="2xl"
              className="scale-150 text-gray-400 "
            />
            <h1 className="text-center text-4xl text-gray-400 ">
              {invalidUser}
            </h1>
          </div>
        </div>
      </section>
    );
  }

  if (busy) {
    return (
      <section className="">
        <div className="color"></div>
        <div className="color"></div>
        <div className="overflow-hidden top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] absolute shadow-md rounded-3xl max-w-screen-sm w-full m-auto mt-4 flex flex-col justify-center items-center">
          <div className="h-[50%] bg-[#0000001f] glass w-full py-20 flex flex-col gap-3 justify-center items-center">
            <h1 className="text-center text-3xl text-gray-500 mb-3">
              Wait for a moment
            </h1>
            <h1 className="text-center text-3xl text-gray-500 mb-3">
              Verifying Reset Token...
            </h1>
            <Loader />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="">
      <div className="color"></div>
      <div className="color"></div>
      <div className="overflow-hidden top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] absolute shadow-md rounded-3xl max-w-screen-sm w-full m-auto mt-4 flex flex-col justify-center items-center">
        <div className="h-[50%] bg-[#0000001f] glass w-full py-10 flex flex-col gap-2 justify-center items-center">
          <div className="text-center">
            <MailLockIcon fontSize="large" style={{ scale: "1.6" }} />
          </div>
          <h1 className="my-3 uppercase font-extrabold text-3xl tracking-wider text-center poppins-regular">
            New Credentials
          </h1>
          <p>Your identity has been verified!</p>
          <p className="-translate-y-2">Set your new password!</p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full rounded-lg p-10 pt-4"
          >
            {error && (
              <p className="text-center p-2 mb-3 bg-red-500 text-white">
                {error}
              </p>
            )}
            <div className="white-container flex flex-col justify-center items-center gap-10">
              <div
                className="flex bg-slate-100 w-96 rounded-2xl text-slate-900 font-semibold justify-center items-center pl-3"
                style={{ boxShadow: "0px 3px 1px rgb(166 173 185)" }}
              >
                <LockOutlinedIcon />
                <input
                  type="password"
                  {...form.register("password")}
                  id=""
                  className="px-3 text-lg h-12 w-full border-none outline-none rounded-2xl bg-slate-100"
                  placeholder="New Password"
                />
              </div>
              <div
                className="flex bg-slate-100 w-96 rounded-2xl text-slate-900 font-semibold justify-center items-center pl-3"
                style={{ boxShadow: "0px 3px 1px rgb(166 173 185)" }}
              >
                <LockOutlinedIcon />
                <input
                  type="password"
                  {...form.register("confirmPassword")}
                  id=""
                  className="px-3 text-lg h-12 w-full border-none outline-none rounded-2xl bg-slate-100"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                className={`btn flex justify-center items-center gap-3 px-3 text-sm md:text-lg h-12 w-56 rounded-2xl border-none uppercase font-semibold  ${
                  reset ? "opacity-60 pointer-events-none" : ""
                } bg-[#000000] hover:scale-105 transition-all duration-300 `}
              >
                {reset ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6  animate-spin" />{" "}
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
