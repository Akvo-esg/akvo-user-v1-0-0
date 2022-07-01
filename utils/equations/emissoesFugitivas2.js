
export function calc(GEEId, variacaoEstoqueString, qtdTransferidaString, mudancaCapacidadeString, unidSetorPrimario, fonteEmissao, fatoresEmissao) {

    const variacaoEstoque = Number(variacaoEstoqueString)
    const qtdTransferida = Number(qtdTransferidaString)
    const mudancaCapacidade = Number(mudancaCapacidadeString)

    const fatoresEmissaoList = fatoresEmissao.find(elem => elem.fonteEmissao === 'Emissões Fugitivas')

    const fatoresCombustivel = fatoresEmissaoList.data.find(elem => elem._id === GEEId)

    const emissoesTotais = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000

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
        emissoesCO2_F = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "2") {
        emissoesCH4_F = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "3") {
        emissoesN2O_F = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (Number(GEEId) >= 4 && Number(GEEId) <= 22) {
        emissoesHFC = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "23") {
        emissoesSF6 = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "24") {
        emissoesNF3 = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (Number(GEEId) >= 25 && Number(GEEId) <= 32) {
        emissoesPFC = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "33") {
        emissoesSF5CF3 = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
    }

    else if (GEEId === "34") {
        emissoesPerfluorociclopropano = ((variacaoEstoque + qtdTransferida - mudancaCapacidade) * Number(fatoresCombustivel.gwp)) / 1000
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