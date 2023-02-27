import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { useStore } from "@nanostores/react";
import { useState, useEffect } from "react";
import Link from "next/link";

import { theme, account } from "../lib/stores";
import Avatar from "../components/Avatar";

function Menu() {
	const $account = useStore(account);
	const [menu, setMenu] = useState(<></>);

	useEffect(() => {
		if ($account === "") {
			setMenu(
				<>
					<li>
						<Link href="/signin" as="/signin">
							<span className="font-semibold no-underline">Signin</span>
						</Link>
					</li>
					<li>
						<Link href="/login" as="/login">
							<span className="font-semibold no-underline">Login</span>
						</Link>
					</li>
				</>
			);
		} else {
			setMenu(
				<>
					<li>
						<Link href="/play" as="/play">
							<span className="font-semibold no-underline">Play</span>
						</Link>
					</li>
					<li>
						<Link href="/user/[username]" as={`/user/${$account}`}>
							<span className="font-semibold no-underline">Profile</span>
						</Link>
					</li>
					<li>
						<Link href="/signout" as="/signout">
							<span className="font-semibold no-underline">Signout</span>
						</Link>
					</li>
				</>
			);
		}
	}, [$account]);

	return menu;
}

/**
 * It renders a navbar with a logo, a theme toggle, and a profile picture
 * @returns A navbar with a link to the home page and a toggle for the theme.
 */
export default function Navbox() {
	const $theme = useStore(theme);
	const $account = useStore(account);
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
					<Link className="btn btn-ghost text-red-600" href="/" as="/">
						<h2>Blood Alchemy</h2>
					</Link>
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

						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle">
								<Avatar username={$account} />
							</label>
							<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52">
								<Menu />
							</ul>
						</div>
					</ul>
				</div>
			</nav>
		</div>
	);
}