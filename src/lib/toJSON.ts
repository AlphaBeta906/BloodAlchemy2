export default function toJSON(data: object): object {
	return JSON.parse(JSON.stringify(data, (_, v) => typeof v === "bigint" ? `${v}n` : v)
		.replace(/"(-?\d+)n"/g, (_, a) => a));
}