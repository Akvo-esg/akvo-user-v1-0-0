export default function getUserConfigReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_USERCONFIG':
            return action.payload

        default: return state
    }
}