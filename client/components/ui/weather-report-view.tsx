"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { IconPrinter } from '@tabler/icons-react';
import axios from 'axios';

interface Pest_History {
  id: number;
  date: string;
  city: string;
  temperature: string;
  ph_value: string;
  wind_speed: string;
  rainfall: string;
}

const ReportView = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const date = searchParams.get('date');
  const city = searchParams.get('city');
  const [temperature, setTemperature] = useState(searchParams.get('temperature') || '');
  const [ph_value, setPhValue] = useState(searchParams.get('ph_value') || '');
  const [wind_speed, setWindSpeed] = useState(searchParams.get('wind_speed') || '');
  const [rainfall, setRainfall] = useState(searchParams.get('rainfall') || '');

  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: white; color: black;">
        <h1>Weather Report</h1>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Temperature (°C):</strong> ${temperature}</p>
        <p><strong>pH Value:</strong> ${ph_value}</p>
        <p><strong>Wind Speed (km/h):</strong> ${wind_speed}</p>
        <p><strong>Rainfall (mm):</strong> ${rainfall}</p>
      </div>
    `;

    const newWindow = window.open('', '_blank');
    newWindow!.document.write(printContent);
    newWindow!.document.close();
    newWindow!.focus();
    newWindow!.print();
    newWindow!.close();
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');

    const updatedData = {
      id: id,
      temperature: temperature,
      ph_value: ph_value,
      wind_speed: wind_speed,
      rainfall: rainfall,
    };

    try {
      const response = await axios.put('', updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      alert('Data updated successfully!');
      console.log('Update Result:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 relative">
        <div className="absolute top-4 right-4">
          <button onClick={handlePrint} className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition duration-200">
            <IconPrinter size={24} />
          </button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Weather Report</h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400">Date:</h2>
            <p className="text-gray-200">{date}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400">City:</h2>
            <p className="text-gray-200">{city}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400">Temperature (°C):</h2>
            <input 
              type="number" 
              value={temperature} 
              onChange={(e) => setTemperature(e.target.value)} 
              className="text-white bg-transparent p-2 rounded-md w-full"
            />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400">pH Value:</h2>
            <input 
              type="number" 
              value={ph_value} 
              onChange={(e) => setPhValue(e.target.value)} 
              className="text-white bg-transparent p-2 rounded-md w-full"
            />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400">Wind Speed (km/h):</h2>
            <input 
              type="number" 
              value={wind_speed} 
              onChange={(e) => setWindSpeed(e.target.value)} 
              className="text-white bg-transparent p-2 rounded-md w-full"
            />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400">Rainfall (mm):</h2>
            <input 
              type="number" 
              value={rainfall} 
              onChange={(e) => setRainfall(e.target.value)} 
              className="text-white bg-transparent p-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
