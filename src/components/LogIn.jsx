import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useStore } from '@nanostores/react';

import { account } from "../scripts/stores";
import Input from "./Input";

export default function LogIn() {
    const methods = useForm();
    const [isCheckedPass, setIsCheckedPass] = useState(false);
    const $account = useStore(account);

    const handleChange = (event) => {
        setIsCheckedPass(event.target.checked);
    }

    const registerUser = useCallback(async (data) => {
        console.log(data)

        const result = await fetch(`/api/user?username=${data.username}`, {
            method: "GET"
        });

        if (result.status === 204) {
            methods.setError("username", {
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
            methods.setError("password", {
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
        )
    } 
    
    window.location.href = "/"
}