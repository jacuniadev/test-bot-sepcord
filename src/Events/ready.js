/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc On ready event
*/

import MySQL from "../Include/MySQL.js";

export default (client) => {
	if (!client.database) {
		client.database = new MySQL;
	}
}