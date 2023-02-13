import { useStore } from "@nanostores/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { account, token } from "@/lib/stores";

/**
 * `SignOutPage` is a component that creates a sign-out button, deletes the token 
 * and account atoms, and redirects on success.
 * @returns A alert that allows the user to sign-out.
 */
export default function SignOutPage() {
	const router = useRouter();
	const $account = useStore(account);

	const signOutUser = async () => {
		account.set("");
		token.set("");

		router.push("/");
	};

	useEffect(() => {
		if ($account === "") {
			router.push("/");
			return;
		}
	});

	if ($account !== "") {
		return (
			<>
				<center>
					<h1 className="text-center font-extrabold py-5">Signout</h1>

					<div className="card w-96 bg-base-300 shadow-xl">
						<div className="card-body">
							<p>Are you sure you want to sign out?</p><br />

							<button className="btn btn-primary" onClick={signOutUser}>Sign Out</button>
						</div>
					</div>
				</center>
			</>
		);
	}

	return null;
}