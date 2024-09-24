"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faXmark,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faXTwitter,
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { faSquareFull, faCircle } from "@fortawesome/free-regular-svg-icons";
import { useMenu } from "@/context/MenuContext";
import Link from "next/link";

library.add(
  faTwitter,
  faGithub,
  faXTwitter,
  faLinkedin,
  faInstagram,
  faFacebook,
  faXmark,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faBriefcase
);

const MobileBurgerView: React.FC = () => {
  const { data: session, status } = useSession();
  const { showMobileMenu, setShowMobileMenu, currentPage, setCurrentPage } =
    useMenu();
  const user: User = session?.user as User;
  return (
    <div
      className={`${
        showMobileMenu ? "openMobilePage" : "closeMobilePage"
      } w-[100vw] min-h-[100vh] max-h-[100vh]  fixed left-[-2000px] -z-20  items-center justify-start overflow-hidden  `}
    >
      {/* MENU CONTAINER*/}
      <div
        className={` ${
          showMobileMenu ? "openMobileContainer" : "closeMobileContainer"
        } bg-[#00000077] w-[70vw] min-h-[100vh] z-20 max-h-[100vh] fixed left-[-2000px] flex justify-center items-center overflow-hidden  transition-all ease-in duration-500`}
      >
        <div className="mm-Wrapper flex flex-col justify-center items-center gap-24 overflow-hidden py-16 px-5 w-full z-30">
          <Link href="/">
            <h2
              style={{ fontFamily: "Robot" }}
              className="text-xl tracking-widest font-semibold cursor-pointer font-gradient md:ml-28"
            >
              Blueprint.AI
            </h2>
          </Link>
          <div>
            <Link href={`/u/${user?.username}`}>
              <button
                className="block text-center my-2 px-4 py-2 text-md rounded-xl w-72 text-gray-300  hover:text-white"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
              </button>
            </Link>
            <Link href={`/workspace/${user?.email}`}>
              <button
                className="block text-center my-2 px-4 py-2 text-md rounded-xl w-72 text-gray-300  hover:text-white"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />{" "}
                Workspace
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-5 translate-y-16 text-[#f1f7feb5]">
            <Link href="https://github.com/Zethyst" target="_blank">
              <FontAwesomeIcon
                icon={faGithub}
                size="xl"
                className="hover:text-white"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/akshat-jaiswal-4664a2197/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="xl"
                className="hover:text-white"
              />
            </Link>
            <Link
              href="https://www.facebook.com/ekansh.jaiswal.796"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="xl"
                className="hover:text-white"
              />
            </Link>
            <Link href="https://www.instagram.com/scyp77/" target="_blank">
              <FontAwesomeIcon
                icon={faInstagram}
                size="xl"
                className="hover:text-white"
              />
            </Link>
            <Link href="https://x.com/_TheColdSmoker_" target="_blank">
              <FontAwesomeIcon
                icon={faXTwitter}
                size="xl"
                className="hover:text-white"
              />
            </Link>
          </div>
          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-xl px-5 py-2 text-sm bg-slate-800 bg-opacity-80 hover:bg-slate-900 tracking-wide text-gray-200 "
              role="menuitem"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />{" "}
              Logout
            </button>
          ) : (
            <Link href="/sign-in">
              <button className="bg-slate-800 bg-opacity-80 hover:bg-slate-900 tracking-wide text-gray-200 font-semibold px-5 py-2 flex justify-center items-center gap-3 rounded-xl">
                <FontAwesomeIcon icon={faRightToBracket} />
                <p>Login</p>
              </button>
            </Link>
          )}
        </div>
      </div>
      {/* BACKGROUND */}
      <div
        onClick={() => setShowMobileMenu(false)}
        className={` ${
          showMobileMenu ? "openMobileBg" : "closeMobileBg"
        } w-[100vw] min-h-[100vh] max-h-[100vh] relative transition-all ease-in duration-500 flex justify-center items-center overflow-hidden -z-10 `}
      ></div>
    </div>
  );
};

export default MobileBurgerView;
