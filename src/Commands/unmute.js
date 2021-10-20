import MessageEmbed from "../Helpers/Messages/Embed.js";
import Strings from "../Helpers/Messages/Strings.js";
import Resolve from "../Helpers/Resolve.js";

export default {
    aliases: [
        "unm",
        "odcisz"
    ],
    requiresArguments: true,
    usage: "<oznaczenie lub id użytkownika>",
    permissions: ["MANAGE_MESSAGES"],
	category: "Administracyjne",
	description: "Odciszanie danej osoby",
    action: async ( client, message, args ) => {
        const role = message.guild.roles.cache.find(r => r.name === Strings.ROLES.MUTED.NAME);

		if (!role)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.UNMUTE_COMMAND.TITLE,
				description: Strings.ERRORS.MUTE_COMMAND.MUTE_NO_ROLE_IN_GUILD.DESCRIPTION.replace("{rolename}", Strings.ROLES.MUTED.NAME)
			}));

        const member = await Resolve.Member(args[0], message.guild);

        if (!member)
			return message.reply(new MessageEmbed(message, {
				type: "error",
				title: Strings.ERRORS.NO_MEMBER_FOUND.TITLE,
				description: Strings.ERRORS.NO_MEMBER_FOUND.DESCRIPTION
			}));

        const isMuted = await Resolve.IsMemberAlreadyMuted(client, message.guild, member);

        if (!isMuted)
            return message.reply(new MessageEmbed(message, {
                type: "error",
                title: Strings.ERRORS.UNMUTE_COMMAND.TITLE,
                description: Strings.ERRORS.UNMUTE_COMMAND.ALREADY_UNMUTED.DESCRIPTION
            }));

            console.log(message.guild.id, member.id);

        member.roles.remove(role).then(_ => {
            const MD_DSC = Strings.SUCCESS.UNMUTE_COMMAND.UNMUTED.DESCRIPTION.replace("{nickname}", member.user.tag);

			message.reply(new MessageEmbed(message, {
				type: "success",
				title: Strings.SUCCESS.UNMUTE_COMMAND.UNMUTED.TITLE,
				description: MD_DSC
			}));

            const adminMember = client.users.cache.get(message.author.id);

            const M_DSC = Strings.SUCCESS.UNMUTE_COMMAND.MEMBER_UNMUTED.DESCRIPTION.replace("{servername}", message.guild.name).replace("{invoker}", adminMember ? `${adminMember.username}#${adminMember.discriminator}` : "System");

			member.send(new MessageEmbed(member, {
				type: "info",
				title: Strings.SUCCESS.UNMUTE_COMMAND.MEMBER_UNMUTED.TITLE,
				description: M_DSC
			}));

            client.database.queryFree("DELETE FROM muted_users WHERE guild_id = :guildId AND user_id = :userId", {
                guildId: message.guild.id,
                userId: member.id
            });

            console.log("unmute :: Użytkownik o id", member.id, "został odciszony na serwerze", message.guild.id)
        }).catch(_ => {
            console.log("unmute", _);

            if (isMuted)
                client.database.queryFree("DELETE FROM muted_users WHERE guild_id = :guildId AND user_id = :userId", {
                    guildId: message.guild.id,
                    userId: member.id
                });

            if (_.status === 403)
				message.reply(new MessageEmbed(message, {
					type: "error",
					title: Strings.ERRORS.UNMUTE_COMMAND.TITLE,
					description: Strings.ERRORS.UNMUTE_COMMAND.NO_PERMISSIONS.DESCRIPTION
				}));
        })
    }
}