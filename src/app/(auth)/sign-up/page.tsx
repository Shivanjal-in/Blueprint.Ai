"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { APIResponse } from "@/types/APIResponse";
import Loader from "@/app/components/Loader";
import { BadgeCheck, BadgeAlert, LoaderCircle, Loader2 } from 'lucide-react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCircleExclamation,
  } from "@fortawesome/free-solid-svg-icons";
  import { faSquareFull, faCircle } from "@fortawesome/free-regular-svg-icons";

  library.add(
    faCircleExclamation,
  );

  export default function Component() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const [debouncedUsername, setValue] = useDebounceValue(username, 500);
  const debounced = useDebounceCallback(setUsername, 400)
  const router = useRouter();
  //! zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const checkUsername = useCallback(async () => {
    if (username) {
      setIsCheckingUsername(true);
      setUsernameMessage("");
      try {
        const response = await axios.get(
          `/api/check-username?username=${username}`
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<APIResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    }
  }, [username]);

  useEffect(() => {
    checkUsername();
  }, [checkUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post<APIResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${email}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in registering the user", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };




return (
    <section className="flex justify-center items-center min-h-[90vh]">
      <div className="login-container relative w-[22.2rem]">
        <div
          className="absolute w-32 h-32 bg-[#0F3460] rounded-full top-0 left-0  animate-animate-1"
          style={{ '--i': 0 } as React.CSSProperties}
        ></div>
        <div className="form-container">
          <h1 className="text-4xl opacity-60 text-slate-200 uppercase text-center">register</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            <input 
              type="text"
              placeholder="USERNAME"
              defaultValue={username}
              onChange={event => {
                debounced(event.target.value);
                form.setValue("username", event.target.value);
            }}
              className="block w-full p-4 mt-8 bg-opacity-10 bg-gray-500 text-[#ffffff] rounded-md outline-none focus:ring-2 focus:ring-gray-500"
            //   {...form.register("username")}
            />
            {isCheckingUsername && <Loader/>}
            {usernameMessage && (
            usernameMessage === "Username Available" ? (
                <p className="text-xs font-semibold translate-y-4 px-1 text-green-500 flex gap-1 items-center">
                <BadgeCheck size={20}/>
                {usernameMessage}
                </p>
            ) : (
                <p className="text-xs font-semibold translate-y-4 px-1 text-red-500 flex gap-1 items-center">
                <BadgeAlert size={20}/>
                {usernameMessage}
                </p>
            )
            )}

            <input
              type="email"
              placeholder="EMAIL"
              defaultValue={email}
              onChange={event => {
                setEmail(event.target.value);
                form.setValue("email", event.target.value);
            }}
              className="block w-full p-4 mt-8 bg-opacity-10 bg-gray-500 text-[#ffffff] rounded-md outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="password"
              placeholder="PASSWORD"
              {...form.register("password")}
              className="block w-full p-4 mt-8 bg-opacity-10 bg-gray-500 text-[#ffffff] rounded-md outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 mt-8 p-4 ${isSubmitting?"opacity-60 pointer-events-none":""} bg-[#0f3460] text-[#ffffff] rounded-md uppercase text-lg font-bold tracking-wide hover:shadow-md hover:scale-105 duration-300 transition-all`}
            >
             {isSubmitting ?( <><Loader2 className="mr-2 h-6 w-6  animate-spin"/> Please wait...</>) : ("Signup")}
            </button>
          </form>
          <div className="flex justify-between mt-8 opacity-60 text-slate-200">
            <Link href="/sign-in" className="hover:text-white hover:scale-105">LOGIN</Link>
            <Link href="/forgot-password" className="hover:text-white hover:scale-105">FORGOT PASSWORD</Link>
          </div>
        </div>
        <div
          className="absolute w-32 h-32 bg-[#0f3460] rounded-full bottom-0 right-0 z-[-1] animate-animate-2"
          style={{ '--i': 1 } as React.CSSProperties}
        ></div>
      </div>
    </section>
  );
} 
