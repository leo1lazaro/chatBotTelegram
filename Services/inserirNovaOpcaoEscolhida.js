function inserirNovaOpcaoEscolhida(userData, idChat, opcao, nomeOpcao ) {
  userData[idChat] = {
    ...userData[idChat],
    data: {
      ...userData[idChat].data,
      [opcao]: nomeOpcao
    }
  };
  return userData[idChat]
}

module.exports = inserirNovaOpcaoEscolhida;