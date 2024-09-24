"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { signInSchema } from "@/schemas/signInSchema";
import Google from "@/assets/google.png"
import Github from "@/assets/github.png"
import Facebook from "@/assets/facebook.png"
import Image from "next/image";
import { faTwitter, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  library.add(
    faXTwitter,
    faGithub,
    faTwitter
  );

export default function Component() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    setIsSubmitting(false);

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
    } else if (result?.url) {
      router.replace("/");
    }
  };

  return (
    <>
      {session ? (
        <>
        <section className="flex justify-center items-center min-h-[90vh] overflow-hidden">
          <div className="login-container relative w-[22.2rem] ">
            <div
              className="absolute w-32 h-32 bg-[#0F3460] rounded-full top-0 left-0  animate-animate-1"
              style={{ "--i": 0 } as React.CSSProperties}
            ></div>
            <div className=" overflow-hidden absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] shadow-md rounded-3xl max-w-screen-sm w-80 md:w-96 m-auto mt-4 flex flex-col justify-center items-center">
              <div className="h-[50%] bg-[#0000001f] glass w-full p-10 flex flex-col gap-8 justify-center items-center">
                <p className="text-center text-gray-300">
                  Signed in as <span className="cool-text">{session?.user.email}</span>
                </p>
                <button
                  onClick={() => signOut()}
                  className={` btn h-12 w-48 bg-gray-400 text-black hover:scale-105 transition-all duration-200 flex justify-center items-center translate-y-3  uppercase text-center font-bold rounded-2xl`}
                >
                  Sign Out
                </button>
              </div>
            </div>
                        <div
              className="absolute w-32 h-32 bg-[#0f3460] rounded-full bottom-0 right-0 z-[-1] animate-animate-2"
              style={{ "--i": 1 } as React.CSSProperties}
            ></div>
            </div>
          </section>
        </>
      ) : (
        <section className="flex justify-center items-center min-h-[90vh] overflow-hidden">
          <div className="login-container relative w-[22.2rem] ">
            <div
              className="absolute w-32 h-32 bg-[#0F3460] rounded-full top-0 left-0  animate-animate-1"
              style={{ "--i": 0 } as React.CSSProperties}
            ></div>
            <div className="form-container">
              <h1 className="text-4xl opacity-60 text-slate-200 uppercase text-center">
                Login
              </h1>
              <div className="flex gap-5 justify-center items-center w-full mt-5 ">
              <button title="Github" onClick={()=>signIn("github")} className="bg-gray-600 hover:scale-110 transition-all duration-300 bg-opacity-20 p-[10px] text-white text-sm rounded-md font-semibold uppercase">
              <FontAwesomeIcon icon={faGithub} size="xl" />
              </button>
              <button title="Google" onClick={()=>signIn("google")} className="bg-gray-600 hover:scale-110 transition-all duration-300 text-gray-300  text-sm rounded-sm bg-opacity-20 font-semibold uppercase">
                <Image src={Google} alt="google" height={40} width={40} />
              </button>
              <button title="Facebook" onClick={()=>signIn("facebook")} className="bg-gray-600 hover:scale-110 transition-all duration-300 text-gray-300  text-sm rounded-md p-2 bg-opacity-20  font-semibold uppercase">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="facebook" height={25} width={25} />
              </button>
              <button title="Twitter" onClick={()=>signIn("twitter")} className="bg-gray-600 hover:scale-110 transition-all duration-300 text-gray-300  text-sm rounded-md p-2 bg-opacity-20  font-semibold uppercase">
              <FontAwesomeIcon icon={faXTwitter} size="xl" />
              </button>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                <input
                  type="text"
                  placeholder="EMAIL/USERNAME"
                  {...form.register("identifier")}
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
                  className={`w-full flex justify-center items-center gap-2 mt-8 p-4 ${
                    isSubmitting ? "opacity-60 pointer-events-none" : ""
                  } bg-[#0f3460] text-[#ffffff] rounded-md uppercase text-lg font-bold tracking-wide hover:shadow-md hover:scale-105 duration-300 transition-all`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6  animate-spin" /> Please
                      wait...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              <div className="flex justify-between mt-8 opacity-60 text-slate-200">
                <Link
                  href="/sign-up"
                  className="hover:text-white hover:scale-105 uppercase"
                >
                  Register
                </Link>
                <Link
                  href="/forgot-password"
                  className="hover:text-white hover:scale-105 uppercase"
                >
                  FORGOT PASSWORD
                </Link>
              </div>
            </div>
            <div
              className="absolute w-32 h-32 bg-[#0f3460] rounded-full bottom-0 right-0 z-[-1] animate-animate-2"
              style={{ "--i": 1 } as React.CSSProperties}
            ></div>
          </div>
        </section>
      )}
    </>
  );
}
