const settings = require('./../botconfig.json');
const Discord = require('discord.js');

module.exports = (bot,message) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = message.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)

    const Embed = new Discord.RichEmbed()
    .setAuthor(`Message Deleted`,message.author.displayAvatarURL)
    .setColor(settings.colors.embedDefault)
    .setTimestamp()
    .setFooter(`Message ID: ${message.id}`)
    .setDescription(`**Message sent by ${message.author} in ${message.channel} was deleted**\n${message.content}`)

    if (message.author.bot) {
      return;
    } else
cha.send(Embed).catch(console.error)
}
