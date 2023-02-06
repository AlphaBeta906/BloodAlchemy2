import type { Result } from "@dicebear/core";

import { createAvatar } from "@dicebear/core";
import { identicon, initials } from "@dicebear/collection";
import { useState, useEffect } from "react";

type Props = {
	username: string;
	width?: number;
};

/**
 * It returns an avatar image based on the username
 * @returns A div with a class of avatar p-0 m-0.
 */
export default function Avatar({ username, width = 36 }: Props) {
	const [avatar, setAvatar] = useState<Result>();

	useEffect(() => {
		if (username === "") {
			setAvatar(
				createAvatar(initials, {
					seed: "??",
					backgroundColor: ["505050", "505050", "505050"],
					size: 30
				})
			);
		} else {
			setAvatar(
				createAvatar(identicon, {
					seed: username,
					size: 30
				})
			);
		}
	}, [username]);

	return (
		<div className="avatar p-0 m-0">
			<div className="rounded-md bg-white" style={{ width: width }}>
				<img src={avatar?.toDataUriSync()} alt="avatar" />
			</div>
		</div>
	);
}