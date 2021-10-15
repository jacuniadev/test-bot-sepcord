/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc MySQL Database Manager
*/

/*
	TODO:
	- przenieść ważne dane na dotenv
*/

// Blibioteki systemowe
import { readdirSync, existsSync } from "fs";

// Blibioteki normalne
import { Client, Collection } from "discord.js";

// Include

// Wczytywanie eventów i komend
class Loader {
	static FILE_PATHS = {
		events: "../Events/",
		commands: "../Commands/"
	}

	static async EVENTS_LOAD(client) {
		if (!client || !client instanceof Client) {
			const ERROR_MESSAGE = !client ? "argument 'client' jest pusty" : !client instanceof Client ? "oczekiwano w argumencie 'client' instancję 'Client'" : "";

			throw TypeError("Loader :: Nie można załadować eventów (" + ERROR_MESSAGE + ")");
		}

		const EVENTS_PATH_FS = this.FILE_PATHS.events.substring(this.FILE_PATHS.events.indexOf(".") + 1); // nie lubie fs używać, ale niestety on chyba nie obsługuje bo ciągle błędy mi wszędały

		if (existsSync(EVENTS_PATH_FS)) {
			const EVENTS_FILES = readdirSync(EVENTS_PATH_FS).filter(file => file.endsWith(".js"));

			for (const EVENT_FILE of EVENTS_FILES) {
				const EVENT_NAME = EVENT_FILE.replace(/\.[^.]*$/, "");
				const EVENT = (await import(this.FILE_PATHS.events + EVENT_FILE)).default;

				// bindowanie eventu
				if (EVENT)
					client.on(EVENT_NAME, EVENT.bind(null, client));
			}
		} else
			throw Error("Loader :: Folder z eventami nie istnieje!");
	}
}

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