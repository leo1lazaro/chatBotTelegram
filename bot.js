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
const mudarEstadoEtapa = require('./Services/mudarEstadoEtapa.js');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const fs = require('fs').promises

async function verificaOuCriaCabecalho() {
  try {
    // Tenta acessar o arquivo
    await fs.access('./registroDeUtilização.txt');

    //  lê o conteúdo
    const conteudo = await fs.readFile('./registroDeUtilização.txt', 'utf-8');

    if (conteudo.trim() === '') {
      // se o arquivo existir mas nao possuir nada
      await fs.writeFile('./registroDeUtilização.txt', 'ID;Mensagem;Data/Hora\n', 'utf-8');
      console.log('Cabeçalho escrito no arquivo vazio.');
    } else {
      console.log('Arquivo já contém conteúdo.');
    }

  } catch (err) {
    // Se der erro no accesso(caso não exista ou nao ache o diretório), o arquivo não existe ele cria com cabeçalho
    await fs.writeFile('./registroDeUtilização.txt', 'ID;Mensagem;Data/Hora\n', 'utf-8');
    console.log('Arquivo criado com cabeçalho.');
  }
}

verificaOuCriaCabecalho();

async function escreveNoDoc(dadosUser, dadosMsg, dataLog) {
  const linha = `${dadosUser};${dadosMsg};${dataLog}\n`
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
    userData[idChat] = { etapa: 'menu', data: {}};
    bot.sendMessage(idChat, mensagemApresentacao);
    return;
  }

  if (!userData[idChat]) {
    userData[idChat] = { etapa: 'menu', data: {} };//qual seu nome?
    bot.sendMessage(idChat, mensagemApresentacao);
    return;
  }

  switch (userData[idChat].etapa) {
    case 'menu':
      bot.sendMessage(idChat, reutilizarTextoNaMensagem(input) + mensagemPosApresentacao);
      mudarEstadoEtapa(userData, idChat, 'etapa', 'menu.1');
      /*userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu.1'
      }; */
      console.log(userData[idChat].etapa);
      
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

      mudarEstadoEtapa(userData, idChat, 'etapa', 'menu.2');
      /* userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu.2',
      }; */
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
      mudarEstadoEtapa(userData, idChat, 'etapa', 'menu.3')
      /* userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu.3'
      }; */
      break;

    default:
      mudarEstadoEtapa(userData, idChat, 'etapa', 'menu')
      /* userData[idChat] = {
        ...userData[idChat],
        etapa: 'menu'
      }; */
      bot.sendMessage(idChat, 'ERRO:\nNão foi possivel processar sua requisição\nDigite qualquer coisa para tentarmos novamente');
      break;
  }
});
