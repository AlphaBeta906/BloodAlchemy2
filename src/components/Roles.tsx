/**
 * Props is an object with a username property that is a string.
 * @property {string} username - The username of the user to display.
 */
type Props = {
	username: string;
}

/**
 * It returns a list of roles for a user.
 * @param {Props} props - The props that are passed to the component.
 * @returns A JSX element.
 */
export default function Roles({ username }: Props) {
	console.log(typeof username);

	return (
		<>
			{["AlphaBeta906"].includes(username) && <div className="badge bg-transparent border-red-500 text-red-500 mx-1 h-7 font-sans text-base">🛡️ Creator</div>} 
			{["AlphaBeta906", "Country"].includes(username) && <div className="badge bg-transparent border-slate-500 text-slate-500 mx-1 h-7 font-sans text-base">🛠️ Developer</div>}
			{["AlphaBeta906", "Country"].includes(username) && <div className="badge bg-transparent border-lime-600 text-lime-600 mx-1 h-7 font-sans text-base">🧪 Beta Tester</div>}
		</>
	);
}