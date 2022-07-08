export default function inventoryStatesReducer(state = {}, action) {
    switch (action.type) {
        case 'INITIAL_VALUES':
            return action.payload

        case 'UNID_ID':
            return { ...state, unid_id: action.payload }

        case 'UNID_NAME':
            return { ...state, unidName: action.payload }

        case 'ANO_INVENTARIO':
            return { ...state, anoInventario: action.payload }

        case 'SETOR_PRIMARIO':
            return { ...state, setorPrimario: action.payload }

        case 'ESCOPO':
            return { ...state, escopo: action.payload }

        case 'FONTE_EMISSAO':
            return { ...state, fonteEmissao: action.payload }

        case 'TIPO_EMISSAO':
            return { ...state, tipoEmissao: action.payload }

        case 'TIPO_CALCULO':
            return { ...state, tipoCalculo: action.payload }

        case 'RESET_STATES':
            return action.payload

        default: return state
    }
}