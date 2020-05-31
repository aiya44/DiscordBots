import * as Discord from "discord.js";
const client = new Discord.Client();
import dotenv from "dotenv";

dotenv.config();

const roleMap: { [emoji: string]: string } = {
  "🐷": "716059015083196487",
  "🐸": "716059162425163946",
  "🐔": "716059202929426453",
};

function getChannelByName(guild: Discord.Guild, name: string) {
  return guild.channels.cache.find(
    (channel) => channel.name === name
  ) as Discord.TextChannel;
}

function getWelcomeChannel(guild: Discord.Guild) {
  return getChannelByName(guild, "welcome");
}

function addRoleToMember(
  guild: Discord.Guild,
  member?: Discord.GuildMember,
  roleId?: string
) {
  const availableRoles = guild.roles.cache;
  const roleToAdd = availableRoles.find((role) => role.id === roleId);

  if (!roleToAdd) return;
  if (!member) return;

  member.roles.add(roleToAdd);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type !== "text") return;
  if (!message.member) return;

  const welcomeChannel = getWelcomeChannel(message.member.guild);

  if (welcomeChannel !== message.channel) return;

  if (message.content.toLowerCase() === "i would like a role") {
    message
      .reply(
        `Hi, please let us know which role you are intested in: \n :pig: pig \n :frog: frog \n :chicken: chicken \n`
      )
      .then((msg) => {
        Object.keys(roleMap).forEach((emoji) => {
          msg.react(emoji);
        });
      });
  } else {
    message.reply(
      `If you are interested in a role please type: I would like a role`
    );
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.channel instanceof Discord.DMChannel) return;

  const guild = reaction.message.channel.guild;
  const member = reaction.message.guild?.members.cache.find(
    (m) => m.user.id === user.id
  );
  const roleId = roleMap[reaction.emoji.name];

  if (roleId) {
    addRoleToMember(guild, member, roleId);
  }
});

client.login(process.env.DISCORD_LOGIN);
