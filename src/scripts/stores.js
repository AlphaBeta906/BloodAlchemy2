import { persistentAtom } from "@nanostores/persistent";

export const account = persistentAtom("username", "");

export const token = persistentAtom("token", "");