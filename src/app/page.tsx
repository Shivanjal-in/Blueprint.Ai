"use client";
export const dynamic = "force-dynamic";
import { act, useEffect, useState } from "react";
import Hero from "./components/Hero";
import What from "./components/What";
import How from "./components/How";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Generate from "./components/Generate";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import lockImage from "./assets/locker.png";
import axios from "axios";

// const BaseURL = "http://localhost:5000";
const BaseURL = "https://blueprint-ai-backend.onrender.com";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    // console.log(session.user.username);
  }

  useEffect(() => {
    //! Blank Request to activate the server if inactive
    const activate = async () => {
      await axios(`${BaseURL}/`);
    };
    activate();
  }, []);

  return (
    <>
      <section className="">
        <div className="color"></div>
        <div className="color"></div>
        <Hero />
        <What />
        <How />
        {status == "authenticated" ? (
          <div className="my-40">
            <Generate />
          </div>
        ) : (
          <div className=" mx-auto my-40 h-[40rem] relative z-20 bg-[#0000006f] glass w-[90%] py-12 px-10  gap-6 overflow-hidden shadow-md rounded-3xl flex flex-col justify-center items-center">
            <Image
              src={lockImage}
              height={300}
              alt="Lock"
              className="absolute z-30 shadow"
            />
            <div className={`button2 absolute z-30 -bottom-40 shadow-2xl `}>
              <div className="button-layer2"></div>
              <Link href="sign-in">
                <button className="bg-black px-4 py-2  w-full text-xl  font-bold tracking-wide text-black uppercase poppins-regular">
                  Login
                </button>
              </Link>
            </div>
            <div className="absolute z-10 opacity-20 pointer-events-none">
              <Generate />
            </div>
          </div>
        )}
        <FAQ />
        <Contact />
        <Footer />
      </section>
    </>
  );
}
