/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc on guild join by member
*/

import MessageEmbed from "../Helpers/Messages/Embed.js";
import Strings from "../Helpers/Messages/Strings.js";
import Resolve from "../Helpers/Resolve.js";

export default {
	name: "guildMemberAdd",
	execute: async ( client, member ) => {
		const isMuted = await Resolve.IsMemberAlreadyMuted(client, member.guild, member);

        if (isMuted) {
            const role = member.guild.roles.cache.find(r => r.name === Strings.ROLES.MUTED.NAME);

            if (!role)
                return;

            member.send(new MessageEmbed(member, {
                type: "info",
                title: Strings.INFO.ON_REJOIN_MUTE.TITLE,
                description: Strings.INFO.ON_REJOIN_MUTE.DESCRIPTION.replace("{servername}", member.guild.name)
            })).then(_ => member.roles.add(role));
        }
	}
}