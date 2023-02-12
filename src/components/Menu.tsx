import Link from "next/link";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

import { account } from "@/lib/stores";

/**
 * It renders a menu depending on the account
 * @returns A menu
 */
export default function Menu() {
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
	}, []);

	return menu;
}