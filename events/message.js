const settings = require('./../botconfig.json');

module.exports = (bot,message) => {
    if(message.content.toString().toLowerCase() === "prefix") return message.channel.send(`**${settings.prefix}**`)
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let mentioned = message.mentions.members.first();
    var prefix = settings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (message.content.startsWith(prefix)){
    if (message.content.startsWith(prefix))
    var commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot,message,args);} else return;

}
