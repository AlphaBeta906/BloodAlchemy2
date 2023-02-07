/**
 * If the body is a string, parse it as JSON, otherwise return the body
 * @param {string | object} body - string | object
 * @returns A function that takes a string or an object and returns the object.
 */
export default function bodyParse(body: string | object) {
	if (typeof body === "string") {
		return JSON.parse(body);
	} else {
		return body;
	}
}