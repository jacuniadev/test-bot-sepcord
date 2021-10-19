import MessageEmbed from "../Helpers/Messages/Embed.js";

export default {
    aliases: [
        "pomoc",
        "komendy"
    ],
    category: "Pomocne",
    description: "Cały spis komend",
    action: ( client, message ) => {
        const commands = [];

        for (const command of client.commands) {
            const [COMMAND_NAME, COMMAND_DATA] = command;

            let COMMAND = "Komenda: ``{prefix}{command}``";

            COMMAND = COMMAND.replace("{prefix}", client.prefix);
            COMMAND = COMMAND.replace("{command}", COMMAND_NAME);

            let COMMAND_DESCRIPTION = "┌• Subkomendy: {command_aliases}\n├• Wymagane uprawnienia: {permissions}\n├• Kategoria komendy: **{category}**\n└• Opis komendy: **{description}**";

            const COMMAND_ALIASES = COMMAND_DATA.aliases ? COMMAND_DATA.aliases.length > 0 ? client.prefix + COMMAND_DATA.aliases.join(", !") : client.prefix + COMMAND_NAME : "brak",
                COMMAND_PERMISSIONS = COMMAND_DATA.permissions ? COMMAND_DATA.permissions.length > 0 ? "``" + COMMAND_DATA.permissions.join(", ") + "``" : "``Brak wymaganych uprawnień``" : "``Brak wymaganych uprawnień``";

            COMMAND_DESCRIPTION = COMMAND_DESCRIPTION.replace("{command_aliases}", "``" + COMMAND_ALIASES + "``");
            COMMAND_DESCRIPTION = COMMAND_DESCRIPTION.replace("{permissions}", "**" + COMMAND_PERMISSIONS + "**");
            COMMAND_DESCRIPTION = COMMAND_DESCRIPTION.replace("{category}", COMMAND_DATA.category);
            COMMAND_DESCRIPTION = COMMAND_DESCRIPTION.replace("{description}", COMMAND_DATA.description);

            commands.push({ name: COMMAND, value: COMMAND_DESCRIPTION, inline: true });
        }

        const e = new MessageEmbed(message, {
            type: "info",
            title: "Spis komend aktualnie będących w bocie",
            fields: commands
        });
        
        message.reply(e);
    }
}