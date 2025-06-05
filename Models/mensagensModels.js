const apresentacao = "Olá me chamo Bot Lorran Hetero flex, qual o seu nome? \n"
const apresentacao2 = " Seja muito bem vindo, como posso te ajudar hoje\n"
const tituloSubmenu = "Selecione uma das opções abaixo \n"
const mensagemExit = "digite 'sair' para voltar"

const opcoesIniciais = ['WindFlags(bandeiras)' ,'Banners','Outros Serviços']
//raciocinio windflags
const windFlagsOpcoes = ['Consultar tamanhos e valores' , 'Informação sobre seu pedido em andamento','Falar diretamente com a empresa?','voltar ao menu anterior'] 
//raciocinio banners
const bannersOpcoes = ['Consultar tamanhos e valores', 'Informação sobre seu pedido em andamento','Falar diretamente com a empresa?','voltar ao menu anterior'] 
//raciocionio Outros serviços
const outrosServicosOpcoes = ['Ser nosso parceiro' , 'Fazer uma reclamação', 'Falar diretamente com nossa empresa', 'voltar ao menu anterior']
//titulo genérico para submenu


module.exports = {
    apresentacao,
    apresentacao2,
    opcoesIniciais,
    windFlagsOpcoes,
    bannersOpcoes,
    outrosServicosOpcoes,
    tituloSubmenu,
    mensagemExit
}