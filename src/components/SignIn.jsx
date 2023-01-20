import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Alert from "./Alert";

export default function SignIn() {
    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const [isCheckedPass, setIsCheckedPass] = useState(false);
    const [isCheckedRemember, setIsCheckedRemember] = useState(false);

    const handleChange = (event, id) => {
        switch (id) {
            case 'pass':
                setIsCheckedPass(event.target.checked);
                break;
            case 'remember':
                setIsCheckedRemember(event.target.checked);
                break;
            default:
                break;
        }
    }

    const addUser = useCallback(async (data) => {
        console.log(data)

        if (data.username === "undefined" || data.username === "null") {
            setResult(
                <Alert level="warning">
                    For technical reasons, you can not name yourself "undefined" or "null".
                </Alert>
            )
        }

        if (data.confirm !== data.password) {
            setResult(
                <Alert level="error">
                    Passwords do not match, please try again.
                </Alert>
            )
        }

        const result = await fetch(`/api/users?username=${data.username}`, {
            method: "GET"
        });

        if (result.status === 200) {
            setResult(
                <Alert level="warning">
                    Account with username "{data.username}" exists.
                </Alert>
            )
            return;
        }

        const result2 = await fetch(`/api/users`, {
            method: "POST",
            body: JSON.stringify({
                "username": data.username,
                "password": data.password
            })
        });

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
                                type={isCheckedPass ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Please repeat your password here.</span>
                            </label>
                            <input
                                {...register("confirm")}
                                type={isCheckedPass ? "text" : "password"}
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div><br />

                        <label className="label cursor-pointer">
                            <span className="label-text">Reveal passcodes</span>
                            <input 
                                type="checkbox" 
                                className="checkbox" 
                                checked={isCheckedPass}
                                onChange={(e) => handleChange(e, 'pass')}
                            />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="label-text">Remember me</span>
                            <input 
                                type="checkbox" 
                                className="checkbox" 
                                checked={isCheckedRemember}
                                onChange={(e) => handleChange(e, 'remember')}
                            />
                        </label>

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