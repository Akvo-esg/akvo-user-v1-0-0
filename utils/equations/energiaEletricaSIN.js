export function calc(
    fatoresEmissao,
    anoInventario,
    periodoConsumo,
    consumoAnual,
    consumoJan,
    consumoFev,
    consumoMar,
    consumoAbr,
    consumoMai,
    consumoJun,
    consumoJul,
    consumoAgo,
    consumoSet,
    consumoOut,
    consumoNov,
    consumoDez
) {
    const fatoresEmissaoSIN = fatoresEmissao.find(elem => elem.fonteEmissao === "FE do SIN")


    if (anoInventario >= 2006 && anoInventario <= 2021) {
        let emissaoTotal = 0
        const fatoresAno = fatoresEmissaoSIN.data.find(elem => elem.ano === anoInventario)

        if (periodoConsumo === 'mensal') {
            emissaoTotal = Number(consumoJan) * Number(fatoresAno.jan) + Number(consumoFev) * Number(fatoresAno.fev) + Number(consumoMar) * Number(fatoresAno.mar) + Number(consumoAbr) * Number(fatoresAno.abr) + Number(consumoMai) * Number(fatoresAno.mai) + Number(consumoJun) * Number(fatoresAno.jun) + Number(consumoJul) * Number(fatoresAno.jul) + Number(consumoAgo) * Number(fatoresAno.ago) + Number(consumoSet) * Number(fatoresAno.set) + Number(consumoOut) * Number(fatoresAno.out) + Number(consumoNov) * Number(fatoresAno.nov) + Number(consumoDez) * Number(fatoresAno.dez)
            
        } else if (periodoConsumo === 'anual') {
            emissaoTotal = Number(consumoAnual) * Number(fatoresAno.fatorMedioAnual)
        }

        

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