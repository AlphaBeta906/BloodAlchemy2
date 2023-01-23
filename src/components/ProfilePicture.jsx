import { useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { createAvatar } from "@dicebear/avatars";
import * as identicon from "@dicebear/identicon";
import * as initials from "@dicebear/initials";

import Menu from './Menu';
import { account } from '../scripts/stores';

export default function ProfilePicture() {
    const $account = useStore(account)

    let avatar = null

    if ($account === "") {
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
                seed: $account,
                size: 30
            });
        }, []);
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                    <div className="w-9 rounded-md bg-white">
                        <img src={avatar} alt="avatar" />
                    </div>
                </label>
                <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52">
                    <Menu />
                </ul>
            </div>
        </>
    )
}