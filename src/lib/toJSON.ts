/**
 * It converts a JavaScript object to a JSON string, and then converts that JSON string back to a
 * JavaScript object
 * @param {object} data - The object to be converted to JSON.
 * @returns A function that takes in an object and returns a JSON object.
 */
export default function toJSON(data: object): object {
	return JSON.parse(JSON.stringify(data, (_, v) => typeof v === "bigint" ? `${v}n` : v)
		.replace(/"(-?\d+)n"/g, (_, a) => a));
}