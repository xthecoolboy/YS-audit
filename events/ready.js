
module.exports = async bot => {

  console.log(`'${bot.user.username}' is Now online!`);
  const Activities =[`Monitoring Server Activities`,`on Yumemiru Shoujo`,`SeishunButaBots.org`]
    setInterval(() => {
      bot.user.setActivity(Activities[Math.floor(Math.random()*(Activities.length-1))]);
  }, 30000);

}
