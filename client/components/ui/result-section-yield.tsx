import React, { ReactNode, useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { IconReportSearch } from '@tabler/icons-react';

interface ResultProps {
    result: ReactNode;
    unit: ReactNode;
    title: string;
    description: string;
    url: string;
}

export function ResultSectionYield({ result, unit, title, description, url }: ResultProps) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleRefresh = () => {
        window.location.reload();
    };

    const openModal = () => setIsOpen(true);

    const closeModal = () => {
        setIsOpen(false);
        handleRefresh();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button onClick={openModal} className="py-2 px-4 bg-blue-500 text-white rounded">
                <IconReportSearch size={25} color='white' />
            </button>

            {isOpen && (
                <div id="info-popup" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-lg h-auto" ref={modalRef}>
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                            <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                                <p>
                                    {description}
                                </p>
                                <p className="text-xl font-bold">{result} {unit}</p>
                            </div>
                            <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                                <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                                    <button
                                        id="close-modal"
                                        type="button"
                                        onClick={closeModal}
                                        className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        Try again
                                    </button>
                                    <Link href={url}>
                                        <button
                                            id="confirm-button"
                                            type="button"
                                            className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            See Result History
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
