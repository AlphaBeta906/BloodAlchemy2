import { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

export default function Element({ name }) {
	const [result, setResult] = useState(async () => {
		const result = await fetch(`/api/element?name=${name}`, {
			method: "GET"
		});

		setResult(result.status);
	});

	if (result === 204) {
		return (
			<Error code="404">
                This element does not exist.
			</Error>
		);
	} else if (result === 200) {
		return (
			<Error code="200">
                This element exists!
			</Error>
		);
	} else {
		return (
			<Error code="500">
                The server died.
			</Error>
		);
	}
}

Element.propTypes = {
	name: PropTypes.string.isRequired
};