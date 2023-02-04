import type { SubmitHandler } from "react-hook-form";

import { ChangeEvent, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useStore } from "@nanostores/react";

import { account, token } from "../../scripts/stores";
import Input from "../Input";

type FormValues = {
	username: string;
	password: string;
};

export default function LogIn() {
	const methods = useForm<FormValues>();
	const [isCheckedPass, setIsCheckedPass] = useState(false);
	const $account = useStore(account);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsCheckedPass(event.target.checked);
	};

	const registerUser: SubmitHandler<FormValues> = async (data) => {
		console.log(data);

		const result = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				"username": data.username,
				"password": data.password
			})
		});

		if (result.status === 404) {
			methods.setError("username", {
				type: "custom",
				message: `Account "${data.username}" doesn't exist.`
			});
			return;
		}

		if (result.status === 401) {
			methods.setError("password", {
				type: "custom",
				message: "The password is incorrect."
			});
			return;
		}

		if (result.status === 200) {
			const rjson = await result.json();

			console.log(rjson);

			account.set(data.username);
			token.set(rjson.token);

			window.location.href = "/";
		}
	};

	if ($account === "") {
		return (
			<>
				<center>
					<h1 className="text-center font-extrabold py-5">Login</h1>

					<div className="card w-96 bg-base-300 shadow-xl">
						<FormProvider {...methods} >
							<form onSubmit={methods.handleSubmit(registerUser)}>
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

									<label className="label cursor-pointer">
										<span className="label-text">Reveal password</span>
										<input
											type="checkbox"
											className="checkbox"
											checked={isCheckedPass}
											onChange={(e) => handleChange(e)}
										/>
									</label><br />

									<button className="btn btn-primary" type="submit">
                                        Login
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