import { useStore } from "@nanostores/react";

import Menu from "@/components/Menu";
import Avatar from "@/components/Avatar";
import { account } from "@/lib/stores";

export default function ProfilePicture() {
	const $account = useStore(account);

	return (
		<>
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle">
					<Avatar username={$account} />
				</label>
				<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52">
					<Menu />
				</ul>
			</div>
		</>
	);
}