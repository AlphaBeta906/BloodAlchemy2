import type { Result } from "@dicebear/core";

import { createAvatar } from "@dicebear/core";
import { identicon, initials } from "@dicebear/collection";
import { useState, useEffect } from "react";

/**
 * Props is an object with a username property that is a string and an optional width property that is
 * a number.
 * @property {string} username - The username of the user to display the avatar for.
 * @property {number} width - The width of the image. Defaults to 100.
 */
type Props = {
	username: string;
	width?: number;
};

/**
 * `Avatar` is a function that takes in a username and a width and returns a div with an image inside
 * of it
 * @param {Props} props - The props that are passed to the component.
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