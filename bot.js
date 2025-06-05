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
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const userData = {};

bot.on('message', (msg) => {
  const input = msg.text;
  const idChat = msg.chat.id;

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
      userData[idChat] = {
        ...userData[idChat],
        data: {
          ...userData[idChat].data,
          opcaoEscolhida1: input
        }
      };

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
        userData[idChat] = {
        ...userData[idChat],
        data: {
          ...userData[idChat].data,
          opcaoEscolhida2: input
        }
      };
      if (userData[idChat].data.opcaoEscolhida2 === '1') {
        bot.sendMessage(idChat, 'menu2 opção 1 escolhida');
      } else if (userData[idChat].data.opcaoEscolhida2 === '2') {
        bot.sendMessage(idChat, 'menu2 opção 2 escolhida');
      } else if (userData[idChat].data.opcaoEscolhida2 === '3') {
        bot.sendMessage(idChat, 'menu2 opção 3 escolhida');
      }else {
        bot.sendMessage(idChat, 'Opção inválida, tente novamente');
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
      bot.sendMessage(idChat, 'Não foi possivel processar sua requisição\n Digite qualquer coisa para tentarmos novamente');
      break;
  }
});
