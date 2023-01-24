import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Error from "./Error";
import ElemBox from "./ElementBox";

export default function Element({ name }) {
	const [status, setStatus] = useState(null);
	const [body, setBody] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const result = await fetch(`/api/element?name=${name}`, {
			method: "GET"
		});

		setStatus(result.status);

		const rjson = await result.json();

		setBody(rjson);
		setIsLoading(false);
	};

	if (!isLoading) {
		if (status === 204) {
			return (
				<Error code="404">
					This element does not exist.
				</Error>
			);
		} else if (status === 200) {
			return (
				<>
					<center className="p-10">
						<ElemBox body={body} width={100} />
					</center>
				</>
			);
		} else {
			return (
				<Error code="500">
					The server died.
				</Error>
			);
		}
	}
}

Element.propTypes = {
	name: PropTypes.string.isRequired
};