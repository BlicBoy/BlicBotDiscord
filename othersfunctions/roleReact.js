const { Collection } = require('discord.js');


let messageSent = false;

function sendMessageWithReaction(channel) {
    if(!messageSent){
        channel.send('Reagir aqui para a tag testes').then(message =>{
            message.react('💎')
            messageSent = true
        }) .catch(err => {
            console.error('Erro ao enviar a mensagem:', err);
          });;
    }else{
        console.error('A mensagem já foi enviada anteriormente.');
    }
}


async function handleReaction(reaction, user) {

    if (reaction.emoji.name === '💎'){
        const roleID = '1131382837401092148';
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);

        if(!member){
            console.error('Membro não encontrado.');
            return;
        }

        try {
            const role = guild.roles.cache.get(roleID);
            if (!role) {
              console.error('Cargo não encontrado.');
              return;
            }

            if (member.user.bot) {
                return;
              }
      
            await member.roles.add(role);
            console.log(`Cargo "${role.name}" atribuído ao usuário "${member.user.tag}".`);
          } catch (error) {
            console.error('Erro ao atribuir o cargo:', error);
          }
        
    }
}

async function handleReactionRemove(reaction, user) {
    if (reaction.emoji.name === '💎') {
      const roleID = '1131382837401092148';
      const guild = reaction.message.guild;
      const member = guild.members.cache.get(user.id);
  
      if (!member) {
        console.error('Membro não encontrado.');
        return;
      }
  
      try {
        const role = guild.roles.cache.get(roleID);
        if (!role) {
          console.error('Cargo não encontrado.');
          return;
        }
  
        if (member.user.bot) {
          return;
        }
  
        await member.roles.remove(role);
        console.log(`Cargo "${role.name}" removido do usuário "${member.user.tag}".`);
      } catch (error) {
        console.error('Erro ao remover o cargo:', error);
      }
    }
  }

module.exports = { sendMessageWithReaction, handleReaction, handleReactionRemove };