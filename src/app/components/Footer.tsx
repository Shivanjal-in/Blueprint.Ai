import React from "react";
import {
  faMapLocationDot,
  faEnvelope,
  faPhone,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub, faXTwitter, faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

library.add(faMapLocationDot, faEnvelope, faPhone, faHeart, faTwitter, faGithub, faXTwitter, faLinkedin, faInstagram, faFacebook);

function Footer() {
  return (
    <footer className="w-full bg-[#00000069] py-12 md:py-16 md:h-[30rem] px-5 md:px-32 flex flex-col justify-end md:justify-between items-start gap-5 backdrop-blur-lg shadow-lg z-10">
      <div className="flex justify-center md:justify-between items-start gap-5 w-full">
        <div className="flex flex-col justify-center items-start gap-5 md:translate-y-5 ">
          <div className=" text-[#f1f7feb5] text-sm flex justify-start items-center gap-3">
            <FontAwesomeIcon icon={faMapLocationDot} />
            <div>
              <p>KP-9C, KIIT Road</p>
              <p>India - 751024</p>
            </div>
          </div>
          <div className="text-[#f1f7feb5] text-sm flex justify-start items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>contact.akshat.jaiswal@gmail.com</p>
          </div>
          <div className="text-[#f1f7feb5] text-sm flex justify-start items-center gap-3">
            <FontAwesomeIcon icon={faPhone} />
            <p>+91 831-887-6136</p>
          </div>
          <div className=" flex justify-center items-center gap-5 translate-y-2 text-[#f1f7feb5]">
            <Link href="https://github.com/Zethyst" target='_blank'>
                <FontAwesomeIcon icon={faGithub} size="xl" className="hover:text-white"/>
            </Link>
            <Link href="https://www.linkedin.com/in/akshat-jaiswal-4664a2197/" target='_blank'>
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="hover:text-white"/>
            </Link>
            <Link href="https://www.facebook.com/ekansh.jaiswal.796" target='_blank'>
                <FontAwesomeIcon icon={faFacebook} size="xl" className="hover:text-white"/>
            </Link>
            <Link href="https://www.instagram.com/scyp77/" target='_blank'>
                <FontAwesomeIcon icon={faInstagram} size="xl" className="hover:text-white"/>
            </Link>
            <Link href="https://x.com/_TheColdSmoker_" target='_blank'>
                <FontAwesomeIcon icon={faXTwitter} size="xl" className="hover:text-white"/>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex gap-40">
          <div className="middle ">
            <p className="text-gray-100 text-lg">Platforms</p>
            <ul className="text-[#f1f7feb5] text-sm flex flex-col gap-6 ">
                <li></li>
              <Link href="https://zethyst.github.io/NewsApp/" target='_blank' className="hover:text-gray-200 cursor-pointer">NewsRadar</Link>
              <Link href="https://real-time-white-board-sharing-app.vercel.app/" target='_blank' className="hover:text-gray-200 cursor-pointer">Whitewave</Link>
              <Link href="https://inotebook-gold.onrender.com/" target='_blank' className="hover:text-gray-200 cursor-pointer">iNotebook</Link>
              <Link href="https://tunetron.vercel.app/" target='_blank' className="hover:text-gray-200 cursor-pointer">Tunetron</Link>
              <Link href="https://mindstim-quiz-app.vercel.app/" target='_blank' className="hover:text-gray-200 cursor-pointer">Mindstim</Link>
            </ul>
          </div>
          <div className="middle ">
            <p className="text-gray-100 text-lg">Popular Tools</p>
            <ul className="text-[#f1f7feb5] text-sm flex flex-col gap-6  ">
              <li></li>
              <Link href="https://password-generator-zethyst.vercel.app/" target='_blank' className="hover:text-gray-200 cursor-pointer">Password Generator</Link>
              <Link href="https://zethyst.github.io/Data-Visualization/" target='_blank' className="hover:text-gray-200 cursor-pointer">Data Visualizer</Link>
              <Link href="https://score-sense-zethyst.vercel.app/" target='_blank' className="hover:text-gray-200 cursor-pointer">Percentage Calculator</Link>
              <Link href="https://scalemate.vercel.app/" target='_blank' className="hover:text-gray-200 cursor-pointer">Unit Converter</Link>
            </ul>
          </div>
          <div className="middle">
            <p className="text-gray-100 text-lg">Legal</p>
            <ul className="text-[#f1f7feb5] text-sm space-y-6 ">
              <li></li>
              <li className="hover:text-gray-200 cursor-pointer">
                Acceptable Use
              </li>
              <li className="hover:text-gray-200 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-gray-200 cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-full relative justify-center items-center pt-5 tracking-wide">
      <hr className="divider mt-2"/>
        <p className="text-gray-200 manrope text-center md:text-start translate-y-5 px-5">&copy; 2024 Blueprint.AI - All rights reserved. Designed With  <FontAwesomeIcon className="hover:text-red-600" icon={faHeart} /> By Akshat Jaiswal</p>
      </div>
    </footer>
  );
}

export default Footer;
