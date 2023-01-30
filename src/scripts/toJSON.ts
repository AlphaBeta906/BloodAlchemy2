export default function toJSON(data: Object) {
	return JSON.stringify(data, (_, v) => typeof v === "bigint" ? `${v}n` : v)
		.replace(/"(-?\d+)n"/g, (_, a) => a);
}