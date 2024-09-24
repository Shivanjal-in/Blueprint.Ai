"use client";
import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PDF from "@/assets/Pdf.png";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import Loader from "@/app/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import { APIResponse } from "@/types/APIResponse";
import Card from "./Card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import lockImage from "../../assets/locker.png";

library.add(faTrash, faPenToSquare);

interface SRSResponse {
  success: boolean;
  SRSDocuments: SRSDocument[];
}

interface SRSDocument {
  _id: string;
  owner: string;
  name: string;
  description: string[];
  is_completed: boolean;
  pdf_url: string;
  word_url: string;
  createdAt: string;
}

interface DataItem {
  mongoID: string;
  id: number;
  name: string;
  status: string;
  created: string;
  pdf: string;
  word: string;
}

// const BaseURL = "http://localhost:5000";
const BaseURL = "https://blueprint-ai-backend.onrender.com";

const Page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const { status } = useSession();
  const { toast } = useToast();

  function formatDate(dateString: any): string {
    const date = new Date(dateString);

    const pad = (num: number): string => num.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

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

  useEffect(() => {
    const getAllSRS = async () => {
      try {
        setLoading(true);
        const response = await axios.get<SRSResponse>(`/api/get-all-srs`);
        if (response.data.success) {
          const transformedData = response.data.SRSDocuments.map(
            (doc: any, index: any) => ({
              mongoID: doc.mongoID,
              id: index + 1,
              name: doc.name,
              status: doc.status,
              created: formatDate(doc.created),
              pdf: doc.pdf,
              word: doc.word,
            })
          );
          setData(transformedData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error getting srs documents", error);
        const axiosError = error as AxiosError<APIResponse>;
        let errorMessage = axiosError.response?.data.message;
        toast({
          title: errorMessage,
        });
      }
    };
    getAllSRS();
  }, []);

  const handleDownload = async (pdfName: string) => {
    try {
      const response = await axios.get(
        `${BaseURL}/download-pdf/${pdfName}.pdf`,
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

  const handleView = (pdfName: string) => {
    // router.replace(`/view-pdf/${pdfName}`);
    window.open(`/view-pdf/${encodeURIComponent(pdfName)}`, "_blank");
  };

  const handleEdit = async (wordName: string) => {
    try {
      const response = await axios.get(
        `${BaseURL}/download-word/${wordName}.docx`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${wordName}.docx`);
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

  const handleDelete = async (id: string) => {
    setData(data.filter((item) => item.mongoID !== id));
    try {
      const response = await axios.delete(`/api/delete-srs/${id}`);
    } catch (error) {
      console.log("Error Deleting SRS Document", error);

      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  return (
    <section className="">
      <div className="color"></div>
      <div className="color"></div>
      <div className="overflow-hidden my-10 w-full shadow-md  mt-4 flex flex-col justify-center items-center">
        <div className="bg-[#00000046] w-[80%]  glass rounded-3xl p-10 self-center flex flex-col gap-8 justify-center items-center ">
          {status !== "authenticated" ? (
            <div className="flex justify-center items-center py-10">
              <Image
                src={lockImage}
                height={100}
                alt="Lock"
                className="absolute top-5 z-30 shadow md:scale-125"
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
          ) : loading ? (
            <div className="-translate-y-4">
              <Loader />
            </div>
          ) : isMobile ? (
            <div className=" flex flex-col justify-center items-center gap-3 w-full  ">
              {data.map((item, index) => (
                <div key={index + 1}>
                  <Card
                    ID={item.id}
                    MONGOID={item.mongoID}
                    NAME={item.name}
                    CREATED_AT={item.created}
                    STATUS={item.status}
                    PDF={item.pdf}
                    WORD={item.word}
                    handleDownload={handleDownload}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <table
              id="dataTable"
              className="w-full whitespace-no-wrap overflow-hidden table-striped"
            >
              <thead>
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                    ID
                  </th>
                  <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                    Name
                  </th>
                  <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                    Status
                  </th>
                  <th className="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody id="tableBody" className="">
                {data.map((item) => (
                  <tr key={item.id} className="">
                    <td className=" border-t px-4 py-2 ">
                      <span className="text-gray-600 px-6 py-4 flex items-center">
                        {item.id}
                      </span>
                    </td>
                    <td className=" border-t px-4 py-2 translate-x-5 ">
                      <span className="text-gray-600 px-2 py-4 flex gap-3 items-center">
                        <Image src={PDF} height={40} alt="PDF"></Image>
                        {item.name}
                      </span>
                    </td>
                    <td className=" border-t px-4 py-2  ">
                      <span
                        className={`text-gray-600 px-2 py-4 flex gap-3 items-center`}
                      >
                        {item.created}
                      </span>
                    </td>
                    <td className=" border-t px-4 py-2  ">
                      <span
                        className={`pill ${
                          item.status === "Generating"
                            ? "bg-yellow-200 text-yellow-800"
                            : item.status === "Completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className=" border-t px-4 py-2">
                      <div className="flex justify-center items-center gap-5">
                        <div onClick={() => handleView(item.pdf)}>
                          <VisibilityIcon
                            className="cursor-pointer hover:text-gray-400"
                            titleAccess="view"
                          />
                        </div>
                        <div onClick={() => handleDownload(item.pdf)}>
                          <DownloadIcon
                            className="cursor-pointer hover:text-gray-400"
                            titleAccess="download"
                          />
                        </div>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="cursor-pointer hover:text-gray-400"
                          title="edit"
                          onClick={() => handleEdit(item.word)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor-pointer hover:text-gray-400"
                          title="delete"
                          onClick={() => handleDelete(item.mongoID)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
