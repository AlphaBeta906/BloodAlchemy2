import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useStore } from '@nanostores/react';

import { account } from "../scripts/stores";

export default function SignIn() {
    const { register, formState: { errors }, setError, handleSubmit } = useForm();
    const [isCheckedPass, setIsCheckedPass] = useState(false);
    const $account = useStore(account);

    const handleChange = (event) => {
        setIsCheckedPass(event.target.checked);    
    }

    const addUser = useCallback(async (data) => {
        if (data.username === "undefined" || data.username === "null") {
            setError("username", { 
                type: "custom", 
                message: 'You can not name yourself "undefined" or "null".'
            })
            return;
        }

        if (data.confirm !== data.password) {
            setError("confirm", { 
                type: "custom", 
                message: "Passwords do not match."
            })
            return;
        }

        const result = await fetch(`/api/user?username=${data.username}`, {
            method: "GET"
        });

        if (result.status === 200) {
            setError("username", { 
                type: "custom", 
                message: `An account with the username of ${data.username} exists.`
            })
            return;
        }

        const result2 = await fetch(`/api/user`, {
            method: "POST",
            body: JSON.stringify({
                "username": data.username,
                "password": data.password
            })
        });

        if (result2.status === 201) {
            account.set(data.username)
            window.location.href = "/"
        }
    });

    if ($account === "") {
        return (
            <>
                <center>
                    <h1 className="text-center font-extrabold py-5">Signin</h1>

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
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Please repeat your password here.</span>
                                </label>
                                <input
                                    {...register("confirm", { required: "This is required." })}
                                    type={isCheckedPass ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs"
                                    aria-invalid={errors.confirm ? "true" : "false"} 
                                />
                                {errors.confirm && 
                                <label className="label">
                                    <span className="label-text-alt text-red-500">
                                        {errors.confirm.message}
                                    </span>
                                </label>}
                            </div>

                            <label className="label cursor-pointer">
                                <span className="label-text">Reveal passwords</span>
                                <input 
                                    type="checkbox" 
                                    className="checkbox" 
                                    checked={isCheckedPass}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label><br />

                            <button className="btn btn-primary" onClick={handleSubmit(addUser)} type="submit">
                                Signin
                            </button>
                        </div>
                    </div>
                </center>
            </>
        )
    } 
    
    window.location.href = "/"
}