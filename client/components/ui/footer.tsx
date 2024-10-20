import React from "react";
import Image from "next/image";
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-transparent rounded-lg shadow-none dark:bg-transparent m-4">
        <div className="w-full mx-auto p-3 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/" className="hover:text-neon-blue flex h-8 items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <Image 
                        src="/logo.png"
                        alt="kumbura logo"
                        width={150}
                        height={150}
                    />
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:underline">Contact</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="#" className="hover:underline">Kumbura™</Link>. All Rights Reserved.</span>
        </div>
    </footer>
  )
}

export default Footer
