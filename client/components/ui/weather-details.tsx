"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "./label";
import { Input } from "./input";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";

const WeatherDetails = () => {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState<string[]>([]); 
  const [formData, setFormData] = useState({
    date: "",
    city: "",
    temperature: "",
    phValue: "",
    windSpeed: "",
    rainfall: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.date) {
      newErrors.push("Date is required");
    }
    if (!formData.city.trim()) {
      newErrors.push("City is required");
    }
    const temp = parseFloat(formData.temperature);
    if (isNaN(temp) || temp < -50 || temp > 60) {
      newErrors.push("Temperature should be a valid number between -50°C and 60°C");
    }
    const ph = parseFloat(formData.phValue);
    if (isNaN(ph) || ph < 0 || ph > 14) {
      newErrors.push("pH Value should be between 0 and 14");
    }
    const wind = parseFloat(formData.windSpeed);
    if (isNaN(wind) || wind < 0) {
      newErrors.push("Wind Speed should be a positive number");
    }
    const rain = parseFloat(formData.rainfall);
    if (isNaN(rain) || rain < 0) {
      newErrors.push("Rainfall should be a positive number");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!validateForm()) {
      return;
    }

    const payload = {
      date: formData.date,
      city: formData.city,
      temperature: formData.temperature,
      phValue: formData.phValue,
      windSpeed: formData.windSpeed,
      rainfall: formData.rainfall,
    };

    try {
      const response = await axios.post('http://localhost:8000/weather/report/save/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 500,
      });
      router.push('/weather/all');
      setResult(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(`Axios error: ${error.response?.status} - ${error.response?.data}`);
      } else {
        alert('An unknown error occurred while submitting');
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to KUMBURA
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill the form below to generate a weather report
      </p>

      {errors.length > 0 && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded-md">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              onChange={handleChange}
              type="date"
              value={formData.date}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Gampaha"
              onChange={handleChange}
              type="text"
              value={formData.city}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="temperature">Temperature (°C)</Label>
          <Input
            id="temperature"
            name="temperature"
            placeholder="25"
            onChange={handleChange}
            type="text"
            value={formData.temperature}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phValue">pH Value</Label>
          <Input
            id="phValue"
            name="phValue"
            placeholder="5.4"
            onChange={handleChange}
            type="text"
            value={formData.phValue}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="windSpeed">Wind Speed (km/h)</Label>
          <Input
            id="windSpeed"
            name="windSpeed"
            placeholder="25"
            onChange={handleChange}
            type="text"
            value={formData.windSpeed}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="rainfall">Rainfall (mm)</Label>
          <Input
            id="rainfall"
            name="rainfall"
            placeholder="20"
            onChange={handleChange}
            type="text"
            value={formData.rainfall}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
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

export default WeatherDetails;
