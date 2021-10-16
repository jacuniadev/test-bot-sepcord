/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc Embedded Message
*/

import { Message, MessageEmbed } from "discord.js";

function GetTypeColor(type) {
	const DEFINED_TYPE_COLORS = {
		success: "#59db18",
		warning: "#fa9c05",
		error: "#fa0505",
		info: "#0573fa",
		default: "#ffffff"
	}

	return DEFINED_TYPE_COLORS[type] || DEFINED_TYPE_COLORS["default"];
}

export default class extends MessageEmbed {
	constructor(message, data) {
		if (!message || !message instanceof Message)
			throw Error("oczekiwano w argumencie 'message' instancję 'Message'");

		super();

		const color = GetTypeColor(data.type || "default");

		const userData = message.member.user || null,
			userAvatar = userData.displayAvatarURL({
				size: 128
			});

		console.log(message.channel.type);

		this.setAuthor(userData.tag, userAvatar);

		if (data.type && color)
			this.setColor(color);

		if (data.title)
			this.setTitle(data.title);

		if (data.fields)
			this.setFields(data.fields);

		if (data.description)
			this.setDescription(data.description);

		return { embeds: [this] };
	}
}