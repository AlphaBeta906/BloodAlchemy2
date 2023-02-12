import { element } from "@prisma/client";

import ElemBox from "@/components/ElemBox";
import Loader from "@/components/Loader";
import { trpc } from "@/lib/trpc";

export default function ElementsPage() {
	const { error, status, data } = trpc.element.element.useQuery();

	if (error) {
		return (
			<>
				Returned error: {error?.data?.code}
			</>
		);
	}

	if (status !== "success") return <Loader />;

	const elemList = data.map((element: element) => {		
		return (
			<div className="font-mono px-2 py-1 flex items-center" key={element.id.toString()}>
				{`#${element.id}`}:&nbsp;<a
					className="inline-block"
					href={`/element/${element.name}`}
				>
					<ElemBox name={element.name} color={element.color} width={50} />
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