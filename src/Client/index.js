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
import { Client, Collection, Intents } from "discord.js";

// Baza danych
import MySQL from "../Include/MySQL.js";

// Pomocniczne
import Loader from "../Helpers/Loader.js";

export default class BotClient extends Client {
	static TOKEN = "ODk4NDg4MTI5Mjk4NzcxOTg4.YWk8Rw.GNusHgS4K8Tw9_pZHN82hT45P8w";

	constructor() {
		super({
			partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'], 
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
		});
		
		this.prefix = "!";
		
		this.database = new MySQL;
		this.commands = new Collection;

		this.login(BotClient.TOKEN);

		Loader.EVENTS_LOAD(this);
		Loader.COMMANDS_LOAD(this);
	}
}