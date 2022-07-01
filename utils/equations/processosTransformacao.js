
export function calc(GEEId, qtd, unidSetorPrimario, fonteEmissao, fatoresEmissao) {

    const fatoresEmissaoList = fatoresEmissao.find(elem => elem.fonteEmissao === fonteEmissao)

    const fatoresCombustivel = fatoresEmissaoList.data.find(elem => elem._id === GEEId)

    const emissoesTotais = qtd * fatoresCombustivel.gwp

    let emissoesCO2_F = 0
    let emissoesCH4_F = 0
    let emissoesN2O_F = 0
    let emissoesHFC = 0
    let emissoesSF6 = 0
    let emissoesNF3 = 0
    let emissoesPFC = 0
    let emissoesSF5CF3 = 0
    let emissoesPerfluorociclopropano = 0

    if (GEEId === "1") {
        emissoesCO2_F = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId === "2") {
        emissoesCH4_F = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId === "3") {
        emissoesN2O_F = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId >= "4" && GEEId <= "22") {
        emissoesHFC = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId === "23") {
        emissoesSF6 = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId === "24") {
        emissoesNF3 = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId >= "25" && GEEId <= "32") {
        emissoesPFC = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId === "33") {
        emissoesSF5CF3 = qtd * fatoresCombustivel.gwp
    }

    else if (GEEId === "34") {
        emissoesPerfluorociclopropano = qtd * fatoresCombustivel.gwp
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