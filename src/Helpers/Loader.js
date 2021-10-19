/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc Events/Commands loader
*/

import { readdirSync, existsSync } from "fs";
import { Client as DiscordClient } from "discord.js";

export default class {
	static LOADED_EVENTS = 0;
	static LOADED_COMMANDS = 0;

	static FILE_PATHS = {
		events: "../Events/",
		commands: "../Commands/"
	}

	static async EVENTS_LOAD(client) {
		if (!client || !client instanceof DiscordClient) {
			const ERROR_MESSAGE = !client ? "argument 'client' jest pusty" : !client instanceof Client ? "oczekiwano w argumencie 'client' instancję 'Client'" : "";

			throw TypeError("Loader :: Nie można załadować eventów (" + ERROR_MESSAGE + ")");
		}

		const EVENTS_PATH_FS = this.FILE_PATHS.events.substring(this.FILE_PATHS.events.indexOf(".") + 1); // nie lubie fs używać, ale niestety on chyba nie obsługuje bo ciągle błędy mi wszędały

		if (existsSync(EVENTS_PATH_FS)) {
			const EVENTS_FILES = readdirSync(EVENTS_PATH_FS).filter(file => file.endsWith(".js"));

			for (const EVENT_FILE of EVENTS_FILES) {
				const event = (await import(this.FILE_PATHS.events + EVENT_FILE)).default;

				if (event)
					client[event.once ? "once" : "on"](event.name, event.execute.bind(null, client)), console.log("event zbindowany", event.name)
			}
		} else
			throw Error("Loader :: Folder z eventami nie istnieje!");
	}

	static async COMMANDS_LOAD(client) {
		if (!client || !client instanceof DiscordClient) {
			const ERROR_MESSAGE = !client ? "argument 'client' jest pusty" : !client instanceof Client ? "oczekiwano w argumencie 'client' instancję 'Client'" : "";

			throw TypeError("Loader :: Nie można załadować komend (" + ERROR_MESSAGE + ")");
		}

		const COMMANDS_PATH_FS = this.FILE_PATHS.commands.substring(this.FILE_PATHS.commands.indexOf(".") + 1);

		if (existsSync(COMMANDS_PATH_FS)) {
			const COMMANDS_FILES = readdirSync(COMMANDS_PATH_FS).filter(file => file.endsWith(".js"));

			for (const COMMAND_FILE of COMMANDS_FILES) {
				const COMMAND_NAME = COMMAND_FILE.replace(/\.[^.]*$/, ""),
					COMMAND = (await import(this.FILE_PATHS.commands + COMMAND_FILE)).default;

				if (COMMAND) {
					try {
						client.commands.set(COMMAND_NAME, COMMAND);
						this.LOADED_COMMANDS++;

						console.log("Loader :: Ustawianie komendy '" + COMMAND_NAME + "'");
					} catch (e) {
						throw Error("Loader :: Ustawianie komendy '" + COMMAND_NAME + "' nie powiodło się (" + e + ")");
					}
				}
			}
		} else
			throw Error("Loader :: Folder z komendami nie istnieje!");
	}
}