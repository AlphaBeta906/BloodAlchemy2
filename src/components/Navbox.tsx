import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

import ProfilePicture from "./ProfilePicture";
import { theme } from "../lib/stores";

export default function Navbox() {
	const $theme = useStore(theme);
	const checked = ($theme === "dark");

	const toggleTheme = () => {
		theme.set($theme === "dark" ? "light" : "dark");
	};

	useEffect(() => {
		document.querySelector("html")?.setAttribute("data-theme", $theme);
	});

	return (
		<div>
			<nav className="navbar bg-base-300 md:flex">
				<div className="flex-1">
					<a className="btn btn-ghost text-red-600" href="/">
						<h2>Blood Alchemy</h2>
					</a>
				</div>
				<div className="flex-none">
					<ul className="hidden menu p-0 sm:contents">
						<label className="swap swap-rotate btn btn-ghost text-base-content">
							<input
								type="checkbox"
								onClick={toggleTheme}
								defaultChecked={checked}
							/>
							<div className="swap-on w-5">
								<IoMoonSharp className="w-auto h-5 shrink-0" />
							</div>
							<div className="swap-off w-5">
								<IoSunnySharp className="w-auto h-5 shrink-0" />
							</div>
						</label>

						<ProfilePicture />
					</ul>
				</div>
			</nav>
		</div>
	);
}