# factionsBot

# Virus Total Scan:

https://www.virustotal.com/gui/file/9ab1fcc3f271526832d1d7f21bb981410fd5dc1e3bbd91e3b29c2c66efa787bb/detection

# USAGE WARNING:

You may modify these codes and add to it as you may like.
However, you are not allowed to take this code and sell to others.
Also since I have made this open source, please fork this source
to show support. I ask nothing else than that. Thanks and enjoy the factions bot!

# basic factions bot v.0.2 - Getting Started

1. First off download NODEJS and install it: https://nodejs.org/en/
2. Download this repository
3. run > npm install (after nodejs is installed) (open cmd.exe -> cd into the factionsbot folder and then run the command)
4. create a config.json file in the utils folder (./utils/config.json) as a json object with the following:

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
