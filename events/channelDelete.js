const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,channel) => {
const logs = ['logs','mod-logs','modlog','audits']
var cha = channel.guild.channels.find(c=>logs.includes(c.name))
if (!cha) return console.log(`Channel Not Found!`)
channel.guild.fetchAuditLogs().then(audit => {
  const Embed = new Discord.RichEmbed()
  .setColor(settings.colors.embedDefault)
  .setAuthor(`A ${channel.type} channel was deleted!`,audit.entries.first().executor.displayAvatarURL)
  .addField(`Channel Name`,channel.name,true)
  .addField(`Deleted by`,"**"+audit.entries.first().executor.username+"**#"+audit.entries.first().executor.discriminator,true)
  .setFooter(`ID: ${channel.id}`)
  .setTimestamp()

  cha.send(Embed).catch(console.error)

})


}
