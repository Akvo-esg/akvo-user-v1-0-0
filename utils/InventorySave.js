

import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import inventoryCode from './inventoryCode'
import { useSelector, useDispatch } from 'react-redux'
import baseUrl from './baseUrl'
import { reset } from '../store/InventoryList/InventoryList.actions'

export default async function InventorySave(list, inventory) {

    const dispatch = useDispatch()
    const token = jwt.decode(Cookie.get('auth'))

    const newList = []
    let newCode = inventoryCode(newList, inventory, list[0].fonteEmissao)

    for (let i = 0; i < list.length; i++) {
        newList.push(
            {
                ...list[i],
                userName: `${token.firstName} ${token.lastName}`,
                user_id: token.sub,
                dateAdded: new Date(),
                dateUpdated: '',
                code: newCode
            }
        )
        newCode = inventoryCode(newList, inventory, list[i].fonteEmissao, newCode)
    }

    const data = {
        newList,
        company_id: token.company_id
    }

    await axios.patch(`${baseUrl()}/api/inventory`, data)
        .then(res => {
            dispatch(reset([]))
            dataFunction(token.company_id)
            setSaveLoading(false)
            // return false
        }).catch(e => {
            // return false
        })
}








