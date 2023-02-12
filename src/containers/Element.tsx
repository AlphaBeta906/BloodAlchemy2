import { DateTime } from "luxon";
import Link from "next/link";

import { trpc } from "@/lib/trpc";
import ErrorMessage from "@/components/ErrorMessage";
import ElemBox from "@/components/ElemBox";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";

type Props = {
	name: string;
}

export default function ElementPage({ name }: Props) {
	const { error, status, data } = trpc.element.byName.useQuery({
		name: name
	});

	if (error) {
		if (error.data?.code === "NOT_FOUND") {
			return (
				<ErrorMessage code="404">
					This element does not exist.
				</ErrorMessage>
			);
		}
	}

	if (status !== "success") return <Loader />;

	const date = DateTime.fromJSDate(new Date(data.date_of_creation)).toLocaleString(DateTime.DATETIME_FULL);

	return (
		<>
			<center className="p-10">
				<ElemBox name={data.name} color={data.color} width={100} />
			</center>

			<div className="mx-10">
				<div className="mb-1.5"><b>ID:</b>{` #${data.id}`}</div>
				<div className="mb-1.5"><b>Generation:</b>{` ${data.generation}`}</div>
				<div className="mb-1.5"><b>Complexity:</b>{` ${data.complexity}`}</div>
				<div className="flex items-center mb-1.5">
					<b>Creator:</b>&nbsp;<Avatar username={data.creator} width={28} />&nbsp;<Link href={`/user/${data.creator}`} as={`/user/${data.creator}`} className="text-blue-600 dark:text-blue-500">{data.creator}</Link>
				</div>
				<div className="mb-1.5"><b>Date of Creation:</b> {date}</div>
			</div>
		</>
	);
}