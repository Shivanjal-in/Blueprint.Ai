"use client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { useToast } from "@/components/ui/use-toast";
import { Document, Page, pdfjs } from "react-pdf";
// import { useResizeObserver } from '@wojtekmaj/react-hooks';
import axios from "axios";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

const baseURL = "https://blueprint-ai-backend.onrender.com";

const ViewPdf: React.FC = () => {
  const { toast } = useToast();
  const params = useParams<{ pdfPath: string }>();
  const decodedPath = decodeURIComponent(params.pdfPath);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (decodedPath) {
      const fetchPdf = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/download-pdf/${decodedPath}.pdf`, // Remove .pdf extension
            {
              responseType: "blob",
            }
          );

          const url = window.URL.createObjectURL(new Blob([response.data]));
          setPdfUrl(url);
        } catch (error) {
          console.error("Error fetching the PDF file", error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error fetching the PDF file",
          });
        }
      };

      fetchPdf();
    }
  }, [decodedPath, toast]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setTimeout(() => {
        const pdfPages = document.querySelectorAll(".react-pdf__Page");
        const pdfPagesCanvas = document.querySelectorAll(".react-pdf__Page__canvas");
        console.log(pdfPagesCanvas);
        
        pdfPages.forEach((page) => {
          page.classList.add("rounded-xl");
        });
        pdfPagesCanvas.forEach((page) => {
          page.classList.add("rounded-xl");
        });
    }, 10);
  }
  useEffect(() => {

  }, []);

  return (
    <section className="">
      <div className="color"></div>
      <div className="color"></div>
      <div className="Example__container ">
        <div className="Example__container__document " ref={setContainerRef}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="h-[800px] overflow-hidden"
              />
            ))}
          </Document>
        </div>
      </div>
    </section>
  );
};

export default ViewPdf;
