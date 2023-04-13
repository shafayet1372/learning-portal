import React, { Children } from "react";

function NoVideoError({ children, isLoading }) {
    return (
        <div className="flex items-center justify-center h-screen bg-white" style={{ height: '500px', backgroundColor: 'white' }}>
            {!isLoading && <svg
                className="w-12 h-12 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>}
            <div className="text-gray-800" style={{ color: 'black' }}>
                {children}
            </div>
        </div>
    );
}

export default NoVideoError;
