"use client";
import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { FileUpload } from "@/components/ui/file-upload";
import { IconZoomScan, IconPrinter } from "@tabler/icons-react";
import { ResultSectionYield } from "@/components/ui/result-section-yield";

interface PredictionResult {
  predicted_class: string;
  summary: string;
}

export function FileUploadDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setSubmit] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null); // Store Base64 image data

  const handleFileChange = (newFile: File | null) => {
    if (newFile) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(newFile.type)) {
        setError("Invalid file type. Please upload a JPG, PNG, or GIF image.");
        setFile(null);
        setImageData(null);
        return;
      }

      const maxSize = 2 * 1024 * 1024;
      if (newFile.size > maxSize) {
        setError("File size exceeds 2MB. Please upload a smaller file.");
        setFile(null);
        setImageData(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(newFile);
    }
    setFile(newFile);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:8000/desease/predict/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(response.data);
      setSubmit(true);
      setError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(`Axios error: ${error.response?.status} - ${error.response?.data}`);
      } else {
        alert("An unknown error occurred while submitting");
      }
    }
  };

  const generatePDFReport = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("Crop Pest Prediction Report", 20, 20);

    const currentDate = new Date().toLocaleDateString();
    pdf.setFontSize(12);
    pdf.text(`Date: ${currentDate}`, 20, 40);

    pdf.setFontSize(16);
    pdf.text("Identified Pest:", 20, 60);
    pdf.setFontSize(12);
    pdf.text(`• Identified Pest: ${result?.predicted_class}`, 20, 70);

    pdf.setFontSize(16);
    pdf.text("Summary:", 20, 90);
    const summaryLines = pdf.splitTextToSize(result?.summary || "", 170);
    let yPosition = 100; 
    summaryLines.forEach((line: string) => {
      pdf.setFontSize(10);
      pdf.text(line, 20, yPosition);
      yPosition += 10; 
    });

    if (imageData) {
      pdf.addImage(imageData, "PNG", 20, yPosition, 50, 50);
    }

    pdf.save("crop_pest_prediction_report.pdf");
  };

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileChange} />
        {error && (
          <div className="text-red-500">
            <p>{error}</p>
          </div>
        )}
        <div className="flex flex-row m-6 justify-end">
          {isSubmitted && result !== null && (
            <div>
              <ResultSectionYield
                result=""
                unit=""
                title={result.predicted_class}
                description={result.summary}
                url="/desease/all"
              />
              <button
                className="py-2 px-4 black text-white rounded"
                onClick={generatePDFReport}
              >
                <IconPrinter size={25} color="white"/> 
              </button>
            </div>
          )}
          <div className="">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleFileUpload}
              disabled={!file}
            >
              <IconZoomScan size={25} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
