import ms from "ms";

import MessageEmbed from "../Helpers/Messages/Embed.js";
import Strings from "../Helpers/Messages/Strings.js";
import Resolve from "../Helpers/Resolve.js";

export default {
	aliases: [
		"m",
		"wycisz"
	],
	requiresArguments: true,
	usage: "<oznaczenie lub id użytkownika> <czas> <powód>",
	permissions: ["MANAGE_MESSAGES"],
	category: "Administracyjne",
	description: "Wyciszanie danej osoby z powodem i czasem",
	action: async ( client, message, args ) => {
		const member = await Resolve.Member(args[0], message.guild);

		if (!member)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.NO_MEMBER_FOUND.TITLE,
				description: Strings.ERRORS.NO_MEMBER_FOUND.DESCRIPTION
			}));

		if (member.id === message.author.id)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.MUTE_COMMAND.TITLE,
				description: Strings.ERRORS.MUTE_COMMAND.MUTE_YOURSELF.DESCRIPTION
			}));

		const memberPosition = member.roles.highest.position,
			administrationPosition = message.member.roles.highest.position;

		if (message.guild.ownerId !== message.author.id && !(administrationPosition > memberPosition))
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.MUTE_COMMAND.TITLE,
				description: Strings.ERRORS.MUTE_COMMAND.MUTE_HIGHEST_ROLE.DESCRIPTION
			}));

		const role = message.guild.roles.cache.find(r => r.name === Strings.ROLES.MUTED.NAME);

		if (!role)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.MUTE_COMMAND.TITLE,
				description: Strings.ERRORS.MUTE_COMMAND.MUTE_NO_ROLE_IN_GUILD.DESCRIPTION.replace("{rolename}", Strings.ROLES.MUTED.NAME)
			}));

		const isAlreadyMuted = await Resolve.IsMemberAlreadyMuted(client, message.guild, member);

		if (isAlreadyMuted)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.MUTE_COMMAND.TITLE,
				description: Strings.ERRORS.MUTE_COMMAND.MUTE_ALREADY_MUTED.DESCRIPTION
			}));

		const time = args[1];

		if (!time) // || isNaN(ms(time)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.MUTE_COMMAND.TITLE,
				description: Strings.ERRORS.MUTE_COMMAND.MUTE_NO_TIME.DESCRIPTION
			}));
		else {
			if (isNaN(ms(time)))
				return message.reply(new MessageEmbed(message, {
					type: "error",
					title: Strings.ERRORS.MUTE_COMMAND.TITLE,
					description: Strings.ERRORS.MUTE_COMMAND.MUTE_INVALID_TIME.DESCRIPTION
				}));
		}

		const now = Date.now(),
			end = now + ms(time);

		let reason = args.slice(2).join(" ");

		if (!reason)
			reason = Strings.ERRORS.MUTE_COMMAND.MUTE_NO_REASON.DESCRIPTION;

		reason = decodeURIComponent(reason);

		member.roles.add(role).then(_ => {
			const MD_DSC = Strings.SUCCESS.MUTE_COMMAND.MUTED.DESCRIPTION.replace("{nickname}", member.user.tag).replace("{muteEnd}", time).replace("{reason}", reason);

			message.reply(new MessageEmbed(message, {
				type: "success",
				title: Strings.SUCCESS.MUTE_COMMAND.MUTED.TITLE,
				description: MD_DSC
			}));

			const adminMember = client.users.cache.get(message.author.id);

			const M_DSC = Strings.SUCCESS.MUTE_COMMAND.MEMBER_MUTE.DESCRIPTION.replace("{servername}", message.guild.name).replace("{invoker}", adminMember ? `${adminMember.username}#${adminMember.discriminator}` : "System").replace("{reason}", reason).replace("{muteEnd}", time);

			member.send(new MessageEmbed(member, {
				type: "info",
				title: Strings.SUCCESS.MUTE_COMMAND.MEMBER_MUTE.TITLE,
				description: M_DSC
			}));

			client.database.queryFree("INSERT INTO muted_users (user_id, guild_id, date_muted, date_mute_end, reason) VALUES (':user_id', ':guild_id', ':date_muted', ':date_mute_end', ':reason')", {
				user_id: member.id,
				guild_id: message.guild.id,
				date_muted: now,
				date_mute_end: end,
				reason
			});
		}).catch(_ => {
			if (_.status === 403)
				message.reply(new MessageEmbed(message, {
					type: "error",
					title: Strings.ERRORS.MUTE_COMMAND.TITLE,
					description: Strings.ERRORS.MUTE_COMMAND.NO_PERMISSIONS.DESCRIPTION
				}));
		})
	}
}