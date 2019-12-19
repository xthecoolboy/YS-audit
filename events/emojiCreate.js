const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,emoji) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = emoji.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)
emoji.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setAuthor(`New Emoji Added`,audited.executor.displayAvatarURL)
  .addField(`Uploader`, `**${audited.executor.username}**#${audited.executor.discriminator}`,true)
  .addField(`Usage`, "`:"+emoji.name+":`")
  .setThumbnail(emoji.url)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()

cha.send(Embed).catch(console.error)

})


}
