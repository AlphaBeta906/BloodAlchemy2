import type { ReactNode } from "react";

type Props = {
	code: string;
	children?: ReactNode;
};

/**
 * It returns a div with a class of hero, which contains a div with a class of hero-content, which
 * contains a div with a class of max-w-md flex-1, which contains an h1 with a class of text-5xl
 * font-bold text-error, which contains the code prop, which contains a p with a class of py-6, which
 * contains the children prop, which contains an a with an href of /, which contains a button with a
 * class of btn btn-primary, which contains the text "Go home?"
 * @returns A div with a class of hero h-[calc(100vh-4rem)]
 */
export default function Error({ code, children }: Props) {
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