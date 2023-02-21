import type { ReactNode } from "react";

import { useDraggable } from "@dnd-kit/core";

type Props = {
	id: string
	children?: ReactNode
}

export default function Draggable({ id, children }: Props) {
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: id,
	});

	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;

	return (
		<button ref={setNodeRef} style={style} {...listeners} {...attributes}>
			{children}
		</button>
	);
}