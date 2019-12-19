const settings = require('./../botconfig.json')
const Discord = require('discord.js');
const timeConvert = require('./../utils/timeConvert.js')

module.exports = async (bot,oldGuildMember,newGuildMember) => {
const logs = ['logs','mod-logs','modlog','audits']
const isFemale = oldGuildMember.roles.some(r=>r.name==='Female')
var cha = oldGuildMember.guild.channels.find(c=>logs.includes(c.name))
if (!cha) return console.log(`Channel Not Found!`)
var changes = '';

  oldGuildMember.guild.fetchAuditLogs().then(audit => {
  const audited = audit.entries.first()
  const Embed = new Discord.RichEmbed()
  .setAuthor(`Member Updated`,newGuildMember.user.displayAvatarURL)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()
  .setFooter(`ID: ${audited.id}`)

  if (!(oldGuildMember.displayName===newGuildMember.displayName)){
    if (newGuildMember.displayName===oldGuildMember.user.username){
      changes = `**${oldGuildMember} cleared ${(isFemale) ? `her`:`his`} nickname**`
    }else changes = `**${oldGuildMember} changed ${(isFemale) ? `her`:`his`} nickname to ${"`"+newGuildMember.displayName+"`"}**`
  } else if (oldGuildMember.roles.size<newGuildMember.roles.size){
    changes = `**${oldGuildMember} was given the ${"`"+audited.changes[0].new[0].name+"`"} role!**`
  } else if (oldGuildMember.roles.size>newGuildMember.roles.size){
    changes = `**${oldGuildMember} was removed from the ${"`"+audited.changes[0].new[0].name+"`"} role!**`
  } 

  if (changes===''){
    return;
  }

  Embed.setDescription(`${changes}`)


  cha.send(Embed).catch(console.error)

  })
  }
