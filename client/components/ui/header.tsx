"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { IconChevronDown } from "@tabler/icons-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // For dropdown state
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (token) {
        const response = await axios.post(
          'http://localhost:8000/user/logout/',
          { token: token },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
  
        // Only refresh the UI if the logout was successful
        if (response.status === 205) {
          localStorage.removeItem('token'); // Remove the token after a successful logout
          setIsLoggedIn(false); // Update login state
          router.push('/login'); // Redirect to login
        }
      } else {
        alert("No token found. Please log in again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };
  
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="z-50 flex items-center justify-between p-4 bg-transparent">
      <div className="text-white text-2xl font-bold">
        <Link href="/" className="hover:text-neon-blue">
          <Image
            src="/logo.png"
            alt="kumbura logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>
      </div>

      <nav className="flex items-center space-x-8 font-semibold">
        <Link href="/" className="text-white hover:text-blue-600 transition-colors duration-300">
          Home
        </Link>
        <Link href="/services" className="text-white hover:text-blue-600 transition-colors duration-300">
          Services
        </Link>
        <Link href="/about" className="text-white hover:text-blue-600 transition-colors duration-300">
          About Us
        </Link>
        <Link href="/contact" className="text-white hover:text-blue-600 transition-colors duration-300">
          Contact
        </Link>

        {isLoggedIn && (
          <div className="relative">
            <button onClick={toggleDropdown} className="text-white hover:text-blue-600 transition-colors duration-300">
              <IconChevronDown size={25} color="white"/>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-2">
                <Link href="/yield/all" className="block px-4 py-2 text-white hover:bg-gray-900">
                  Yield History
                </Link>
                <Link href="/desease/all" className="block px-4 py-2 text-white hover:bg-gray-900">
                  Pest History
                </Link>
                <Link href="/weather/all" className="block px-4 py-2 text-white hover:bg-gray-900">
                  Weather Reports
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <p className="font-semibold text-white">Welcome!</p>
            <button
              onClick={handleLogout}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Log out
              </span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 font-semibold">
            <Link href="/login">
              <button className="text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-300">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Get Started
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;