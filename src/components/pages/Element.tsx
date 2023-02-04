import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import ErrorMessage from "../ErrorMessage";
import ElemBox from "../ElementBox";
import Avatar from "../Avatar";
import QueryWrapper from "../QueryWrapper";
import Loader from "../Loader";

type Props = {
	name: string;
}

function Body({ name }: Props): JSX.Element {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch(`/api/element?name=${name}`);

			if (result.status === 204) {
				return 204;
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

	if (data === 204) {
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
					<b>Creator:</b>&thinsp;&thinsp;<Avatar username={data.creator} width={28} />&thinsp;&thinsp;{data.creator}
				</div>
				<div className="mb-1.5"><b>Date of Creation:</b> {date}</div>
			</div>
		</>
	);
}

export default function Element({ name }: Props) {
	return (
		<QueryWrapper>
			<Body name={name} />
		</QueryWrapper>
	);
}