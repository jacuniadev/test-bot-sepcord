import { readdirSync, existsSync } from "fs";
import { Client as DiscordClient } from "discord.js";

export default class {
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