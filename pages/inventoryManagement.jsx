import Title from '../src/components/title/Title'
import sidebarHide from "../utils/sidebarHide";
import { useEffect, useState } from 'react'
import { userRestriction } from '../utils/permission';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';



export default function InventoryManagement() {

    const [token, setToken] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            userRestriction(['user', 'auditor'], data.userStatus, true)
        } else {
            return
        }
    }, [token])

    return (
        <div>
            <Title title={`Gestão de emissões`} subtitle={'Metas e Planos de Ação'} backButton />
        </div>
    )
}