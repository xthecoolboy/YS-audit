const Discord = require('discord.js');
const settings = require('./../botconfig.json');
const convert = require('./../utils/timeConvert.js')

module.exports.run = async (bot, message, args) => {
var uptime = bot.uptime
return message.channel.send(`⌛ | Senpai! I've been monitoring the server for **${convert(uptime/1000)}**!`);
}


module.exports.help = {
          name: "uptime"
        }
