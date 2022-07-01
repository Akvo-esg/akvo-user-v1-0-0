
export function calc(GEEId, cargaString, capacidadeString, recargaString, recuperadaString, unidSetorPrimario, fonteEmissao, fatoresEmissao) {

    // console.log(GEEId, cargaString, capacidadeString, recargaString, recuperadaString, unidSetorPrimario, fonteEmissao, fatoresEmissao)

    const carga = Number(cargaString)
    const capacidade = Number(capacidadeString)
    const recarga = Number(recargaString)
    const recuperada = Number(recuperadaString)

    const fatoresEmissaoList = fatoresEmissao.find(elem => elem.fonteEmissao === 'Emissões Fugitivas')

    const fatoresCombustivel = fatoresEmissaoList.data.find(elem => elem._id === GEEId)

    console.log(fatoresCombustivel)

    const emissoesTotais = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000

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
        emissoesCO2_F = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (GEEId === "2") {
        emissoesCH4_F = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (GEEId === "3") {
        emissoesN2O_F = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (Number(GEEId) >= 4 && Number(GEEId) <= 22) {
        emissoesHFC = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (GEEId === "23") {
        emissoesSF6 = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (GEEId === "24") {
        emissoesNF3 = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (Number(GEEId) >= 25 && Number(GEEId) <= 32) {
        emissoesPFC = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (GEEId === "33") {
        emissoesSF5CF3 = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
    }

    if (GEEId === "34") {
        emissoesPerfluorociclopropano = ((carga - capacidade) * Number(fatoresCombustivel.gwp) + recarga * Number(fatoresCombustivel.gwp) + (capacidade - recuperada) * Number(fatoresCombustivel.gwp)) / 1000
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