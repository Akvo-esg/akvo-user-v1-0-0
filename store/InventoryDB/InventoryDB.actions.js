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

export function inventoryGet(data) {
    return {
        type: 'INVENTORY_GET',
        payload: data
    }
}