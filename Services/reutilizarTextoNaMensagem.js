//função que pega o primeiro nome do usuario e põe em letra maiuscula
function reutilizarTextoNaMensagem(texto){
    const primeiroNome = texto.split(' ')
    return 'Olá '+ primeiroNome[0].toUpperCase();
}

module.exports = reutilizarTextoNaMensagem