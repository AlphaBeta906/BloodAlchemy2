import type { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

type Props = {
	id: string
	children?: ReactNode
}

export default function Droppable({ id, children }: Props) {
	const { setNodeRef } = useDroppable({
		id: id,
	});
  
	return (
		<div ref={setNodeRef}>
			{children}
		</div>
	);
}