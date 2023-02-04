import { useFormContext } from "react-hook-form";

type Props = {
	label: string;
	name: string;
	type: string;
	placeholder: string;
};

/**
 * It's a form input that uses the useFormContext hook to register itself with the form, and then
 * displays any errors that are returned from the form
 * @returns A form input component that is being used in the form.
 */
export default function Input({ label, name, type, placeholder }: Props) {
	const { register, formState: { errors } } = useFormContext();

	return (
		<>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">{label}</span>
				</label>
				<input
					{...register(name, { required: "This is required." })}
					type={type}
					placeholder={placeholder}
					className="input input-bordered w-full max-w-xs"
					aria-invalid={errors[name] ? "true" : "false"}
				/>
				{errors[name] && 
					<label className="label">
						<span className="label-text-alt text-red-500">
							{errors[name]?.message?.toString()}
						</span>
					</label>
				}
			</div>
		</>
	);
}