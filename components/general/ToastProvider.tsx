"use client";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconCheck from "../icons/IconCheck";
import { ReactNode } from "react";
import IconAlertTriangle from "../icons/IconAlertTriangle";

type CustomToastProps = {
    message: string;
    bgColor: string;
    colorIcon: string;
    icon: ReactNode;
};

export function showSuccessToast(message: string) {
    toast(
        <CustomToast
            message={message}
            bgColor="bg-green-300"
            colorIcon="text-primary"
            icon={<IconCheck />}
        />,
        {
            closeButton: false,
            className: "!p-0 !bg-transparent !shadow-none !border-0",
        }
    );
}

export function showErrorToast(message: string) {
    toast(
        <CustomToast
            message={message}
            bgColor="bg-red-200"
            colorIcon="text-red"
            icon={<IconAlertTriangle />}
        />,
        {
            closeButton: false,
            className: "!p-0 !bg-transparent !shadow-none !border-0",
        }
    );
}


function CustomToast({ message, bgColor, colorIcon, icon }: CustomToastProps) {
    return (
        <div className={`w-full rounded-full px-6 py-3 shadow-lg flex items-center gap-6 ${bgColor} ${colorIcon}`}>
            <div className={colorIcon}>
                {icon}
            </div>
            <p className="leading-tight">{message}</p>
        </div>
    );
}

export default function ToastProvider() {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="light"
            transition={Slide}
            toastClassName={() =>
                "!p-0 !bg-transparent !shadow-none !border-0 !min-h-0 w-full"
            }
        />
    );
}