import { useMemo } from "react";

import { createAvatar } from "@dicebear/core";
import { identicon, initials } from "@dicebear/collection";

type Props = {
	username: string;
	width?: number;
};

/**
 * It returns an avatar image based on the username
 * @returns A div with a class of avatar p-0 m-0.
 */
export default function Avatar({ username, width = 36 }: Props) {
	let avatar = null;

	// Really hate this part of the "TypeScript"-ification part of the process... - Jan 30, 2023
	// This is getting worse. - Jan 31, 2023
	
	if (username === "") {
		avatar = useMemo(() => {
			return createAvatar(initials, {
				seed: "??",
				backgroundColor: ["808080", "808080", "808080"],
				size: 30
			}).toDataUriSync();
		}, []);
	} else {
		avatar = useMemo(() => {
			return createAvatar(identicon, {
				seed: username,
				size: 30
			}).toDataUriSync();
		}, []);
	}

	return (
		<div className="avatar p-0 m-0">
			<div className="rounded-md bg-white" style={{ width: width }}>
				<img src={avatar} alt="avatar" />
			</div>
		</div>
	);
}