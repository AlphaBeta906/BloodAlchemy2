import React from 'react';
import { IoAlertCircleOutline, IoBeerOutline } from 'react-icons/io5';
import { IoWarningOutline } from 'react-icons/io5';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

function getIcon(level) {
    switch (level) {
        case "error":
            return <IoAlertCircleOutline className="w-auto h-6 shrink-0" />;
        case "warning":
            return <IoWarningOutline className="w-auto h-6 shrink-0" />;
        case "info":
            return <IoInformationCircleOutline className="w-auto h-6 shrink-0" />;
        case "success":
            return <IoCheckmarkCircleOutline className="w-auto h-6 shrink-0" />;
        default:
            return <IoBeerOutline className="w-auto h-6 shrink-0" />;
    }
}

function getClass(level) {
    switch (level) {
        case "error":
            return "alert-error";
        case "warning":
            return "alert-warning";
        case "info":
            return "alert-info";
        case "success":
            return "alert-success";
        default:
            return "";
    }
}

export default function Alert(props) {
    return (
        <div className={`alert ${getClass(props.level)} shadow-lg`}>
            <div>
                {getIcon(props.level)}
                <span>
                    {props.children}
                </span>
            </div>
        </div>
    )
}