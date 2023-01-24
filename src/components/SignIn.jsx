import { useState, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { useForm, FormProvider } from "react-hook-form";

import { account } from "../scripts/stores";
import Input from "./Input";

export default function SignIn() {
	const methods = useForm();
	const [isCheckedPass, setIsCheckedPass] = useState(false);
	const $account = useStore(account);

	const handleChange = (event) => {
		setIsCheckedPass(event.target.checked);
	};

	const addUser = useCallback(async (data) => {
		if (data.username === "undefined" || data.username === "null") {
			methods.setError("username", {
				type: "custom",
				message: "You can not name yourself \"undefined\" or \"null\"."
			});
			return;
		}

		if (data.confirm !== data.password) {
			methods.setError("confirm", {
				type: "custom",
				message: "Passwords do not match."
			});
			return;
		}

		const result = await fetch(`/api/user?username=${data.username}`, {
			method: "GET"
		});

		if (result.status === 200) {
			methods.setError("username", {
				type: "custom",
				message: `An account with the username of ${data.username} exists.`
			});
			return;
		}

		const result2 = await fetch("/api/user", {
			method: "POST",
			body: JSON.stringify({
				"username": data.username,
				"password": data.password
			})
		});

		if (result2.status === 201) {
			account.set(data.username);
			window.location.href = "/";
		}
	});

	if ($account === "") {
		return (
			<>
				<center>
					<h1 className="text-center font-extrabold py-5">Signin</h1>

					<div className="card w-96 bg-base-300 shadow-xl">
						<FormProvider {...methods} >
							<form onSubmit={methods.handleSubmit(addUser)}>
								<div className="card-body">
									<Input
										name="username"
										label="What is your username?"
										type="text"
										placeholder="Username"
									/>
									<Input
										name="password"
										label="What is your password?"
										type={isCheckedPass ? "text" : "password"}
										placeholder="Password"
									/>
									<Input
										name="confirm"
										label="Please repeat your password here."
										type={isCheckedPass ? "text" : "password"}
										placeholder="Password"
									/>

									<label className="label cursor-pointer">
										<span className="label-text">Reveal passwords</span>
										<input
											type="checkbox"
											className="checkbox"
											checked={isCheckedPass}
											onChange={(e) => handleChange(e)}
										/>
									</label><br />

									<button className="btn btn-primary" type="submit">
										Signin
									</button>
								</div>
							</form>
						</FormProvider>
					</div>
				</center>
			</>
		);
	}

	window.location.href = "/";
}