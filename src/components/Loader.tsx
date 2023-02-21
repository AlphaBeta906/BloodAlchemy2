/**
 * It returns a div with a class of `hero` and a child div with a class of `animate-spin rounded-full
 * h-32 w-32 border-t-2 border-b-2`
 * @returns A div with a loader
 */
export default function Loader() {
	return (
		<div className="h-[calc(100vh-4rem)] grid place-items-center">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
		</div>
	);
}