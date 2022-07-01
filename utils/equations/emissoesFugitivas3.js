
export function calc(GEEId, estoqueInicio, estoqueFinal, qtdComprada, unidSetorPrimario, fonteEmissao, fatoresEmissao) {

    const fatoresEmissaoList = fatoresEmissao.find(elem => elem.fonteEmissao === 'Emissões Fugitivas')

    const fatoresCombustivel = fatoresEmissaoList.data.find(elem => elem._id === GEEId)

    const emissoesTotais = ((Number(estoqueInicio) - Number(estoqueFinal) + Number(qtdComprada)) * Number(fatoresCombustivel.gwp)) / 1000

    let emissoesCO2_F = 0
    let emissoesCH4_F = 0
    let emissoesN2O_F = 0
    let emissoesHFC = 0
    let emissoesSF6 = 0
    let emissoesNF3 = 0
    let emissoesPFC = 0
    let emissoesSF5CF3 = 0
    let emissoesPerfluorociclopropano = 0


    if (GEEId === "23") {
        emissoesSF6 = ((Number(estoqueInicio) - Number(estoqueFinal) + Number(qtdComprada)) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "24") {
        emissoesNF3 = ((Number(estoqueInicio) - Number(estoqueFinal) + Number(qtdComprada)) * Number(fatoresCombustivel.gwp)) / 1000
    }


    return {
        emissoesCO2_F,
        emissoesCH4_F,
        emissoesN2O_F,
        emissoesHFC,
        emissoesSF6,
        emissoesNF3,
        emissoesPFC,
        emissoesSF5CF3,
        emissoesPerfluorociclopropano,
        emissoesTotais,
    }

}