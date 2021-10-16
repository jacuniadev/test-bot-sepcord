/** 
 * @project SAPCord Discord Bot
 * @author xkotori (Norelock)
 * @classdesc MySQL Database Manager
*/

import { createConnection } from "mysql";

export default class MySQL {
	/*
		TODO:
		- przenieść ważne dane na dotenv
		- error handler podczas łączenia z bazą
	*/

	static LOGIN_INFO = {
		host: "localhost",
		database: "sapcordbot",
		user: "root",
		password: ""
	}
	static CONNECTION = false;

	constructor() {
		if (!MySQL.CONNECTION) {
			MySQL.CONNECTION = createConnection(MySQL.LOGIN_INFO);

			MySQL.CONNECTION.config.queryFormat = (query, values) => {
				if (!values) // jeżeli nie ma warunków do podmiany danych to zwracamy po prostu zawartość query
					return query;

				// zamiana values czyli values = { id: 1 } i zapytanie np. select * from bot_settings where id = :id
				return query.replace(/\:(\w+)/g, (string, key) => {
					if (values.hasOwnProperty(key))
						return escape(values[key]);

					return string;
				});
			}

			this.connect();
		} else
			throw Error("Instancja połączenia z bazą jest już zdefiniowana!");
	}

	connect() {
		if (!MySQL.CONNECTION)
			throw Error("Brak instancji połączenia z bazą!");

		MySQL.CONNECTION.connect(error => {
			if (error)
				throw error;

			console.log("Połączono do bazy danych pomyślnie!");
		});
	}

	query(string, values, callback) {
		if (!MySQL.CONNECTION)
			throw Error("MySQL :: Brak instancji połączenia z bazą!");

		if (typeof callback !== "function")
            throw Error("MySQL :: Oczekiwano w argumencie 'callback' typ 'function', otrzymano typ '" + typeof callback + "'");

		return MySQL.CONNECTION.query(string, values, (error, result) => {
			if (error)
				throw error;

			return callback(result);
		});
	}

	queryFree(string, values) {
		if (!MySQL.CONNECTION)
			throw new Error("MySQL :: Brak instancji połączenia z bazą!");

		return MySQL.CONNECTION.query(string, values, (error) => {
			if (error)
				throw error;
		});
	}

	getRows(string, values, callback) {
		if (!MySQL.CONNECTION)
			throw Error("MySQL :: Brak instancji połączenia z bazą!");

		if (typeof callback !== "function")
            throw Error("MySQL :: Oczekiwano w argumencie 'callback' typ 'function', otrzymano typ '" + typeof callback + "'");

		return MySQL.CONNECTION.query(string, values, (error, result) => {
			if (error)
				throw error;

			return result instanceof Array ? callback(result) : JSON.stringify(result);
		});
	}
}