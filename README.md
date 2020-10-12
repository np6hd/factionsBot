# factionsBot

# USAGE WARNING:
You may modify these codes and add to it as you may like.
However, you are not allowed to take this code and sell to others.
Also since I have made this open source, please fork this source 
to show support. I ask nothing else than that. Thanks and enjoy the factions bot!


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
  "wallCheckFrequency": 3, "how often should wall checks occur in minutes"
  "bufferCheckFrequency": 6, "how often should buffer checks occur in minutes"
  "joinCommandFrequency": 10, "run join command in minutes"
  "prefix": ".",
  "ftopFrequency": 30, "run ftop command at an interval in minutes"
  "flistFrequency": 10, "run flist command at an interval in minutes"
}
```
