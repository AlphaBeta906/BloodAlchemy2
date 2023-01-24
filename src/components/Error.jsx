import PropTypes from "prop-types";
/**
 * It returns a div with a class of hero, which contains a div with a class of hero-content, which
 * contains a div with a class of max-w-md flex-1, which contains an h1 with a class of text-5xl
 * font-bold text-error, which contains the value of the code prop, which is followed by a p with a
 * class of py-6, which contains the value of the children prop, which is followed by an a tag with an
 * href of /, which contains a button with a class of btn btn-primary, which contains the text "Go
 * home?"
 * @returns A React component
 */
export default function Error({ code, children }) {
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

Error.propTypes = {
	code: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};