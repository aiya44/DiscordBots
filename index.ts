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
  function grantRoleToUser(roleid: string) {
    if (reaction.message.channel instanceof Discord.DMChannel) return;
    let SelectedRole = reaction.message.channel.guild.roles.cache.find(
      (role) => role.id == roleid
    );
    if (SelectedRole) {
      let memberRole = reaction.message.guild?.members.cache.find(
        (member) => member.user.id === user.id
      );
      if (memberRole) {
        memberRole.roles.add(SelectedRole);
      }
    }
  }

  switch (reaction.emoji.name) {
    case "🐷":
      grantRoleToUser("716059015083196487");
      break;
    case "🐸":
      grantRoleToUser("716059162425163946");
      break;
    case "🐔":
      grantRoleToUser("716059202929426453");
      break;
  }
});

client.login(process.env.DISCORD_LOGIN);
