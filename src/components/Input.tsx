import { useFormContext } from "react-hook-form";

/**
 * Props is an object with a label, name, type, and placeholder property, all of which are strings.
 * @property {string} label - The label for the input field.
 * @property {string} name - The name of the input field.
 * @property {string} type - The type of input. This can be text, password, email, etc.
 * @property {string} placeholder - The placeholder text that will appear in the input field.
 */
type Props = {
	label: string,
	name: string,
	type: string,
	placeholder: string
};

/**
 * It's a function that takes in a label, name, type, and placeholder, and returns a form input with a
 * label, input, and error message
 * @param {Props} props - React props
 * @returns A React component.
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