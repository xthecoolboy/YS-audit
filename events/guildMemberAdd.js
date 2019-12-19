const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,guildMember) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = guildMember.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)


  guildMember.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setColor(settings.colors.embedDefault)
  .setTimestamp()
  .setAuthor(`A new member has joined!`,guildMember.user.displayAvatarURL)
  .setThumbnail(guildMember.user.displayAvatarURL)
  .setFooter(`ID: ${audited.id}`)
  .setDescription(`${guildMember} - ${guildMember.displayName}`)

  cha.send(Embed).catch(console.error)
})

}
