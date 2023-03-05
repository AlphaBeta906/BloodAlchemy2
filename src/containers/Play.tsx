import type { Element } from "@prisma/client";
import type { ReactNode, ChangeEvent } from "react";

import { useStore } from "@nanostores/react";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { z } from "zod";

import { account } from "@/lib/stores";
import { trpc } from "@/lib/trpc";
import range from "@/lib/range";
import ElemBox from "@/components/ElemBox";
import Loader from "@/components/Loader";
import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";

export default function PlayPage() {
	const $account = useStore(account);
	const [items, setItems] = useState<object>({});
	const [isDragging, setIsDragging] = useState(false);
	const [elems, setElems] = useState<Array<number>>([]);
	const [amount, setAmount] = useState(2);

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

	const elemList = data
		.filter((element: Element | null): element is Element => element !== null)
		.map((element: Element) => {
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
			console.log("wtf");
			setItems(Object.keys(items).length === 0 ? {} : items);
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

		const newElems = [...elems];

		newElems[over.id - 1] = active.id;
		if (Array.from({ length: amount }, (_, index) => elems[index]).every(elem => elem !== undefined)) newElems.sort();

		console.log(newElems);

		setElems(newElems);

		setItems({
			...items,
			[over.id]: <ElemBox name={parsed.data.name} color={parsed.data.color} />
		});
		setIsDragging(false);
	}

	console.log(elems.filter((element, index) => index < amount).join(" + "));

	const sliderValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.target.value));
	};

	return (
		<>
			<DndContext 
				onDragStart={() => setIsDragging(true)}
				onDragCancel={() => setIsDragging(false)}
				onDragEnd={handleDragEnd}
			>
				<center>
					<h1 className="text-center font-extrabold py-5">Play</h1>

					<div className="card w-96 bg-base-300 shadow-xl p-5">
						<input 
							type="range"
							min="2" 
							max="5" 
							value={amount}
							className="range" 
							onChange={sliderValueChanged}
						/>

						{range(1, amount).map((id) => {
							return (
								<div id={id.toString()} key={id.toString()}>
									<Droppable key={id.toString()} id={id.toString()}>
										<div className={`w-[150px] h-[150px] border-4 bg-base-200 rounded-md m-4 inline-grid place-items-center ${isDragging ? "border-green-400" : "border-transparent"}`}>
											{(id.toString() in items ? items[id.toString() as keyof unknown] : <div className="h-[100px] w-[100px]"></div>) as ReactNode}
										</div>
									</Droppable>
									{id === amount ? null: <div className="font-bold text-2xl">+</div>}
								</div>
							);
						})}
					
						<div>
							<button 
								className="btn btn-accent" 
								disabled={!(Array.from({ length: amount }, (_, index) => elems[index]).every(elem => elem !== undefined))}
							>
								Submit
							</button>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-4 w-[48rem] p-4 rounded-md bg-base-300 m-5">
						{elemList}
					</div>
				</center>
			</DndContext>
		</>
	);
}