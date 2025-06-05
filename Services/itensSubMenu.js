//função que pega todos os itens do template e monta o submenu
function interfaceMsg(opcoes){
    let i = 0
    const arrMsgInterface = []
    opcoes.map((item)=>{
        const mensagemPersonalizada = i+1 +'- '+ opcoes[i] + '\n';
        arrMsgInterface.push(mensagemPersonalizada)
        i++
    })
    return arrMsgInterface.map(item => item)
}

module.exports = interfaceMsg