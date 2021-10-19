export default {
	Member: async ( search, guild ) => {
		let member = null;
		if(!search || typeof search !== "string") return;
		// research po id
		if(search.match(/^<@!?(\d+)>$/)){
			const id = search.match(/^<@!?(\d+)>$/)[1];
			member = await guild.members.fetch(id).catch(() => {});
			if(member) return member;
		}
		// research po nazwie użytkownika
		if(search.match(/^!?(\w+)#(\d+)$/)){
			guild = await guild.fetch();
			member = guild.members.cache.find((m) => m.user.tag === search);
			if(member) return member;
		}
		member = await guild.members.fetch(search).catch(() => {});
		return member;
	},
	IsMemberAlreadyMuted: async ( client, guild, member ) => {
		if (!client.database)
			return false;

		return new Promise(resolve => {
			client.database.query("SELECT * FROM muted_users WHERE user_id = :userId AND guild_id = :guildId", {
				userId: member.id,
				guildId: guild.id
			}, result => {
				console.log(result);
	
				if (result[0])
					resolve(true);
				else
					resolve(false);
			})
		});
	}
}