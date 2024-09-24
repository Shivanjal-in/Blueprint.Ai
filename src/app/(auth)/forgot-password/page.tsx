"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { forgetPasswordSchema } from "@/schemas/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import { Loader2 } from "lucide-react";
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';



export default function Component() {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
    try {
      setBusy(true);
      const response = await axios.post<APIResponse>(`/api/forgot-password`, data);
      toast({
        variant: "success",
        title: "E-mail Sent Successfully!",
        description: response.data.message,
      });
      setBusy(false);
    } catch (error) {
      setBusy(false);
      console.error("Error in forget password email sending", error);
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
      <div className="overflow-hidden top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] absolute shadow-md rounded-3xl max-w-screen-sm w-full m-auto mt-4 flex flex-col justify-center items-center">
        <div className="h-[50%] bg-[#0000001f] glass w-full py-10 flex flex-col gap-6 justify-center items-center">
          <div className="text-center font-gradient">
            <LockPersonRoundedIcon fontSize="large" style={{ scale: "1.6" }} />
          </div>
          <h1
            className="my-3 uppercase font-gradient font-extrabold text-3xl w-52 text-center poppins-regular"
          >
            Forgot password
          </h1>
          <p className="md:text-base text-sm text-center px-3">
            Provide your account's email for which you want to reset your
            password!
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full rounded-lg p-10 pt-4">
            <div className="white-container flex flex-col justify-center items-center gap-10">
              <div
                className="flex bg-slate-100  rounded-2xl text-slate-900 font-semibold justify-center items-center pl-3"
                style={{ boxShadow: "0px 3px 1px rgb(166 173 185)" }}
              >
                <EmailOutlinedIcon />
                <input
                  type="email"
                  {...form.register("email")}
                  className="px-3 text-lg h-12 w-full border-none outline-none rounded-2xl bg-slate-100"
                  placeholder="example@email.com"
                />
              </div>
              <button
                type="submit"
                className={`btn flex justify-center  items-center gap-3 px-3 text-sm md:text-lg h-12 w-80 md:w-96 rounded-2xl border-none uppercase font-semibold  ${busy?"opacity-60 pointer-events-none":""} bg-black hover:scale-105 transition-all duration-300 `}
              >{busy ?( <><Loader2 className="mr-2 h-6 w-6  animate-spin"/> Please wait...</>) : ("Request Password Reset Email")}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

