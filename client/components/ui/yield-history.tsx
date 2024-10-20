"use client";
import React, { useState, useEffect } from 'react';
import { IconTrash, IconEdit, IconDeviceFloppy } from '@tabler/icons-react';
import axios from 'axios';

interface Yield_History {
  id: number;
  soil_quality: string;
  environment_factors: string;
  irrigation: string;
  prediction: string;
  date_added: string;
}

const YieldHistory = () => {
  const [data, setData] = useState<Yield_History[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editDateId, setEditDateId] = useState<number | null>(null);
  const [newDate, setNewDate] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/predict/yield-all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:8000/predict/yield/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error: unknown) {
      setError('Error deleting data');
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setEditDateId(id);
    setNewDate(e.target.value);
  };

  const handleUpdateDate = async (id: number) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:8000/predict/yield/${id}/update/`, {
        date_added: newDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(data.map(item => item.id === id ? { ...item, date_added: newDate } : item));
      setEditDateId(null);
      setNewDate("");
    } catch (error: unknown) {
      setError('Error updating date');
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Soil Quality</th>
              <th scope="col" className="px-6 py-3">Environmental Factors</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Irrigation Practice</th>
              <th scope="col" className="px-6 py-3">Prediction</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((row) => (
              <tr className="border-b border-gray-200 dark:border-gray-700" key={row.id}>
                <td className="px-6 py-4">
                  {editDateId === row.id ? (
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => handleDateChange(e, row.id)}
                      className="px-2 py-1 border"
                    />
                  ) : (
                    row.date_added
                  )}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {row.soil_quality}
                </th>
                <td className="px-6 py-4">{row.environment_factors}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{row.irrigation}</td>
                <td className="px-6 py-4">{row.prediction}</td>
                <td className="px-6 py-4 flex space-x-2">
                  {editDateId === row.id ? (
                    <button onClick={() => handleUpdateDate(row.id)}>
                      <IconDeviceFloppy size={20} />
                    </button>
                  ) : (
                    <button onClick={() => setEditDateId(row.id)}>
                      <IconEdit size={20}/>
                    </button>
                  )}
                  <button onClick={() => handleDelete(row.id)}>
                    <IconTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YieldHistory;
