import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import Error from "./Error";
import ElemBox from "./ElementBox";
import Avatar from "./Avatar";
import QueryWrapper from "./QueryWrapper";

function Body({ name }) {
	const { isLoading, error, data } = useQuery({
		queryKey: ["element"],
		queryFn: async () => {
			const result = await fetch(`/api/element?name=${name}`);

			if (result.status === 204) {
				return 204;
			}

			const rjson = result.json();

			return rjson;
		}
	});

	if (isLoading) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	if (data === 204) {
		return (
			<Error code="404">
				This element does not exist.
			</Error>
		);
	}

	return (
		<>
			<center className="p-10">
				<ElemBox body={data} width={100} />
			</center>

			<div className="mx-10">
				<div><b>ID:</b> #{data.id}</div>
				<div className="flex items-center">
					<b>Creator:</b>&thinsp;&thinsp;<Avatar username={data.creator} small={true} />&thinsp;&thinsp;{data.creator}
				</div>
			</div>
		</>
	);
}

export default function Element({ name }) {
	return (
		<QueryWrapper>
			<Body name={name} />
		</QueryWrapper>
	);
}

Body.propTypes = {
	name: PropTypes.string.isRequired
};

Element.propTypes = {
	name: PropTypes.string.isRequired
};