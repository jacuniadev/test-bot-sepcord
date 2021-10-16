/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc Client Core
*/

/*
	TODO:
	- przenieść ważne dane na dotenv
*/

// Blibioteki normalne
import { Client, Collection } from "discord.js";

// Pomocniczne
import Loader from "../Helpers/Loader.js";

export default class BotClient extends Client {
	static TOKEN = "ODk4NDg4MTI5Mjk4NzcxOTg4.YWk8Rw.GNusHgS4K8Tw9_pZHN82hT45P8w";

	constructor() {
		super({
			partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'], 
			intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS']
		});

		this.commands = new Collection;
		this.prefix = "!";

		this.login(BotClient.TOKEN);

		Loader.EVENTS_LOAD(this);
		Loader.COMMANDS_LOAD(this);
	}
}