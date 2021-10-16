/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc Message creating event
*/

import MessageEmbed from "../Helpers/Messages/Embed.js";

export default ( client, message ) => {
	if (message.author.bot || message.author.system)
		return;

	// System komend
	if (!message.content.startsWith(client.prefix))
		return;

	const args = message.content.slice(client.prefix.length).split(/ +/),
		cmd = args.shift().toLowerCase();

	const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

	if (command) {
		if (command.permissions) {
			const HAS_PERMISSION = message.member.permissions.has(command.permissions);

			if (!HAS_PERMISSION) {
				const REQUIRED_PERMISSIONS = command.permissions.join(", ");

				return message.reply(new MessageEmbed(message, {
					type: "error",
					title: "Brak uprawnień",
					description: "Wymagane uprawnienia: ``" + REQUIRED_PERMISSIONS + "``"
				}));
			}
		}

		command.action(client, message, args);
	} else
		return message.reply(new MessageEmbed(message, {
			type: "error",
			title: "Nie znaleziono komendy",
			description: "Komenda nie została znaleziona!"
		}));
}