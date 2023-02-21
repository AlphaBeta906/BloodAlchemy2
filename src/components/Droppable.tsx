import type { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

type Props = {
	children?: ReactNode
}

export default function Droppable({ children }: Props) {
	const { setNodeRef } = useDroppable({
		id: "droppable",
	});
  
	return (
		<div className="h-min w-min" ref={setNodeRef}>
			{children}
		</div>
	);
}