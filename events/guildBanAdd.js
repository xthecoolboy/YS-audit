const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,guild,user) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)
  guild.fetchAuditLogs().then(audit => {
    const audited = audit.entries.first()
    const Embed = new Discord.RichEmbed()
    .setAuthor(`A member was banned!`,user.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .setDescription(`${user} was banned!`)
    .setColor(settings.colors.embedDefault)
    .setFooter(`ID: ${audited.id}`)
    .setTimestamp()

    cha.send(Embed).catch(console.error)
  })
}
