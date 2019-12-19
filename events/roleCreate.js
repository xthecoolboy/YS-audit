const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,role) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = role.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)


role.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setAuthor(`New role Added`,audited.executor.displayAvatarURL)
  .addField(`Created By`, `**${audited.executor.username}**#${audited.executor.discriminator}`,true)
  .addField(`Role Name with Color`,role,true)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()
  .setFooter(`ID: ${audited.id} | Role ID: ${role.id}`)

cha.send(Embed).catch(console.error)

})


}
