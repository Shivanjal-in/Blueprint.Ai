import React from "react";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Loader2 } from "lucide-react";

library.add(faArrowRight, faArrowLeft);

interface NavigationButtonsProps {
  currentStep: number;
  main: string;
  selectedPurpose: string;
  selectedTarget: string;
  selectedKeys: string[];
  selectedPlatforms: string[];
  selectedIntegrations: string[];
  selectedPerformance: string[];
  selectedSecurity: string[];
  selectedStorage: string;
  selectedEnvironment: string;
  selectedLanguage: string[];
  busy: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  main,
  selectedPurpose,
  selectedTarget,
  selectedKeys,
  selectedPlatforms,
  selectedIntegrations,
  selectedPerformance,
  selectedSecurity,
  selectedStorage,
  selectedEnvironment,
  selectedLanguage,
  busy,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="w-full flex justify-center gap-20 items-center">
      <div className={`mt-10 ${currentStep <= 1 ? "hidden " : ""} button4`}>
        <div className={`button-layer4`}></div>
        <button
          type="submit"
          onClick={handlePrev}
          style={{ fontFamily: " 'Cinzel Variable', serif" }}
          className={` bg-black px-4 py-3 w-full text-xl  font-semibold tracking-wide flex gap-2 justify-center items-center`}
        >
          <>
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>Back</p>
          </>
        </button>
      </div>
      <div className={`mt-10 button4`}>
        <div
          className={`${
            (main === "" && currentStep === 1) ||
            (selectedPurpose === "" && currentStep === 2) ||
            (selectedTarget === "" && currentStep === 3) ||
            (selectedKeys.length === 0 && currentStep === 4) ||
            (selectedPlatforms.length === 0 && currentStep === 5) ||
            (selectedIntegrations.length === 0 && currentStep === 6) ||
            (selectedPerformance.length === 0 && currentStep === 7) ||
            (selectedSecurity.length === 0 && currentStep === 8) ||
            (selectedStorage === "" && currentStep === 9) ||
            (selectedEnvironment === "" && currentStep === 10) ||
            (selectedLanguage.length === 0 && currentStep === 11) ||
            busy
              ? "pointer-events-none opacity-40"
              : ""
          } button-layer4`}
        ></div>
        <button
          type="submit"
          onClick={handleNext}
          style={{ fontFamily: " 'Cinzel Variable', serif" }}
          className={`${
            (main === "" && currentStep === 1) ||
            (selectedPurpose === "" && currentStep === 2) ||
            (selectedTarget === "" && currentStep === 3) ||
            (selectedKeys.length === 0 && currentStep === 4) ||
            (selectedPlatforms.length === 0 && currentStep === 5) ||
            (selectedIntegrations.length === 0 && currentStep === 6) ||
            (selectedPerformance.length === 0 && currentStep === 7) ||
            (selectedSecurity.length === 0 && currentStep === 8) ||
            (selectedStorage === "" && currentStep === 9) ||
            (selectedEnvironment === "" && currentStep === 10) ||
            (selectedLanguage.length === 0 && currentStep === 11) ||
            busy
              ? "pointer-events-none opacity-40"
              : ""
          } bg-black px-4 py-3 w-full text-xl  font-semibold tracking-wide flex flex-row-reverse gap-2 justify-center items-center`}
        >
          {busy ? (
            <>
              <Loader2 className=" h-5 w-5 animate-spin" />{" "}
              <p className="text-base">Please wait</p>{" "}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArrowRight} />
              <p>{currentStep === 11 ? "Generate" : "Next"}</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default NavigationButtons;
