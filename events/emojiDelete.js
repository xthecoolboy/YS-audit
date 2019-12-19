const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,emoji) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = emoji.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)
emoji.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setAuthor(`Emoji Deleted`,audited.executor.displayAvatarURL)
  .addField(`Deleted By`, `**${audited.executor.username}**#${audited.executor.discriminator}`,true)
  .addField(`Emoji Usage`, "`:"+emoji.name+":`")
  .setThumbnail(emoji.url)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()

cha.send(Embed).catch(console.error)

})


}
