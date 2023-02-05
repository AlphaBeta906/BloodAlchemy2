import type { element } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";

import ElemBox from "@/components/ElementBox";
import QueryWrapper from "@/components/QueryWrapper";
import Loader from "@/components/Loader";

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

	const elemList = data.map((element: element) => {
		return (
			<>
				<span className="font-mono px-2 py-1 flex items-center" key={element.id.toString()}>
					{`${element.id}: `}
					<a className="inline-block no-underline" href={`/element/${element.name}`}>
						<ElemBox body={element} width={50} />
					</a>
				</span>
			</>
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