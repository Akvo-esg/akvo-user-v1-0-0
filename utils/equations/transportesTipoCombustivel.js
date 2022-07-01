export function calc(combustivelId, consumoAnual, fonteEmissao, fatoresEmissao, tipoCalculo) {

    const fatoresEmissaoList = fatoresEmissao.filter(elem => elem.fonteEmissao === fonteEmissao)
    let fatoresEmissaoTipoCalculo = fatoresEmissaoList.find(elem => elem.tipoCalculo === tipoCalculo)

    if (!fatoresEmissaoTipoCalculo) {
        fatoresEmissaoTipoCalculo = fatoresEmissaoList.find(elem => elem.transporte === tipoCalculo)
    }

    const fatoresCombustivel = fatoresEmissaoTipoCalculo.data.find(elem => elem._id === combustivelId)

    const emissoesCO2_F = consumoAnual * fatoresCombustivel.CO2_F * (1 - fatoresCombustivel.fatorProporcao) / 1000
    const emissoesCH4_F = consumoAnual * fatoresCombustivel.CH4_F * (1 - fatoresCombustivel.fatorProporcao) / 1000
    const emissoesN2O_F = consumoAnual * fatoresCombustivel.N2O_F * (1 - fatoresCombustivel.fatorProporcao) / 1000

    const emissoesCO2_B = consumoAnual * fatoresCombustivel.CO2_B * fatoresCombustivel.fatorProporcao / 1000
    const emissoesCH4_B = consumoAnual * fatoresCombustivel.CH4_B * fatoresCombustivel.fatorProporcao / 1000
    const emissoesN2O_B = consumoAnual * fatoresCombustivel.N2O_B * fatoresCombustivel.fatorProporcao / 1000

    const emissoesTotais = emissoesCO2_F + emissoesCH4_F * 25 + emissoesN2O_F * 298 + emissoesCH4_B * 25 + emissoesN2O_B * 298

    const emissoesBiogenicas = emissoesCO2_B

    return {
        emissoesCO2_F,
        emissoesCH4_F,
        emissoesN2O_F,
        emissoesCO2_B,
        emissoesCH4_B,
        emissoesN2O_B,
        emissoesTotais,
        emissoesBiogenicas
    }
}
