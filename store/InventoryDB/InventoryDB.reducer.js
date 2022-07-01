export default function inventoryDBReducer(state = [], action) {
    switch (action.type) {
        case 'INVENTORY_GET':
            return action.payload

        default: return state
    }
}