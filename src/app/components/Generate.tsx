"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import Timeline from "./Timeline";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Main from "./Generation/Main";
import PurposeOption from "./Generation/PurposeOption";
import TargetOption from "./Generation/TargetOption";
import KeyOptions from "./Generation/KeyOption";
import PlatformOptions from "./Generation/PlatformOptions";
import IntegrationOptions from "./Generation/IntegrationOptions";
import PerformanceOptions from "./Generation/PerformanceOptions";
import SecurityOptions from "./Generation/SecurityOptions";
import StorageOption from "./Generation/StorageOptions";
import EnvironmentOption from "./Generation/EnvironmentOptions";
import LanguageOptions from "./Generation/LanguageOptions";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import { useToast } from "@/components/ui/use-toast";
import NavigationButtons from "./NavigationButtons";

library.add(faArrowRight, faArrowLeft);

function Generate() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [busy, setBusy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(1);
  const [main, setMain] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    []
  );
  const [selectedPerformance, setSelectedPerformance] = useState<string[]>([]);
  const [selectedSecurity, setSelectedSecurity] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event.matches);
    };

    // Set initial state
    setIsMobile(mediaQuery.matches);

    // Add event listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleNext = async () => {
    setBusy(true);
    // Check if the Vibration API is supported
    if (navigator.vibrate) {
      navigator.vibrate(400);
    } else {
      console.log("Vibration API is not supported on this device.");
    }
    if (currentStep === 11) {
      try {
        const response = await axios.post(`/api/initiate-srs-generation`, {
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
        });
        if (response.data.success) {
          toast({
            variant: "success",
            title: "SRS Generation Initiated",
            description: "AI has started building your SRS",
          });
        }
        router.replace(
          `/workspace/${session?.user.username || session?.user.email}`
        );
        setBusy(false);
        return;
      } catch (error) {
        setBusy(false);
        console.error("Error in initiating SRS generation", error);
        const axiosError = error as AxiosError<APIResponse>;
        let errorMessage = axiosError.response?.data.message;
        toast({
          variant: "destructive",
          title: "Failed to Initiate SRS Generation",
          description: errorMessage,
        });
        return;
      }
    }
    if (step <= currentStep) {
      setStep((prevState) => prevState + 1);
    }
    setCurrentStep((prevState) => prevState + 1);
    setBusy(false);
  };

  const handlePrev = () => {
    setCurrentStep((prevState) => prevState - 1);
  };

  const handleEnterPress = (event:any) => {
    if (event.key === 'Enter') {
      if ((main !== "" && currentStep === 1)|| 
      (selectedPurpose !== "" && currentStep === 2) ||
      (selectedTarget !== "" && currentStep === 3) ||
      (selectedKeys.length !== 0 && currentStep === 4) ||
      (selectedPlatforms.length !== 0 && currentStep === 5) ||
      (selectedIntegrations.length !== 0 && currentStep === 6) ||
      (selectedPerformance.length !== 0 && currentStep === 7) ||
      (selectedSecurity.length !== 0 && currentStep === 8) ||
      (selectedStorage !== "" && currentStep === 9) ||
      (selectedEnvironment !== "" && currentStep === 10) ||
      (selectedLanguage.length !== 0 && currentStep === 11)) {
        handleNext();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPress);

    return () => {
      document.removeEventListener('keydown', handleEnterPress);
    };
  }, [handleEnterPress]);
  return (
    <div
      id="generate"
      className="flex justify-center items-center gap-10 md:w-full"
    >
      <div className="flex flex-col justify-center items-start gap-2 md:gap-5 px-5 md:px-0 md:w-[40%]">
        <Timeline
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          step={step}
        />
        {currentStep === 1 ? <Main main={main} setMain={setMain} /> : null}
        {currentStep === 2 ? (
          <PurposeOption
            isMobile={isMobile}
            selectedPurpose={selectedPurpose}
            setSelectedPurpose={setSelectedPurpose}
          />
        ) : null}
        {currentStep === 3 ? (
          <TargetOption
          isMobile={isMobile}
            selectedTarget={selectedTarget}
            setSelectedTarget={setSelectedTarget}
          />
        ) : null}
        {currentStep === 4 ? (
          <KeyOptions
          isMobile={isMobile}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
          />
        ) : null}
        {currentStep === 5 ? (
          <PlatformOptions
          isMobile={isMobile}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
        ) : null}
        {currentStep === 6 ? (
          <IntegrationOptions
          isMobile={isMobile}
            selectedIntegrations={selectedIntegrations}
            setSelectedIntegrations={setSelectedIntegrations}
          />
        ) : null}
        {currentStep === 7 ? (
          <PerformanceOptions
          isMobile={isMobile}
            selectedPerformance={selectedPerformance}
            setSelectedPerformance={setSelectedPerformance}
          />
        ) : null}
        {currentStep === 8 ? (
          <SecurityOptions
          isMobile={isMobile}
            selectedSecurity={selectedSecurity}
            setSelectedSecurity={setSelectedSecurity}
          />
        ) : null}
        {currentStep === 9 ? (
          <StorageOption
          isMobile={isMobile}
            selectedStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
          />
        ) : null}
        {currentStep === 10 ? (
          <EnvironmentOption
          isMobile={isMobile}
            selectedEnvironment={selectedEnvironment}
            setSelectedEnvironment={setSelectedEnvironment}
          />
        ) : null}
        {currentStep === 11 ? (
          <LanguageOptions
          isMobile={isMobile}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        ) : null}
        {isMobile ? (
          <NavigationButtons
            currentStep={currentStep}
            main={main}
            selectedPurpose={selectedPurpose}
            selectedTarget={selectedTarget}
            selectedKeys={selectedKeys}
            selectedPlatforms={selectedPlatforms}
            selectedIntegrations={selectedIntegrations}
            selectedPerformance={selectedPerformance}
            selectedSecurity={selectedSecurity}
            selectedStorage={selectedStorage}
            selectedEnvironment={selectedEnvironment}
            selectedLanguage={selectedLanguage}
            busy={busy}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        ) : (
          ""
        )}
      </div>
      <div className="hidden overflow-hidden   max-w-screen-sm w-[40%] mt-4 md:flex flex-col justify-center items-center">
        <div className="h-[50%] bg-[#00000046] shadow rounded-3xl glass w-full py-12 px-10 flex flex-col gap-6 justify-center items-start">
          <h1
            className=" text-3xl text-gray-400 font-gradient"
            style={{ fontFamily: " 'Cinzel Variable', serif" }}
          >
            Choose options and features of your future app
          </h1>
          <p className="bg-transparent py-5 w-[30rem] poppins-regular text-gray-200">
            Using your inputs, we will generate a preliminary document that
            describes the features, functions, and constraints for developers.
          </p>
        </div>
        <NavigationButtons
          currentStep={currentStep}
          main={main}
          selectedPurpose={selectedPurpose}
          selectedTarget={selectedTarget}
          selectedKeys={selectedKeys}
          selectedPlatforms={selectedPlatforms}
          selectedIntegrations={selectedIntegrations}
          selectedPerformance={selectedPerformance}
          selectedSecurity={selectedSecurity}
          selectedStorage={selectedStorage}
          selectedEnvironment={selectedEnvironment}
          selectedLanguage={selectedLanguage}
          busy={busy}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}

export default Generate;
