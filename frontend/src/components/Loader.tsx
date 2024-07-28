import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loader() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <FaSpinner className="animate-spin text-4xl" />
        </div>
    );
}
