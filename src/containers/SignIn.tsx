import type { SubmitHandler } from "react-hook-form";
import type { ChangeEvent } from "react";

import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import { account, token } from "@/lib/stores";
import { trpc } from "@/lib/trpc";
import Input from "@/components/Input";

/**
 * FormValues is an object with a username property that's a string, a password property that's a
 * string, and a confirm property that's a string.
 * @property {string} username - The username of the user.
 * @property {string} password - The password the user entered.
 * @property {string} confirm - The value of the confirm password field.
 */
type FormValues = {
	username: string;
	password: string;
	confirm: string;
};

/**
 * `SignInPage` is a component that creates a sign-in form, sends a mutation to a server, 
 * redirects on success, and returns errors.
 * @returns A form that allows the user to sign-in.
 */
export default function SignIn() {
	const methods = useForm<FormValues>();
	const [isCheckedPass, setIsCheckedPass] = useState(false);
	const router = useRouter();
	const $account = useStore(account);
	const mutation = trpc.auth.signin.useMutation({
		onSuccess: (data) => {
			router.push("/");

			account.set(data.user.username);
			token.set(data.token);
		},
		onError: (error) => {
			if (error.data?.code === "BAD_REQUEST") {
				methods.setError("username", {
					type: "custom",
					message: error.message
				});
				return;
			}
		}
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsCheckedPass(event.target.checked);
	};

	const addUser: SubmitHandler<FormValues> = async (data) => {
		const { username, password, confirm } = data;

		if (username === "undefined" || username === "null") {
			methods.setError("username", {
				type: "custom",
				message: "You can not name yourself \"undefined\" or \"null\"."
			});
			return;
		}

		if (confirm !== password) {
			methods.setError("confirm", {
				type: "custom",
				message: "Passwords do not match."
			});
			return;
		}

		mutation.mutate({ 
			username: username, 
			password: password 
		});
	};

	useEffect(() => {
		if ($account !== "") {
			router.push("/");
			return;
		}
	});

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