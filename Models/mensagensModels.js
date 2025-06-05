const apresentacao = "Olá me chamo Bot Lorran Hetero flex, qual o seu nome? \n"
const apresentacao2 = " Seja muito bem vindo, como posso te ajudar hoje?\n \n"
const tituloSubmenu = "Selecione uma das opções abaixo \n \n"
const mensagemExit = "digite 'sair' para voltar \n"

const opcoesIniciais = ['WindFlags(bandeiras)\n' ,'Banners\n','Outros Serviços\n']
//raciocinio windflags
const windFlagsOpcoes = ['Consultar tamanhos e valores \n' , 'Informação sobre seu pedido em andamento\n','Falar diretamente com a empresa?\n','voltar ao menu anterior\n'] 
//raciocinio banners
const bannersOpcoes = ['Consultar tamanhos e valores\n', 'Informação sobre seu pedido em andamento\n','Falar diretamente com a empresa?\n','voltar ao menu anterior\n'] 
//raciocionio Outros serviços
const outrosServicosOpcoes = ['Ser nosso parceiro\n' , 'Fazer uma reclamação\n', 'Falar diretamente com nossa empresa\n', 'voltar ao menu anterior\n']
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