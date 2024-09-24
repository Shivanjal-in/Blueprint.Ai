"use client";
import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
// import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleCheck);

interface StorageProps {
  isMobile: boolean;
  selectedStorage: string;
  setSelectedStorage: React.Dispatch<React.SetStateAction<string>>;
}
function StorageOption({isMobile, selectedStorage, setSelectedStorage }: StorageProps) {
  const [other, setOther] = useState("");

  function handleClick(option: string) {
    setSelectedStorage(option);
    if (option !== "Other") {
      setOther("");
    }
  }

  useEffect(() => {
    if (other) {
      setSelectedStorage(other);
    }
  }, [other, selectedStorage, setSelectedStorage]);

  const options = [
    "Less than 100 GB for small-scale operations",
    "Several terabytes for handling extensive media files",
    "Scalable cloud storage solutions",
    "Minimal local storage, primarily using cloud services",
  ];

  return (
    <div className="flex flex-col justify-center items-center md:items-start gap-4">
      <p
        className="text-xl text-center md:text-left text-gray-300 tracking-wide"
        style={{ fontFamily: " 'Cinzel Variable', serif" }}
      >
        Will your software require data storage, and if so, how much data capacity will it need?
      </p>
      <p className="text-start text-sm md:text-base text-gray-200">Please select an option:</p>
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleClick(option)}
          className={`${
            selectedStorage === option ? "selected" : "not-selected"
          } bg-[#00000029] hover:bg-[#00000044]  active:translate-x-1 active:translate-y-1 md:active:translate-x-0 md:active:translate-y-0 text-gray-200 text-xs md:text-base cursor-pointer rounded-2xl px-7 py-4 w-96 md:w-[550px] flex justify-between items-center gap-5`}
        >
          <p>{option}</p>
          <div
            className={`${
              selectedStorage === option ? "hidden" : "bg-[#0000004e] p-[10px] rounded-full custom-border3"
            }`}
          ></div>
          <FontAwesomeIcon
            icon={faCircleCheck}
            size={`${isMobile ? "2xl" : "xl"}`}
            className={`${
              selectedStorage === option ? "text-[#0253b9]" : "hidden"
            }`}
          />
        </div>
      ))}
      <div className={`${other !==""?"selected":"not-selected"} bg-[#00000029] text-gray-200 rounded-2xl floating-label px-5 pb-5`}>
        <input
          className="bg-transparent py-5  px-3 w-80 md:w-[510px] custom-border2 outline-none poppins-regular"
          type="text"
          placeholder="Other"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default StorageOption;
