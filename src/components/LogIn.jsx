import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useStore } from '@nanostores/react';

import { account } from "../scripts/stores";

export default function LogIn() {
    const { register, formState: { errors }, setError, handleSubmit } = useForm();
    const [isCheckedPass, setIsCheckedPass] = useState(false);
    const $account = useStore(account);

    const handleChange = (event) => {
        setIsCheckedPass(event.target.checked);
    }

    const registerUser = useCallback(async (data) => {
        console.log(data)

        const result = await fetch(`/api/users?username=${data.username}`, {
            method: "GET"
        });

        if (result.status === 204) {
            setError("username", {
                type: "custom",
                message: `An account with the username of ${data.username} doesn't exist.`
            })
            return;
        }

        const rjson = await result.json()

        console.log(rjson)

        const result2 = await fetch(`/api/hash?password=${data.password}&salt=${rjson.salt}`, {
            method: "GET"
        });

        const rjson2 = await result2.json()

        console.log(rjson2)

        if (rjson2.password !== rjson.password) {
            setError("password", {
                type: "custom",
                message: `Password is incorrect.`
            })
            return;
        }

        account.set(data.username)
        window.location.href = "/"
    })

    if ($account === "") {
        return (
            <>
                <center>
                    <h1 className="text-center font-extrabold py-5">Login</h1>

                    <div className="card w-96 bg-base-300 shadow-xl">
                        <div className="card-body">
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">What is your username?</span>
                                </label>
                                <input
                                    {...register("username", { required: "This is required." })}
                                    type="text"
                                    placeholder="Username"
                                    className="input input-bordered w-full max-w-xs"
                                    aria-invalid={errors.username ? "true" : "false"}
                                />
                                {errors.username &&
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">
                                            {errors.username.message}
                                        </span>
                                    </label>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">What is your password?</span>
                                </label>
                                <input
                                    {...register("password", { required: "This is required." })}
                                    type={isCheckedPass ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs"
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                                {errors.password &&
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">
                                            {errors.password.message}
                                        </span>
                                    </label>}
                            </div>
                            <label className="label cursor-pointer">
                                <span className="label-text">Reveal password</span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={isCheckedPass}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label><br />

                            <button className="btn btn-primary" onClick={handleSubmit(registerUser)} type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </center>
            </>
        )
    } 
    
    window.location.href = "/"
}