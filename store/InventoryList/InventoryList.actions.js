export function add(list, data) {
    return {
        type: 'ADD',
        payload: [list, data]
    }
}

export function addMany(list, data) {
    return {
        type: 'ADD_MANY',
        payload: [list, data]
    }
}

export function update(data) {
    return {
        type: 'UPDATE',
        payload: data
    }
}

export function remove(list, index) {
    return {
        type: 'REMOVE',
        payload: [list, index]
    }
}
export function removeMany(list, deleteManyArray) {
    return {
        type: 'REMOVE_MANY',
        payload: [list, deleteManyArray]
    }
}
export function reset() {
    return {
        type: 'RESET',
        payload: []
    }
}