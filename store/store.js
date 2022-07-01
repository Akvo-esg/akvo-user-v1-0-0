import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import inventoryList from '../store/InventoryList/InventoryList.reducer'
import inventoryStates from '../store/InventoryStates/InventoryStates.reducer'
import inventoryDB from '../store/InventoryDB/InventoryDB.reducer'

const rootReducer = combineReducers({
    inventoryList: inventoryList,
    inventoryStates: inventoryStates,
    inventoryDB: inventoryDB
})

const persistedReducer = persistReducer({
    key: 'root',
    storage,
}, rootReducer)

export const store = createStore(persistedReducer)

export const persistedStore = persistStore(store)