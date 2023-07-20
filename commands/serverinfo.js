const { SlashCommandBuilder } = require('discord.js');



module.exports ={
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Exibe informaçºoe sobre o servidor"),

    async execute(interaction){
        const guild = interaction.guild;
        await interaction.reply(`Nome do servidor ${guild.name}\n${guild.memberCount}`)
    }
}

