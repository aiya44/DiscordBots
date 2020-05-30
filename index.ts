import * as Discord from "discord.js";
const client = new Discord.Client();
import dotenv from "dotenv";

dotenv.config();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel instanceof Discord.DMChannel) return;

  let welcomeChannel = message.member?.guild.channels.cache.find(
    (channel) => channel.name === "welcome"
  ) as Discord.TextChannel;

  if (welcomeChannel === message.channel) {
    if (message.content.toLowerCase() === "i would like a role") {
      message
        .reply(
          `Hi, please let us know which role you are intested in: \n :pig: pig \n :frog: frog \n :chicken: chicken \n`
        )
        .then((result: any) => {
          result.react("🐷");
          result.react("🐸");
          result.react("🐔");
        });
    } else {
      message.reply(
        `If you are interested in a role please type: I would like a role `
      );
    }
  } else return;
});

client.on("messageReactionAdd", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case "🐷":
      if (reaction.message.channel instanceof Discord.DMChannel) return;
      let pigRole = reaction.message.channel.guild.roles.cache.find(
        (role) => role.id == "716059015083196487"
      );
      if (pigRole) {
        let memberRole = reaction.message.guild?.members.cache.find(
          (member) => member.user.id === user.id
        );
        if (memberRole) {
          memberRole.roles.add(pigRole);
        }
      }

      break;
    case "🐸":
      if (reaction.message.channel instanceof Discord.DMChannel) return;
      let frogRole = reaction.message.channel.guild.roles.cache.find(
        (role) => role.id == "716059162425163946"
      );
      if (frogRole) {
        let memberRole = reaction.message.guild?.members.cache.find(
          (member) => member.user.id === user.id
        );
        if (memberRole) {
          memberRole.roles.add(frogRole);
        }
      }
      break;
    case "🐔":
      if (reaction.message.channel instanceof Discord.DMChannel) return;
      let chickenRole = reaction.message.channel.guild.roles.cache.find(
        (role) => role.id == "716059202929426453"
      );
      if (chickenRole) {
        let memberRole = reaction.message.guild?.members.cache.find(
          (member) => member.user.id === user.id
        );
        if (memberRole) {
          memberRole.roles.add(chickenRole);
        }
      }
      break;
  }
});

client.login(process.env.DISCORD_LOGIN);
