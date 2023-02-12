import type { SubmitHandler } from "react-hook-form";
import type { ChangeEvent } from "react"; 

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/router";

import { account, token } from "@/lib/stores";
import Input from "@/components/Input";
import { trpc } from "@/lib/trpc";

type FormValues = {
	username: string;
	password: string;
};

export default function LoginPage() {
	const methods = useForm<FormValues>();
	const [isCheckedPass, setIsCheckedPass] = useState(false);
	const router = useRouter();
	const $account = useStore(account);
	const { mutate, isLoading } = trpc.auth.login.useMutation({
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

			if (error.data?.code === "UNAUTHORIZED") {
				methods.setError("password", {
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

	const registerUser: SubmitHandler<FormValues> = async (form) => {
		const { username, password } = form;

		mutate({
			username: username,
			password: password
		});
	};

	useEffect(() => {
		if ($account !== "") {
			router.push("/");
			return;
		}
	}, []);

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

								<button className="btn btn-primary" type="submit" disabled={isLoading}>
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