export default {
    ERRORS: {
        NO_COMMAND_EXISTS: {
            TITLE: "Komenda nie istnieje!",
            DESCRIPTION: "Komenda którą próbujesz wykonać nie istnieje!"
        },
        NO_PERMISSIONS: {
            TITLE: "Nie posiadasz uprawnień!",
            DESCRIPTION: "Wymagane uprawnienia do wykonania tej komendy: **{permissions}**"
        },
        NO_COMMAND_ARGS: {
            TITLE: "Błąd podczas realizacji komendy",
            DESCRIPTION: "Brak argumentów w komendzie\nPoprawne użycie komendy: **{usage}**"
        },
        NO_MEMBER_FOUND: {
            TITLE: "Błąd podczas wyszukiwania użytkownika",
            DESCRIPTION: "Nie znaleziono tego użytkownika na tym serwerze!"
        },
        MUTE_COMMAND: {
            TITLE: "Błąd podczas wyciszania użytkownika",
            NO_PERMISSIONS: {
                DESCRIPTION: "Nie posiadam uprawnień aby nadać rolę wyciszenia użytkownikowi.."
            },
            MUTE_YOURSELF: {
                DESCRIPTION: "Nie możesz wyciszyć samego siebie!"
            },
            MUTE_HIGHEST_ROLE: {
                DESCRIPTION: "Nie możesz wyciszyć tego użytkownika (posiada wyższą rolę od twojej)!"
            },
            MUTE_NO_ROLE_IN_GUILD: {
                DESCRIPTION: "Rola pod nazwą **{rolename}** nie jest utworzona, stwórz ją!"
            },
            MUTE_ALREADY_MUTED: {
                DESCRIPTION: "Użytkownik jest już wyciszony!"
            },
            MUTE_NO_TIME: {
                DESCRIPTION: "Nie podałeś czasu, kiedy użytkownikowi ma zostać zdjęte wyciszenie!\nPrzykład podania czasu: **1m = 1 minuta, 1w = tydzień**"
            },
            MUTE_INVALID_TIME: {
                DESCRIPTION: "Podano zły argument czasu, spróbuj ponownie ale tym razem poprawniej!"
            },
            MUTE_NO_REASON: {
                DESCRIPTION: "Brak powodu wyciszenia"
            }
        },
        UNMUTE_COMMAND: {
            TITLE: "Błąd podczas odciszania użytkownika",
            NO_PERMISSIONS: {
                DESCRIPTION: "Nie posiadam uprawnień aby zdjąć rolę wyciszenia użytkownikowi.."
            },
            ALREADY_UNMUTED: {
                DESCRIPTION: "Użytkownik jest już odciszony!"
            },
        }
    },
    SUCCESS: {
        MUTE_COMMAND: {
            MUTED: {
                TITLE: "Pomyślnie wyciszono użytkownika!",
                DESCRIPTION: "Użytkownik **{nickname}** został pomyślnie wyciszony na okres **{muteEnd}** z powodu **{reason}**"
            },
            MEMBER_MUTE: {
                TITLE: "Zostałeś wyciszony!",
                DESCRIPTION: "Zostałeś wyciszony na serwerze **{servername}** przez **{invoker}** z powodu **{reason}** na okres **{muteEnd}**"
            }
        },
        UNMUTE_COMMAND: {
            UNMUTED: {
                TITLE: "Pomyślnie odciszono użytkownika!",
                DESCRIPTION: "Użytkownik **{nickname}** został pomyślnie odciszony!"
            },
            MEMBER_UNMUTED: {
                TITLE: "Zostałeś odciszony!",
                DESCRIPTION: "Zostałeś odciszony na serwerze **{servername}** przez **{invoker}**!"
            }
        }
    },
    INFO: {
        ON_REJOIN_MUTE: {
            TITLE: "Przywrócono ci wyciszenie",
            DESCRIPTION: "Z powodu iż wcześniej miałeś wyciszenie na serwerze **{servername}**, zostało ci ono przywrócone."
        }
    },
    DEFAULT: {
        NO_MUTE_REASON: "Brak powodu wyciszenia użytkownika"
    },
    ROLES: {
        MUTED: {
            NAME: "Wyciszony",
            COLOR: "#000000",
            PERMISSIONS: {
                SEND_MESSAGE: false,
                MANAGE_MESSAGES: false,
                ADD_REACTIONS: false
            }
        }
    }
}