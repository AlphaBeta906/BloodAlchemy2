import { useMemo } from "react";
import PropTypes from "prop-types";
import { createAvatar } from "@dicebear/avatars";
import * as identicon from "@dicebear/identicon";
import * as initials from "@dicebear/initials";

export default function Avatar({ username }) {
	let avatar = null;

	if (username === "") {
		avatar = useMemo(() => {
			return createAvatar(initials, {
				dataUri: true,
				seed: "??",
				backgroundColor: ["808080", "808080", "808080"],
				size: 30
			});
		}, []);
	} else {
		avatar = useMemo(() => {
			return createAvatar(identicon, {
				dataUri: true,
				seed: username,
				size: 30
			});
		}, []);
	}

	return (
		<div className="w-9 rounded-md bg-white">
			<img src={avatar} alt="avatar" />
		</div>
	);
}

Avatar.propTypes = {
	username: PropTypes.string,
};