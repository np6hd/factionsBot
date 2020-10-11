# factionsBot

# basic factions bot v.0.2

To get started first make sure to install these modules: nodejs, discordjs, node-fetch, and lowdb <br />
create a config.json file in the utils folder (./utils/config.json) as a json object with the following:

```json
{
  "userMail": "email",
  "password": "password",
  "botToken": "discord applications -> bot -> bot's token",
  "serverIP": "play.infusedmc.com",
  "joinCommand": "/mafia",
  "wallCheckFrequency": 3, "run wall checks in minutes"
  "bufferCheckFrequency": 6, "run buffer checks at an interval in minutes"
  "joinCommandFrequency": 10, "run join command in minutes"
  "prefix": ".",
  "ftopFrequency": 30, "run ftop command at an interval in minutes"
  "flistFrequency": 10, "run flist command at an interval in minutes"
}
```
