const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpa uma quantidade específica de mensagens")
        .addIntegerOption(option => 
            option.setName("quantidade") // Corrigido o nome para "quantidade"
            .setDescription("Quantidade de mensagens a serem limpas")
            .setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply("Você não tem permissão para usar este comando.");
        }

        const quantity = interaction.options.getInteger("quantidade");
        if (quantity <= 0 || quantity > 100) {
            return interaction.reply("A quantidade deve estar entre 1 e 100.");
        }

        await interaction.channel.bulkDelete(quantity + 1);
        await interaction.reply(`Foram excluídas ${quantity} mensagens.`);
    }
}
