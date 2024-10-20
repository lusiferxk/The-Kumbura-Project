"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { IconTrash  } from '@tabler/icons-react';

interface Pest_History {
  id: number;
  date: string;
  city: string;
  temperature: string;
  ph_value: string;
  wind_speed: string;
  rainfall: string;
}

const reportWeatherHistory = () => {
  const [data, setData] = useState<Pest_History[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
      const token = localStorage.getItem('token');

      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8000/weather/report/all/', {
                headers: {
                  Authorization: `Bearer ${token}`
                }
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
      const response = await axios.delete(`http://localhost:8000/weather/report/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(data.filter(item => item.id !== id));
    } catch (error: unknown) {
      setError('Error deleting data');
    }
  }

  const handleNavigate = (row: Pest_History) => {
    const query = new URLSearchParams(row as unknown as Record<string, string>).toString();
    router.push(`/weather/row?${query}`);
  };

  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            City
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Temperature
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            pH Value
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Wind Speed
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Rainfall
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {data && data.map((row) => (
                    <tr className="border-b border-gray-200 dark:border-gray-700" key={row.id}>
                      <td className="px-6 py-4" onClick={() => handleNavigate(row)}>
                          {row.date}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800" onClick={() => handleNavigate(row)}>
                          {row.city}
                      </th>
                      <td className="px-6 py-4 max-w-[5rem] truncate" onClick={() => handleNavigate(row)}>
                          {row.temperature}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800" onClick={() => handleNavigate(row)}>
                          {row.ph_value}
                      </th>
                      <td className="px-6 py-4 max-w-[5rem] truncate" onClick={() => handleNavigate(row)}>
                          {row.wind_speed}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800" onClick={() => handleNavigate(row)}>
                          {row.rainfall}
                      </th>
                      <td className="px-6 py-4">
                          <button onClick={() => handleDelete(row.id)}>
                            <IconTrash size={20}/>
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default reportWeatherHistory