import React from "react";
import Image_1 from "@/assets/image-1.png";
import Image from "next/image";

function Hero() {
  const scrollToSection = (id:any) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
  return (
    <div className="flex flex-col gap-28 my-20">
      <div className="px-6 md:px-32  space-y-14 flex flex-col justify-center items-center">
        <p
          style={{ fontFamily: " 'Cinzel Variable', serif" }}
          className="text-5xl md:text-7xl text-center tracking-wider font-medium text-white md:w-[50rem] font-gradient"
        >
          Use AI to write &nbsp; software requirements specification
        </p>
        <p className="text-base md:text-xl manrope text-center  text-gray-300 md:w-[45rem]">
          Just describe your idea, and we'll handle the rest, ensuring your
          project starts on the right foot. Our tool will generate a Software
          Requirements Specification (PDF) - a detailed document outlining what
          your software should do.
        </p>
        <div className={`button`}>
          <div className="button-layer"></div>
          <button
                  onClick={() => scrollToSection('generate')}
            style={{ fontFamily: " 'Cinzel Variable', serif" }}
            className="bg-black px-4 py-2 w-full text-xl font-semibold tracking-wide"
          >
            Generate
          </button>
        </div>
      </div>
      <div className="my-20 flex justify-center items-center gap-12">
        <Image src={Image_1} height={400} alt="Example" className="hidden md:block"></Image>
        <div className=" space-y-8 flex flex-col md:justify-end md:items-end ">
          <p
            style={{ fontFamily: " 'Cinzel Variable', serif" }}
            className="text-3xl md:text-5xl text-center md:translate-x-6 tracking-wider font-medium text-white font-gradient"
          >
            Why do you need SRS?
          </p>
          <p className="text-base md:text-lg  manrope  text-gray-300 px-5 md:px-1 text-center md:text-left md:w-[36rem]">
            When you embark on the journey of creating a new software
            application, whether it's a cutting-edge mobile app, a sophisticated
            web platform, or a powerful business tool, having a clear and
            comprehensive plan is essential. This is where a Software
            Requirement Specification (SRS) comes into play. The SRS serves as
            the foundation of your project, outlining the scope, features,
            functionalities, and constraints of your software application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
