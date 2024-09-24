"use client";
import type { Metadata } from "next";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { APIResponse } from "@/types/APIResponse";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";
import Link from "next/link";
import Image from "next/image";
import lockImage from "../../assets/locker.png";
import Stars from "./Stars";
import Praise from "./Praise";
import SRSModel from "@/models/SRS";

// const baseURL = "http://localhost:5000"
const baseURL = "https://blueprint-ai-backend.onrender.com";

function Page() {
  const { toast } = useToast();
  const { status } = useSession();
  const [pdfName, setPdfName] = useState("");
  const [finish, setFinish] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [praises, setPraises] = useState<string[]>([]);
  const [progress, setProgress] = useState(() => {
    const storedProgress = localStorage.getItem("progress");
    return storedProgress ? parseFloat(storedProgress) : 0;
  });
  useEffect(() => {
    return () => {
      localStorage.removeItem("progress");
    };
  }, []);

  useEffect(() => {
    const checkSrsStatus = async () => {
      try {
        const response = await axios.get(`/api/check-srs-status`);
        if (response.data.status === "Completed") {
          setPdfName(response.data.pdf_url);
          setFinish(true);
          setProgress(600);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error checking SRS status", error);
      }
    };

    const intervalId = setInterval(checkSrsStatus, 10000); // Poll every 20 seconds
    return () => clearInterval(intervalId);
  }, [setPdfName]);

  const saveReview = async (rating: number | null, praises: string[]) => {
    try {
      const response = await axios.post(`/api/save-review`, {
        rating,
        praises,
      });
      console.log("Review saved successfully", response.data);
    } catch (error) {
      console.error("Error saving SRS review", error);
    }
  };

  // Debounced function to save review
  const debouncedSaveReview = debounce(saveReview, 5000);

  useEffect(() => {
    debouncedSaveReview(rating, praises);
    // Cancel the debounce on component unmount
    return () => {
      debouncedSaveReview.cancel();
    };
  }, [rating, praises]);

  const handleDownload = async () => {
    try {
      console.log(pdfName);

      const response = await axios.get(
        `${baseURL}/download-pdf/${pdfName}.pdf`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${pdfName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the PDF file", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  const handleView = () => {
    // router.replace(`/view-pdf/${pdfName}`);
    window.open(`/view-pdf/${encodeURIComponent(pdfName)}`, "_blank");
  };

  useEffect(() => {
    if (pdfName) {
      setFinish(true);
    }
  }, [pdfName]);

  useEffect(() => {
    const totalDuration = 90 * 1000; // 1 minute in milliseconds
    const incrementInterval = 100; // Update every 100 milliseconds
    const pixelsPerSecond = 600 / (totalDuration / 1000); // Assuming 600px width for 100% progress
    const pixelsPerIncrement = pixelsPerSecond * (incrementInterval / 1000);

    let currentWidth = progress;
    // if (finish) currentWidth = 600;

    const interval = setInterval(() => {
      if (currentWidth >= 600) {
        clearInterval(interval);
        setFinish(true);
        localStorage.removeItem("progress");
        return;
      }
      currentWidth += pixelsPerIncrement;
      setProgress(currentWidth);
    }, incrementInterval);

    return () => {
      localStorage.setItem("progress", currentWidth.toString());
      clearInterval(interval);
    };
  }, [progress]);

  return (
    <section className="">
      <div className="color"></div>
      <div className="color"></div>
      <div className="overflow-hidden w-[25rem] md:w-[50rem] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] shadow-md rounded-3xl mt-4 flex flex-col justify-center items-center">
        <div className="h-[50%] bg-[#00000046] glass w-full p-14 flex flex-col gap-20 justify-center items-center">
          {status == "authenticated" ? (
            <div className=" flex flex-col gap-6 justify-center items-center">
              <p
                style={{ fontFamily: " 'Cinzel Variable', serif" }}
                className="text-3xl md:text-4xl text-center tracking-wider font-medium text-white  font-gradient"
              >
                {finish ? "Your document is ready!" : "We're working on it"}
              </p>
              <p className="text-base md:text-xl grace text-center tracking-wider font-medium text-gray-300">
                {finish
                  ? "You can now view or download your SRS document"
                  : "Give us a moment"}
              </p>
              <div className="time_line_container">
                <div
                  className="time_line"
                  style={{ width: `${progress}px` }}
                ></div>
              </div>
              <div className="flex justify-center items-center gap-10 md:gap-16">
                <div
                  className={`button3 ${
                    finish ? "" : "pointer-events-none opacity-20"
                  }`}
                >
                  <div className="button-layer3 "></div>
                  <button
                    onClick={handleView}
                    className="text-slate-900 bg-opacity-65 flex justify-center items-center gap-2 w-full py-3 rounded-xl font-semibold"
                  >
                    <VisibilityIcon />
                    <p>View</p>
                  </button>
                </div>
                <div
                  className={`button ${
                    finish ? "" : "pointer-events-none opacity-20"
                  }`}
                >
                  <div className="button-layer"></div>
                  <button
                    onClick={handleDownload}
                    className="text-slate-200 bg-opacity-65 flex justify-center items-center gap-2 w-full py-3 rounded-xl font-semibold"
                  >
                    <DownloadIcon />
                    <p>Download</p>
                  </button>
                </div>
              </div>
              <div
                className={`${
                  finish ? "flex" : "hidden"
                } justify-center items-center gap-3 pt-2`}
              >
                <p className="text-base md:text-lg grace text-center tracking-wider font-medium text-gray-300 -translate-y-1">
                  Rate the PDF
                </p>
                <Stars rating={rating} setRating={setRating} />
              </div>
              <div
                className={`${
                  finish ? "flex" : "hidden"
                } flex-col justify-center items-center gap-4`}
              >
                <p className="text-base md:text-lg grace tracking-wider font-medium text-gray-300">
                  What traits best describes the PDF generated
                </p>
                <div className="flex flex-wrap justify-center items-center gap-3">
                  <Praise
                    name="User-Friendly"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Efficient"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Reliable"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Helpful"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Innovative"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Accurate"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Secure"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Customizable"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Informative"
                    praises={praises}
                    setPraises={setPraises}
                  />
                  <Praise
                    name="Responsive"
                    praises={praises}
                    setPraises={setPraises}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <Image
                src={lockImage}
                height={100}
                alt="Lock"
                className="absolute top-5 z-30 shadow md:scale-150"
              />
              <div className={`button2 absolute z-30 top-10 shadow-2xl `}>
                <div className="button-layer2"></div>
                <Link href="sign-in">
                  <button className="bg-black px-4 py-2  w-full text-xl  font-bold tracking-wide text-black uppercase poppins-regular">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
