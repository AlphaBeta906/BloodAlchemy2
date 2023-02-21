import type { element } from "@prisma/client";

import { useStore } from "@nanostores/react";
import { DndContext } from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import { z } from "zod";

import { account } from "@/lib/stores";
import { trpc } from "@/lib/trpc";
import ElemBox from "@/components/ElemBox";
import Loader from "@/components/Loader";
import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";

export default function PlayPage() {
	const $account = useStore(account);
	const [parent, setParent] = useState<null | ReactNode>(null);
	const [isDragging, setIsDragging] = useState(false);

	const { error, status, data } = trpc.user.getElems.useQuery({
		username: $account
	});

	if (error) {
		return (
			<>
				Returned error: {error?.data?.code}
			</>
		);
	}

	if (status !== "success") return <Loader />;

	const elems = data
		.filter((element: element | null): element is element => element !== null)
		.map((element: element) => {
			return (
				<Draggable key={element.id.toString()} id={element.id.toString()}>
					<ElemBox color={element.color} name={element.name} />
				</Draggable>
			);
		});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleDragEnd(event: any) {
		const { over, active } = event;

		if (!active || !over) {
			setParent(parent ? parent : null);
			setIsDragging(false);
			return;
		} 

		const schema = z.object({
			name: z.string(),
			color: z.string()
		});

		// Had to use Zod because TS wasn't working - Feb 21, 2023
		const parsed = schema.safeParse(data?.[active.id - 1]);

		if (!parsed.success) return;

		setParent(
			<ElemBox name={parsed.data.name} color={parsed.data.color} />
		);
		setIsDragging(false);
	}

	return (
		<>
			<DndContext 
				onDragStart={() => setIsDragging(true)}
				onDragCancel={() => setIsDragging(false)}
				onDragEnd={handleDragEnd}
			>
				<center>
					<Droppable>
						<div className={`w-[150px] h-[150px] border-4 bg-base-300 rounded-md m-4 grid place-items-center ${isDragging ? "border-transparent" : "border-base-200"}`}>
							{parent}
						</div>
					</Droppable>

					<div className="grid grid-cols-4 gap-4 w-[48rem] p-4 rounded-md bg-base-300 m-5">
						{elems}
					</div>
				</center>
			</DndContext>
		</>
	);
}