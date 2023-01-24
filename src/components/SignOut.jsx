import { useCallback } from "react";
import { useStore } from "@nanostores/react";
import { account } from "../scripts/stores";

export default function SignOut() {
	const $account = useStore(account);

	const signOutUser = useCallback(async () => {
		account.set("");

		window.location.href = "/";
	});

	console.log($account === "");

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

	window.location.href = "/";
}