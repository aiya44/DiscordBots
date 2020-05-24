import * as Discord from "discord.js";
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message: any) => {
  // console.log("these r rollles", message.channel.guild.roles);
  if (message.author.bot) {
    return;
  } else {
    message
      .reply(
        `Hi, please let us know which role you are intested in: \n :pig: pig \n :frog: frog \n :chicken: chicken \n`
      )
      .then((result: any) => {
        result.react("🐷");
        result.react("🐸");
        result.react("🐔");
      });
  }

  // console.log(message.guild.emojis);
  // if (message.content === "!react") {
  //   message.react("😄");
  // }

  // console.log(message);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }

  // console.log(
  //   `${reaction.message}'s message "${reaction.message.content}" gained a reaction!`
  // );
  // console.log(
  //   `this is reactions: ${reaction} `
  // );
});

client.login("NzEzODMxMDQ5OTAxMTEzMzk3.Xsmj_w.-Q5kFMojzMOeK4T4Qao6QN_y7wY");
