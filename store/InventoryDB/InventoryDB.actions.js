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

export function getInventory(data) {
    return {
        type: 'GET_INVENTORY',
        payload: data
    }
}