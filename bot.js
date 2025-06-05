//importando o .env
require('dotenv').config()

//importando a library do bot telegram
const TelegramBot = require('node-telegram-bot-api');

const { mensagemPosApresentacao, mensagemBanners1, mensagemWindFlags1, mensagemOutrosServiços, mensagemApresentacao } = require('./Controller/mensagensController.js')
const reutilizarTextoNaMensagem = require('./Services/reutilizarTextoNaMensagem.js');

//instanciando o bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

//importante controlador de estado
let userData = {}

bot.on('message', (msg)=>{
    const input = msg.text;
    const idChat = msg.chat.id;
    
    if(input == 'sair' || input == 'Sair'){
        userData[idChat] = {}
        bot.sendMessage(idChat, mensagemApresentacao)
        userData[idChat] = {etapa: 'menu', data:{}}
        return
    }

    if(!userData[idChat]){
        bot.sendMessage(idChat, mensagemApresentacao)
        userData[idChat] = {etapa: 'menu', data:{}}
        return
    }


    switch(userData[idChat].etapa){
        case 'menu':
            bot.sendMessage(idChat, reutilizarTextoNaMensagem(input) + mensagemPosApresentacao)
            userData[idChat] = {
                etapa: 'menu.1', 
            }
        break;
        case 'menu.1': {

            userData[idChat] = {
                ...userData[idChat],
                data: {
                    opcaoEscolhida1: input
                }
            }

            if(userData[idChat].data.opcaoEscolhida1 === '1'){
                bot.sendMessage(idChat, mensagemWindFlags1)
                return
            }
            else if(userData[idChat].data.opcaoEscolhida1 == '2'){
                bot.sendMessage(idChat, bannersOpcoes)
                return
            }
            else if(userData[idChat].data.opcaoEscolhida1 == '3'){
                bot.sendMessage(idChat, 'escolheuopcao3')
                return
            }else{
                bot.sendMessage(idChat, 'Limite-se somente as opções disponíveis')
            }
        }
        default:
            userData[idChat] = {...userData[idChat], etapa: 'menu'}
            bot.sendMessage(idChat,'ratomanocu')
            break
    }
})
