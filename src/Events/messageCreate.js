/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc Message creating event
*/

import MessageEmbed from "../Helpers/Messages/Embed.js";
import Strings from "../Helpers/Messages/Strings.js";

export default {
	name: "messageCreate",
	once: false,
	execute: ( client, message ) => {
		if (message.author.bot || message.author.system)
			return;

		// System komend
		if (!message.content.startsWith(client.prefix))
			return;

		const args = message.content.slice(client.prefix.length).split(/ +/),
			cmd = args.shift().toLowerCase();

		const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

		if (command) {
			if (command.requiresArguments && args.length === 0)
				return message.reply(new MessageEmbed(message, {
					type: "error",
					title: Strings.ERRORS.NO_COMMAND_ARGS.TITLE,
					description: Strings.ERRORS.NO_COMMAND_ARGS.DESCRIPTION.replace("{usage}", `${client.prefix}${cmd} ${command.usage ? command.usage : null}`)
				}));

			if (command.permissions) {
				const HAS_PERMISSION = message.member.permissions.has(command.permissions);

				if (!HAS_PERMISSION) {
					const REQUIRED_PERMISSIONS = command.permissions.join(", ");

					return message.reply(new MessageEmbed(message, {
						type: "error",
						title: Strings.ERRORS.NO_PERMISSIONS.TITLE,
						description:  Strings.ERRORS.NO_PERMISSIONS.DESCRIPTION.replace("{permissions}", REQUIRED_PERMISSIONS)
					}));
				}
			}

			command.action(client, message, args);
		} else
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.NO_COMMAND_EXISTS.TITLE,
				description: Strings.ERRORS.NO_COMMAND_EXISTS.DESCRIPTION
			}));
	}
}