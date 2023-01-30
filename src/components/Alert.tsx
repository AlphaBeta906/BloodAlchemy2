import type { ReactNode } from "react";

import { IoAlertCircleOutline, IoBeerOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

/**
 * It takes a string and returns an icon
 * @returns A React component.
 */
function getIcon(level: string) {
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

/**
 * It takes a string and returns a string
 * @returns The class name for the alert.
 */
function getClass(level: string) {
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

type Props = {
	level: string;
	children?: ReactNode;
}

/**
 * It returns a div with a class of alert, shadow-lg, and the level of the alert, and a div with an
 * icon and the children of the alert
 * @returns A div with a class of alert and shadow-lg.
 */
export default function Alert({ level, children }: Props) {
	return (
		<div className={`alert ${getClass(level)} shadow-lg`}>
			<div>
				{getIcon(level)}
				<span>
					{children}
				</span>
			</div>
		</div>
	);
}