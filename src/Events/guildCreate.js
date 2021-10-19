/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc Guild added by user
*/

/**
 * @todo
 * Przy dodaniu przez uzytkownika serwera, robienie roli muted i tak dalej
 */

export default {
	name: "guildCreate",
	once: true,
	execute: ( guild ) => {
		console.log(guild)
	}
}