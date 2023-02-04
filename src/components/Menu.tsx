import { useStore } from "@nanostores/react";

import { account } from "../scripts/stores";

export default function Menu() {
	const $account = useStore(account);

	if ($account === "") {
		return (
			<>
				<li>
					<a href="/signin/" className="font-semibold no-underline">
                        Signin
					</a>
				</li>
				<li>
					<a href="/login/" className="font-semibold no-underline">
                        Login
					</a>
				</li>
			</>
		);
	} else {
		return (
			<>
				<li>
					<a href={`/user/${$account}`} className="font-semibold no-underline">
                        Profile
					</a>
				</li>
				<li>
					<a href="/signout/" className="font-semibold no-underline">
                        Signout
					</a>
				</li>
			</>
		);
	}
}