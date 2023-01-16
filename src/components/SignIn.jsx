import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
// import { scryptSync, randomBytes } from 'crypto'
import Alert from "./Alert";

export default function SignIn() {
    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");

    const addUser = useCallback(async (data) => {
        try {
            const result = await fetch(`/api/users?username=${data.username}`, {
                method: "GET",
            });

            if (result.status === 404) {
                setResult(
                    <Alert level="success">
                        Account with username "{data.username}" doesn't exist.
                    </Alert>
                )
                return;
            } else {
                setResult(
                    <Alert level="warning">
                        Account with username "{data.username}" exists.
                    </Alert>
                )
                return;
            }
        } catch (error) {
            setResult(
                <Alert level="error">
                    {error.toString()}
                </Alert>
            )
        }

        /*
        TBA IN THE NEXT DAY 

        const salt = randomBytes(16).toString("hex")
        const getHash = (password) => scryptSync(password, salt, 32).toString("hex");

        await prisma.users.create({
            data: {
                username: username,
                password: getHash(password),
                elements: [],
                watts: 0,
                salt: salt
            }
        });
        */
    });

    return (
        <>
            <center>
                <div className="card w-96 bg-base-300 shadow-xl">
                    <div className="card-body">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your username?</span>
                            </label>
                            <input
                                {...register("username")}
                                type="text"
                                placeholder="Username"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your password?</span>
                            </label>
                            <input
                                {...register("password")}
                                type="text"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div><br />

                        {result}<br />

                        <button className="btn btn-primary" onClick={handleSubmit(addUser)} type="submit">
                            Signin
                        </button>
                    </div>
                </div>
            </center>
        </>
    )
}