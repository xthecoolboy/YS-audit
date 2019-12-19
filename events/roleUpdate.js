const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,oldRole,newRole) => {
  const logs = ['logs','mod-logs','modlog','audits']
  var cha = oldRole.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)


oldRole.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setAuthor(`A Role was Updated`,audited.executor.displayAvatarURL)
  .addField(`Updated By`, `**${audited.executor.username}**#${audited.executor.discriminator}`,true)
  .addField(`Updated Role`,oldRole,true)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()
  .setFooter(`ID: ${audited.id} | Role ID: ${oldRole.id}`)

var changes = ''
if (oldRole.name!==newRole.name){
  changes += `• Changed **role name** from ${"`"+oldRole.name+"`"} to ${"`"+newRole.name+"`"}\n\n`
}
if (oldRole.hexColor!==newRole.hexColor){
  changes += `• Changed **role color** from ${"`"+oldRole.hexColor+"`"} to ${"`"+newRole.hexColor+"`"}\n\n`
}
if (oldRole.hoisted!==newRole.hoisted){
  if (newRole.hoisted){
    changes += `• Role Hoist enabled\n\n`
  } else  changes += `• Role Hoist disabled\n\n`
}
if (oldRole.mentionable!==newRole.mentionable){
  if (newRole.mentionable){
    changes += `• Role Mention enabled\n\n`
  } else changes += `• Role mention disabled\n\n`
}
if (changes===''){
  return;
} else {
Embed.addField(`Changes`,changes)
cha.send(Embed).catch(console.error)
}
})


}
