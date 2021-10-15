import MessageEmbed from "../Helpers/Messages/Embed.js";

export default (client, message) => {
	const commandPrefix = "!";
	
	if (message.author.bot)
		return;

	if (!message.content.startsWith(commandPrefix))
		return;

	const args = message.content.slice(commandPrefix.length).split(/ +/),
		cmd = args.shift().toLowerCase();

	const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

	if (command)
		command.action(client, message, args);
	else {
		const e = new MessageEmbed("error", "Błąd", "Nie znaleziono komendy!");

		return message.reply(e);
	}
}