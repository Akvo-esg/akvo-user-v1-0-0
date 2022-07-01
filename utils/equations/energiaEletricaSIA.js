export function calc(anoInventario, consumoAnual) {

    if (anoInventario >= 2011 && anoInventario <= 2015) {

        const fatoresEmissao = {
            "2011": 0.4148,
            "2012": 0.7125,
            "2013": 0.8726,
            "2014": 0.8151,
            "2015": 0.8438,
        }

        const emissaoTotal = Number(consumoAnual) * fatoresEmissao[anoInventario]

        const emissoesCO2_F = emissaoTotal
        const emissoesCH4_F = 0
        const emissoesN2O_F = 0
        const emissoesCO2_B = 0
        const emissoesCH4_B = 0
        const emissoesN2O_B = 0
        const emissoesTotais = emissaoTotal
        const emissoesBiogenicas = 0

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

    } else {
        return {
            emissoesCO2_F: 0,
            emissoesCH4_F: 0,
            emissoesN2O_F: 0,
            emissoesCO2_B: 0,
            emissoesCH4_B: 0,
            emissoesN2O_B: 0,
            emissoesTotais: 0,
            emissoesBiogenicas: 0
        }
    }


}