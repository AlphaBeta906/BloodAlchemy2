import { useFormContext } from "react-hook-form";

/**
 * It's a form input that uses the useFormContext hook to register itself with the form, and then
 * displays any errors that are returned from the form
 * @returns A form input component that is being used in the form.
 */
export default function Input(props) {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input
                {...register(props.name, { required: "This is required." })}
                type={props.type}
                placeholder={props.placeholder}
                className="input input-bordered w-full max-w-xs"
                aria-invalid={errors[props.name] ? "true" : "false"}
            />
            {errors[props.name] &&
                <label className="label">
                    <span className="label-text-alt text-red-500">
                        {errors[props.name]["message"]}
                    </span>
                </label>}
        </div>
    )
}