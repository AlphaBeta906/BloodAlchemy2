import type TElement from "../../scripts/types/Element";

import { useQuery } from "@tanstack/react-query";

import ElemBox from "../ElementBox";
import QueryWrapper from "../QueryWrapper";
import Loader from "../Loader";

function Base() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch("/api/element");

			const rjson = result.json();

			return rjson;
		}
	});

	if (isLoading) return <Loader />;

	if (error instanceof Error) return (
		<>
			An error has occurred: {error.message}
		</>
	);

	const elemList = data.map((element: TElement) => {
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

// I really hate Astro in this part - Jan 30, 2023
export default function Elements() {
	return (
		<QueryWrapper>
			<Base />
		</QueryWrapper>
	);
}