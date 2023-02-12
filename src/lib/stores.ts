import { persistentAtom } from "@nanostores/persistent";

export const account = persistentAtom<string>("username", "");
export const token = persistentAtom<string>("token", "");
export const theme = persistentAtom<string>("theme", "");