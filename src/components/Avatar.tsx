import { useMemo } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as identicon from "@dicebear/identicon";
import * as initials from "@dicebear/initials";

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
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return createAvatar(initials, {
				dataUri: true,
				seed: "??",
				backgroundColor: ["808080", "808080", "808080"],
				size: 30
			});
		}, []);
	} else {
		avatar = useMemo(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return createAvatar(identicon, {
				dataUri: true,
				seed: username,
				size: 30
			});
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