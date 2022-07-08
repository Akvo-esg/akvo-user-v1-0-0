export default function inventoryListReducer(state = [], action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload[1]].concat(action.payload[0])

        case 'ADD_MANY':
            return action.payload[1].concat(action.payload[0])

        case 'UPDATE':
            const updatedFilter = action.payload.filter(elem => elem)
            return updatedFilter

        case 'REMOVE':
            const filtered = action.payload[0].filter((elem, index) => index !== action.payload[1])
            return filtered

        case 'REMOVE_MANY':
            const deleteIndexArray = []
            action.payload[1].map(elem => deleteIndexArray.push(elem.index))
            const filteredMany = action.payload[0].filter((elem, index) => !deleteIndexArray.includes(index))
            return filteredMany

        case 'RESET':
            return action.payload

        default: return state
    }

}