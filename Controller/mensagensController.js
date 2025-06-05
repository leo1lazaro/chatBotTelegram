const interfaceMsg = require('../Services/itensSubMenu.js')
const {
    apresentacao,
    apresentacao2, 
    opcoesIniciais, 
    windFlagsOpcoes, 
    bannersOpcoes, 
    outrosServicosOpcoes, 
    tituloSubmenu, 
    mensagemExit
} = require('../Models/mensagensModels')

//mensagens que serão enviadas em cada etapa
exports.mensagemApresentacao = apresentacao;
exports.mensagemPosApresentacao = apresentacao2 + interfaceMsg(opcoesIniciais) + mensagemExit;
exports.mensagemWindFlags1 = tituloSubmenu + interfaceMsg(windFlagsOpcoes) + mensagemExit;
exports.mensagemBanners1 = tituloSubmenu + interfaceMsg(bannersOpcoes) + mensagemExit;
exports.mensagemOutrosServiços = tituloSubmenu + interfaceMsg(outrosServicosOpcoes) + mensagemExit;