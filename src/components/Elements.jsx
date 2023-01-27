import { useState, useEffect } from "react";

import ElemBox from "./ElementBox";

export default function Elements() {
	const [body, setBody] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const result = await fetch("/api/element", {
			method: "GET"
		});

		if (result.status === 200) {
			const rjson = await result.json();

			setBody(rjson);
		}

		setIsLoading(false);
	};

	if (!isLoading) {
		const elemList = body.map(element => {
			return (
				<ElemBox key={element.id} body={element} width={100} />
			);
		});

		return elemList;
	} else {
		return (
			<>
				The bruh?
			</>
		);
	}
}