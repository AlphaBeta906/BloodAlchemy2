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
				<div className="font-mono px-2 py-1 flex items-center" key={element.id}>
					#{element.id}:&thinsp;<a
						className="inline-block no-underline"
						href={`/element/${element.name}`}
					>
						<ElemBox body={element} width={50} />
					</a>
				</div>
			);
		});

		return (
			<div className="pt-2">
				{elemList}
			</div>
		);
	}
}