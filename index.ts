import * as Discord from "discord.js";
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {

  // console.log("these r rollles", message.channel.guild.roles);
  if (message.author.bot) {
    return;
  } else {
    message.reply(message.content);
  }

  console.log(message.guild.emojis); 
  if (message.content === '!react') {
    message.react('😄');
  }



  if (message.author.bot) {
    return;
  } else {
    message.reply(message.content);
  }








});

client.login("NzEzODMxMDQ5OTAxMTEzMzk3.Xsmj_w.-Q5kFMojzMOeK4T4Qao6QN_y7wY");
