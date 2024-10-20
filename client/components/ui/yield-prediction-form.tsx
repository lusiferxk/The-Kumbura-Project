"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import jsPDF from 'jspdf';
import { IconPrinter } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { ResultSectionYield } from "@/components/ui/result-section-yield";

const yieldPredictionForm = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const [isSubmitted, setSubmitted] = useState(false);
  const [submittionError, setSubmittionError] = useState<string | null>(null);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    soil_quality: "",
    environment_factors: "",
    irrigation: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    soil_quality: "",
    environment_factors: "",
    irrigation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let formErrors = { date: "", soil_quality: "", environment_factors: "", irrigation: "" };
    let isValid = true;

    if (!formData.date) {
      formErrors.date = "Date is required";
      isValid = false;
    }
    if (!formData.soil_quality) {
      formErrors.soil_quality = "Soil quality is required";
      isValid = false;
    }
    if (!formData.environment_factors) {
      formErrors.environment_factors = "Environmental factors are required";
      isValid = false;
    }
    if (!formData.irrigation) {
      formErrors.irrigation = "Irrigation practice is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!validateForm()) {
      return;
    }

    const payload = {
      date: formData.date,
      soil_quality: formData.soil_quality,
      environment_factors: formData.environment_factors,
      irrigation: formData.irrigation,
    };

    try {
      const response = await axios.post("http://localhost:8000/predict/yield-predict/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 500,
      });
      setResult(response.data.result);
      setSubmitted(true);
    } catch (error: unknown) {
      setSubmittionError('an error occurred while submitting')
    }
  };

  const generatePDFReport = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text('Crop Yield Prediction Report', 20, 20);

    const currentDate = new Date().toLocaleDateString();
    pdf.setFontSize(12);
    pdf.text(`Date: ${formData.date}`, 20, 40);

    pdf.setFontSize(16);
    pdf.text('Soil Quality:', 20, 60);
    pdf.setFontSize(12);
    pdf.text(`• Soil Quality: ${formData.soil_quality}`, 20, 70);

    pdf.setFontSize(16);
    pdf.text('Environmental Factors:', 20, 90);
    pdf.setFontSize(12);
    pdf.text(`• Environmental Factors: ${formData.environment_factors}`, 20, 100); 

    pdf.setFontSize(16);
    pdf.text('Irrigation Practices:', 20, 120);
    pdf.setFontSize(12);
    pdf.text(`• Irrigation Practice: ${formData.irrigation}`, 20, 150);

    pdf.setFontSize(16);
    pdf.text('Predicted Yield:', 20, 170);
    pdf.setFontSize(12);
    pdf.text(`• Predicted Yield: ${result} kg per acre`, 20, 180);

    pdf.save('crop_yield_prediction_report.pdf');
};

  return (
    <div className="max-w-lg w-full my-[1rem] mx-[16rem] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to KUMBURA
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Here you can predict and analyze your crops by simply filling out the form below
      </p>
      {submittionError && <p className="text-red-500 text-sm">{submittionError}</p>}
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="plantingDate">Planting Date</Label>
          <Input
            id="plantingDate"
            name="date"
            type="date"
            value={formData.date}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="soilQuality">Soil Quality</Label>
          <Select
            id="soilQuality"
            name="soil_quality"
            onChange={handleChange}
            value={formData.soil_quality}
          >
            <option value="">Select Soil Quality</option>
            <option value="Good">Good</option>
            <option value="Moderate">Moderate</option>
            <option value="Bad">Bad</option>
          </Select>
          {errors.soil_quality && <p className="text-red-500 text-sm">{errors.soil_quality}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="environmentalFactors">Environmental Factors</Label>
          <Select
            id="environmentalFactors"
            name="environment_factors"
            onChange={handleChange}
            value={formData.environment_factors}
          >
            <option value="">Select Environmental Factors</option>
            <option value="Dry">Dry</option>
            <option value="Rainy">Rainy</option>
            <option value="Humid">Humid</option>
          </Select>
          {errors.environment_factors && <p className="text-red-500 text-sm">{errors.environment_factors}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="irrigation">Irrigation Practice</Label>
          <Select
            id="irrigation"
            name="irrigation"
            onChange={handleChange}
            value={formData.irrigation}
          >
            <option value="">Select Irrigation Practice</option>
            <option value="Yala">Yala</option>
            <option value="Maha">Maha</option>
          </Select>
          {errors.irrigation && <p className="text-red-500 text-sm">{errors.irrigation}</p>}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Analyze &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

      {isSubmitted && (
        <div>
          <ResultSectionYield result={result} unit={"kg per acre"} title={"Predicted Yield"} description={"Here are the predicted results depending on your inputs,"} url="/yield/all" />
          <button
            className="py-2 px-4 black text-white rounded"
            onClick={generatePDFReport}
          >
           <IconPrinter size={25} color="white"/> 
          </button>
        </div>
      )}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default yieldPredictionForm;
