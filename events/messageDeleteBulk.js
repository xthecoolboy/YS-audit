const settings = require('./../botconfig.json');
const Discord = require('discord.js');

module.exports = (bot,messages) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = messages.first().guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)

    const Embed = new Discord.RichEmbed()
    .setAuthor(`Messages Deleted`,messages.first().guild.iconURL)
    .setColor(settings.colors.embedDefault)
    .setTimestamp()
    .setDescription(`**${messages.size} messages were deleted from ${messages.first().channel}**`)

cha.send(Embed).catch(console.error)
}
