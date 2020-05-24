import * as Discord from "discord.js";
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel instanceof Discord.DMChannel) return;

  const role = message.channel.guild.roles.cache.find(
    (role) => role.name === "Lol"
  );
  const member = message.mentions.members.first();
  console.log("this is memeber", member);
  console.log("this is role", role);

  //member.roles.push("714171081740648471");

  // console.log("these r rollles", message.channel.guild.roles);

  // var role:any = message.guild.roles.find( (role: { name: string; }) => role.name === "Lol");
  // message.member.addRole(role);

  // console.log(message.guild);

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
    message.reply("Please tell me which role you would like.");
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  switch (reaction.emoji.name) {
    case "🐷":
      console.log("pig emoji");
      break;
    case "🐸":
      console.log("frog");
      break;
    case "🐔":
      console.log("chicken");
      break;
  }
});

client.login("NzEzODMxMDQ5OTAxMTEzMzk3.Xsmj_w.-Q5kFMojzMOeK4T4Qao6QN_y7wY");
