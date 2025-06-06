require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');

const {
  mensagemPosApresentacao,
  mensagemBanners1,
  mensagemWindFlags1,
  mensagemOutrosServiços,
  mensagemApresentacao
} = require('./Controller/mensagensController.js');

const reutilizarTextoNaMensagem = require('./Services/reutilizarTextoNaMensagem.js');
const inserirNovaOpcaoEscolhida = require('./Services/inserirNovaOpcaoEscolhida.js');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });



const fs = require('fs').promises


async function escreveNoDoc(dadosUser, dadosMsg, dataLog) {
  const linha = `Dados User: ${dadosUser}\n Texto Escrito: ${dadosMsg}\n - Data/Hora: ${dataLog}\n\n`
  try {
    await fs.appendFile('./registroDeUtilização.txt', linha);
    return 'log registrado'
  }catch(error){
    console.error(error);
    return 'Error';
  }
  
}

const userData = {};

bot.on('message', (msg) => {
  const input = msg.text;
  const idChat = msg.chat.id;
  const idPessoa = msg.from.id
  const registroData = new Date()
  const registroDataHoraCompleto = registroData.toLocaleString('pt-BR')
  escreveNoDoc(idPessoa, input, registroDataHoraCompleto);

  if (input.toLowerCase() === 'sair') {
    userData[idChat] = { etapa: 'menu', data: {} };
    bot.sendMessage(idChat, mensagemApresentacao);
    return;
  }

  if (!userData[idChat]) {
    userData[idChat] = { etapa: 'menu', data: {} };
    bot.sendMessage(idChat, mensagemApresentacao);
    return;
  }

  switch (userData[idChat].etapa) {
    case 'menu':
      bot.sendMessage(idChat, reutilizarTextoNaMensagem(input) + mensagemPosApresentacao);
      userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu.1'
      };
      break;

    case 'menu.1':
      inserirNovaOpcaoEscolhida(userData, idChat, 'opcaoEscolhida1', input);
      /* userData[idChat] = {
        ...userData[idChat],
        data: {
          ...userData[idChat].data,
          opcaoEscolhida1: input
        }
      }; */

      if (input === '1') {
        bot.sendMessage(idChat, mensagemWindFlags1);
      } else if (input === '2') {
        bot.sendMessage(idChat, mensagemBanners1);
      } else if (input === '3') {
        bot.sendMessage(idChat, mensagemOutrosServiços);
      } else {
        bot.sendMessage(idChat, 'Limite-se somente às opções disponíveis');
        return;
      }

      userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu.2',
      };
      break;

    case 'menu.2':
      inserirNovaOpcaoEscolhida(userData, idChat, 'opcaoEscolhida2', input);
      /*userData[idChat] = {
      ...userData[idChat],
      data: {
        ...userData[idChat].data,
        opcaoEscolhida2: input
      }
    };*/
      if (userData[idChat].data.opcaoEscolhida2 === '1') {
        bot.sendMessage(idChat, 'menu2 opção 1 escolhida');
      } else if (userData[idChat].data.opcaoEscolhida2 === '2') {
        bot.sendMessage(idChat, 'menu2 opção 2 escolhida');
      } else if (userData[idChat].data.opcaoEscolhida2 === '3') {
        bot.sendMessage(idChat, 'menu2 opção 3 escolhida');
      } else {
        bot.sendMessage(idChat, 'Limite-se somente às opções disponíveis');
        return
      }

      userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu.3'
      };
      break;

    default:
      userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu'
      };
      bot.sendMessage(idChat, 'ERRO:\nNão foi possivel processar sua requisição\nDigite qualquer coisa para tentarmos novamente');
      break;
  }
});
