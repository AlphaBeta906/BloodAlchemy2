import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import Link from "next/link";

import ErrorMessage from "@/components/ErrorMessage";
import ElemBox from "@/components/ElemBox";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";

type Props = {
	name: string;
}

export default function ElementPage({ name }: Props): JSX.Element {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch(`/api/element?name=${name}`);

			if (result.status === 404) {
				return 404;
			}

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

	if (data === 404) {
		return (
			<ErrorMessage code="404">
				This element does not exist.
			</ErrorMessage>
		);
	}

	const date = DateTime.fromJSDate(new Date(data.date_of_creation)).toLocaleString(DateTime.DATETIME_FULL);

	return (
		<>
			<center className="p-10">
				<ElemBox body={data} width={100} />
			</center>

			<div className="mx-10">
				<div className="mb-1.5"><b>ID:</b> #{data.id}</div>
				<div className="mb-1.5"><b>Generation:</b> {data.generation}</div>
				<div className="mb-1.5"><b>Complexity:</b> {data.complexity}</div>
				<div className="flex items-center mb-1.5">
					<b>Creator:</b>&nbsp;<Avatar username={data.creator} width={28} />&nbsp;<Link href={`/user/${data.creator}`} as={`/user/${data.creator}`} className="text-blue-600 dark:text-blue-500">{data.creator}</Link>
				</div>
				<div className="mb-1.5"><b>Date of Creation:</b> {date}</div>
			</div>
		</>
	);
}