const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,oldEmoji,newEmoji) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = oldEmoji.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)


oldEmoji.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setAuthor(`Emoji Updated`,audited.executor.displayAvatarURL)
  .addField(`Edited By`, `**${audited.executor.username}**#${audited.executor.discriminator}`,true)
  .addField(`Changes`,`Emoji name edited from ${"`"+oldEmoji.name+"`"} to ${"`"+newEmoji.name+"`"}`)
  .addField(`Outdated Usage`, "`:"+oldEmoji.name+":`")
  .addField(`New Usage`, "`:"+newEmoji.name+":`")
  .setThumbnail(newEmoji.url)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()
  .setFooter(`ID: ${audited.id}`)

cha.send(Embed).catch(console.error)

})


}
