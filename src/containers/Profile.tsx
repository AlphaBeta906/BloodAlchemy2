import { DateTime } from "luxon";

import { trpc } from "@/lib/trpc";
import ErrorMessage from "@/components/ErrorMessage";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import Roles from "@/components/Roles";

/**
 * Props is an object with a username property that is a string.
 * @property {string} username - The username of the user to display.
 */
type Props = {
	username: string;
}

/**
 * `ProfilePage` is a React component that displays a user's profile
 * @param {Props} props - The props that are passed to the component.
 * @returns A React component.
 */
export default function ProfilePage({ username }: Props) {
	const { error, status, data } = trpc.user.byUsername.useQuery({
		username: username
	});

	if (error) {
		if (error.data?.code === "NOT_FOUND") {
			return (
				<ErrorMessage code="404">
					This element does not exist.
				</ErrorMessage>
			);
		}
	}

	if (status !== "success") return <Loader />;

	const date = DateTime.fromJSDate(new Date(data.date_of_creation)).toLocaleString(DateTime.DATETIME_FULL);

	return (
		<>
			<center className="p-10">
				<Avatar username={username} width={100} />
				<h2 className="font-extrabold">{username}</h2>
				<div className="mt-2">
					<Roles username={username} />
				</div>
			</center>

			<div className="mx-10">
				<div className="mb-1.5"><b>Date of Creation:</b> {date}</div>
			</div>
		</>
	);
}