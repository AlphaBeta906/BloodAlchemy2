import type { ReactNode } from "react";

/**
 * `Props` is an object with a `code` property that is a string and an optional `children` property
 * that is a ReactNode.
 * @property {string} code - The code to be highlighted.
 * @property {ReactNode} children - The children of the component.
 */
type Props = {
	code: string;
	children?: ReactNode;
};

/**
 * It renders a full-screen error message with a title and a message
 * @param {Props} props - The props that are passed to the component.
 * @returns A error message
 */
export default function ErrorMessage({ code, children }: Props) {
	return (
		<div className="hero h-[calc(100vh-4rem)]">
			<div className="hero-content text-center">
				<div className="max-w-md flex-1">
					<h1 className="text-5xl font-bold text-error">{code}</h1>
					<p className="py-6">{children}</p>
					<a href="/"><button className="btn btn-primary">Go home?</button></a>
				</div>
			</div>
		</div>
	);
}