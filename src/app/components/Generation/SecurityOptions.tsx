"use client";
import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
// import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faSquareCheck);

interface securityProps {
  isMobile: boolean;
  selectedSecurity: string[];
  setSelectedSecurity: React.Dispatch<React.SetStateAction<string[]>>;
}
function SecurityOptions({isMobile, selectedSecurity, setSelectedSecurity }: securityProps) {
  const [other, setOther] = useState("");

  function handleClick(option: string) {
    if (selectedSecurity.includes(option)) {
      // If option already exists in array, remove it
      setSelectedSecurity(selectedSecurity.filter(key => key !== option));
    } else {
      // Else add it to the array
      setSelectedSecurity([...selectedSecurity, option]);
    }
  }

  const options = [
    "Must comply with GDPR and CCPA for data privacy",
    "Requires HIPAA compliance for handling healthcare information",
    "PCI DSS compliance for processing payment information",
    "No specific compliance standards; general best practices for security",
  ];

  useEffect(() => {
    if (other) {
      setSelectedSecurity([...selectedSecurity, other]);
    }
  }, [other, selectedSecurity, setSelectedSecurity]);

  return (
    <div className="flex flex-col justify-center items-center md:items-start gap-4">
      <p
        className="text-xl text-center md:text-left text-gray-300 tracking-wide"
        style={{ fontFamily: " 'Cinzel Variable', serif" }}
      >
        Are there any specific security requirements or compliance standards that the software must meet?
      </p>
      <p className="text-start text-sm md:text-base text-gray-200">Please select all that apply:</p>
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleClick(option)}
          className={`${
            selectedSecurity.includes(option) ? "selected" : "not-selected"
          } bg-[#00000029] hover:bg-[#00000044]  active:translate-x-1 active:translate-y-1 md:active:translate-x-0 md:active:translate-y-0 text-gray-200 text-xs md:text-base cursor-pointer rounded-2xl px-7 py-4 w-96 md:w-[550px] flex justify-between items-center gap-5`}
        >
          <p>{option}</p>
          <div
            className={`${
              selectedSecurity.includes(option) ? "hidden" : "bg-[#0000004e] p-[10px] rounded-sm custom-border3"
            } `}
          ></div>
          <FontAwesomeIcon
            icon={faSquareCheck}
            size={`${isMobile ? "2xl" : "xl"}`}
            className={`${
              selectedSecurity.includes(option) ? "text-[#0253b9]" : "hidden"
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

export default SecurityOptions;
