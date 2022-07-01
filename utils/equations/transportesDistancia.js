export function calc(tipoFrotaId, anoFrota, consumoAnual, fonteEmissao, fatoresEmissao, tipoCalculo) {

    const fatoresEmissaoList = fatoresEmissao.filter(elem => elem.fonteEmissao === fonteEmissao)
    const fatoresEmissaoTipoCalculo = fatoresEmissaoList.find(elem => elem.tipoCalculo === "Por tipo e ano de fabricacao")

    const fatoresCombustivel = fatoresEmissaoTipoCalculo.data[anoFrota].find(elem => elem._id === tipoFrotaId)

    const emissoesCO2_F = (consumoAnual / fatoresCombustivel.autonomia) * fatoresCombustivel.CO2_F * (1 - fatoresCombustivel.fatorProporcao) / 1000
    const emissoesCH4_F = (consumoAnual / fatoresCombustivel.autonomia) * fatoresCombustivel.CH4 / 1000
    const emissoesN2O_F = (consumoAnual / fatoresCombustivel.autonomia) * fatoresCombustivel.N2O / 1000

    const emissoesCO2_B = (consumoAnual / fatoresCombustivel.autonomia) * fatoresCombustivel.CO2_B * fatoresCombustivel.fatorProporcao / 1000
    const emissoesCH4_B = 0
    const emissoesN2O_B = 0

    const emissoesTotais = emissoesCO2_F + emissoesCH4_F * 25 + emissoesN2O_F * 298

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
