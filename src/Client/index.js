/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc MySQL Database Manager
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
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
			intents: ['GUILDS', 'GUILD_MESSAGES']
		});

		this.commands = new Collection;
		this.login(BotClient.TOKEN);

		Loader.EVENTS_LOAD(this);
	}
}