function GetTypeColor(type) {
	let DEFINED_TYPE_COLORS = {
		success: "#59db18",
		warning: "#fa9c05",
		error: "#fa0505",
		info: "#0573fa",
		default: "#ffffff"
	}

	return DEFINED_TYPE_COLORS[type] || DEFINED_TYPE_COLORS["default"];
}

export default class {
	constructor(colorType, title, description) {
		const color = GetTypeColor(colorType);

		return {
			embeds: [
				{
					color,
					title: title || "Brak tytułu",
					description: description || "Brak opisu"
				}
			]
		};
	}
}