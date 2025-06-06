function mudarEstadoEtapa(userData, idChat, etapa,nomeEtapa){
    userData[idChat] = {
        ...userData[idChat],
        [etapa]: nomeEtapa,
      };
      return userData[idChat];
}

module.exports = mudarEstadoEtapa;