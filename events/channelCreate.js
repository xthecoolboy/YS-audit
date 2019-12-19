const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,channel) => {
const logs = ['logs','mod-logs','modlog','audits']
var cha = channel.guild.channels.find(c=>logs.includes(c.name))
if (!cha) return console.log(`Channel Not Found!`)
channel.guild.fetchAuditLogs().then(audit => {
  const Embed = new Discord.RichEmbed()
  .setColor(settings.colors.embedDefault)
  .setAuthor(`A new ${channel.type} channel was created!`,audit.entries.first().executor.displayAvatarURL)
  .addField(`Name`,channel.name,true)
  .addField(`Created by`,"**"+audit.entries.first().executor.username+"**#"+audit.entries.first().executor.discriminator,true)
  .addField(`NSFW`,(channel.nsfw) ? `Yes` : `No`,true)
  .setFooter(`ID: ${channel.id}`)
  .setTimestamp()

  if (channel.type==='text'){
    Embed.addField(`Topic`, (!(channel.topic===null)) ? channel.topic : `Not Set`)
  }

  cha.send(Embed).catch(console.error)

})


}
