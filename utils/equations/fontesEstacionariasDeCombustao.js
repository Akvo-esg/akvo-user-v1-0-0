
export function calc(combustivel, qtd, unidSetorPrimario, fonteEmissao, fatoresEmissao) {
    
    const fatoresEmissaoList = fatoresEmissao.find(elem => elem.fonteEmissao === fonteEmissao)

    if (unidSetorPrimario === 'Eletricidade e Gás') {

        const fatoresCombustivel = fatoresEmissaoList.data.energia.find(elem => elem._id === combustivel)
        const emissoesCO2_F = qtd * fatoresCombustivel.CO2_F / 1000
        const emissoesCH4_F = qtd * fatoresCombustivel.CH4_F / 1000
        const emissoesN2O_F = qtd * fatoresCombustivel.N2O_F / 1000

        const emissoesCO2_B = qtd * fatoresCombustivel.CO2_B / 1000
        const emissoesCH4_B = qtd * fatoresCombustivel.CH4_B / 1000
        const emissoesN2O_B = qtd * fatoresCombustivel.N2O_B / 1000

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

    } else if (unidSetorPrimario === ('Indústria' || 'Construção')) {

        const fatoresCombustivel = fatoresEmissaoList.data.manufaturaOuConstrucao.find(elem => elem._id === combustivel)
        const emissoesCO2_F = qtd * fatoresCombustivel.CO2_F / 1000
        const emissoesCH4_F = qtd * fatoresCombustivel.CH4_F / 1000
        const emissoesN2O_F = qtd * fatoresCombustivel.N2O_F / 1000

        const emissoesCO2_B = qtd * fatoresCombustivel.CO2_B / 1000
        const emissoesCH4_B = qtd * fatoresCombustivel.CH4_B / 1000
        const emissoesN2O_B = qtd * fatoresCombustivel.N2O_B / 1000

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

    } else if (unidSetorPrimario === ('Serviços' || 'Comércio')) {

        const fatoresCombustivel = fatoresEmissaoList.data.comercialOuInstitucional.find(elem => elem._id === combustivel)
        const emissoesCO2_F = qtd * fatoresCombustivel.CO2_F / 1000
        const emissoesCH4_F = qtd * fatoresCombustivel.CH4_F / 1000
        const emissoesN2O_F = qtd * fatoresCombustivel.N2O_F / 1000

        const emissoesCO2_B = qtd * fatoresCombustivel.CO2_B / 1000
        const emissoesCH4_B = qtd * fatoresCombustivel.CH4_B / 1000
        const emissoesN2O_B = qtd * fatoresCombustivel.N2O_B / 1000

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

    } else {  //Agropecuaria e florestal

        const fatoresCombustivel = fatoresEmissaoList.data.residencialAgriculturaFlorestal.find(elem => elem._id === combustivel)
        const emissoesCO2_F = qtd * fatoresCombustivel.CO2_F / 1000
        const emissoesCH4_F = qtd * fatoresCombustivel.CH4_F / 1000
        const emissoesN2O_F = qtd * fatoresCombustivel.N2O_F / 1000

        const emissoesCO2_B = qtd * fatoresCombustivel.CO2_B / 1000
        const emissoesCH4_B = qtd * fatoresCombustivel.CH4_B / 1000
        const emissoesN2O_B = qtd * fatoresCombustivel.N2O_B / 1000

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

}