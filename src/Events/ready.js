/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc On ready event
*/

import Strings from "../Helpers/Messages/Strings.js";

let REFRESH_INTERVAL;

function refreshMutedMembers(client) {
	if (!client.database)
		return;

	const now = Date.now();

	client.database.getRows("SELECT * FROM muted_users", null, data => {
		for (const mute of data) {
			if (mute) {
				const guild = client.guilds.cache.get(mute.guild_id);

				if (guild) {
					const role = guild.roles.cache.find(r => r.name === Strings.ROLES.MUTED.NAME),
						member = guild.members.cache.get(mute.user_id);

					if (!role)
						return;

					if (member) {
						const memberHasRole = guild.roles.cache.get(role.id).members.find(m => m.user && m.user.id === member.user.id);

						if (memberHasRole) {
							const ready = mute.date_mute_end <= now;

							if (ready)
								member.roles.remove(role).then(_ => {
									client.database.queryFree("DELETE FROM muted_users WHERE guild_id = :guildId AND user_id = :userId", {
										guildId: mute.guild_id,
										userId: mute.user_id
									});

									console.log("refreshMutedMembers ::", mute.user_id, "został odciszony na serwerze", mute.guild_id);
								});
						}
					}
				}
			}
		}
	})
}

export default {
	name: "ready",
	once: true,
	execute: ( client ) => {
		console.log("rdy");

		if (!REFRESH_INTERVAL)
			REFRESH_INTERVAL = setInterval(refreshMutedMembers, 60 * 1000, client);

		refreshMutedMembers(client);
	}
}