import type { SubmitHandler } from "react-hook-form";

import { ChangeEvent, useState } from "react";
import { useStore } from "@nanostores/react";
import { useForm, FormProvider } from "react-hook-form";

import { account, token } from "@/lib/stores";
import Input from "@/components/Input";

type FormValues = {
	username: string;
	password: string;
	confirm: string;
};

export default function SignIn() {
	const methods = useForm<FormValues>();
	const [isCheckedPass, setIsCheckedPass] = useState(false);
	const $account = useStore(account);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsCheckedPass(event.target.checked);
	};

	const addUser: SubmitHandler<FormValues> = async (data) => {
		console.log(data.password);

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

		const result = await fetch("/api/signin", {
			method: "POST",
			body: JSON.stringify({
				"username": data.username,
				"password": data.password
			})
		});

		if (result.status === 400) {
			methods.setError("username", {
				type: "custom",
				message: `An account "${data.username}" exists.`
			});
			return;
		}

		if (result.status === 201) {
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