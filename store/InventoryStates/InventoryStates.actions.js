export function initialValues() {
    return {
        type: 'INITIAL_VALUES',
        payload: {
            unid_id: "",
            unidName: "",
            setorPrimario: "",
            anoInventario: "",
            escopo: "",
            fonteEmissao: ""
        }
    }
}

export function unid_idStore(data) {
    return {
        type: 'UNID_ID',
        payload: data
    }
}

export function unidNameStore(data) {
    return {
        type: 'UNID_NAME',
        payload: data
    }
}

export function anoInventarioStore(data) {
    return {
        type: 'ANO_INVENTARIO',
        payload: data
    }
}

export function setorPrimarioStore(data) {
    return {
        type: 'SETOR_PRIMARIO',
        payload: data
    }
}

export function escopoStore(data) {
    return {
        type: 'ESCOPO',
        payload: data
    }
}
export function fonteEmissaoStore(data) {
    return {
        type: 'FONTE_EMISSAO',
        payload: data
    }
}
export function tipoEmissaoStore(data) {
    return {
        type: 'TIPO_EMISSAO',
        payload: data
    }
}
export function tipoCalculoStore(data) {
    return {
        type: 'TIPO_CALCULO',
        payload: data
    }
}

export function resetStates() {
    return {
        type: 'RESET_STATES',
        payload: {
            unid_id: "",
            unidName: "",
            anoInventario: "",
            escopo: "",
            fonteEmissao: "",
            tipoEmissao: "",
            tipoCalculo: ""
        }
    }
}