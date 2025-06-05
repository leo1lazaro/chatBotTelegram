//função que pega todos os itens do template e monta o submenu
function interfaceMsg(opcoes) {
    let mensagem = '';
    opcoes.forEach((item, index) => {
        mensagem += `${index + 1} - ${item}\n`;
    });
    return mensagem;
}

module.exports = interfaceMsg;