import { useQuery } from "@tanstack/react-query";
import { element } from "@prisma/client";

import ElemBox from "@/components/ElementBox";
import Loader from "@/components/Loader";

export default function ElementsPage() {
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
		// TODO: Fix this mess of a map - February 4, 2023
		
		return (
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<div className="font-mono px-2 py-1 flex items-center" key={element.id.toString()}>
				#{element.id}:&thinsp;<a
					className="inline-block"
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