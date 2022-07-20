import Title from '../src/components/title/Title'
import sidebarHide from "../utils/sidebarHide";
import { useEffect, useState } from 'react'
import { userRestriction } from '../utils/permission';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';



export default function InventoryManagement() {

    const token = jwt.decode(Cookie.get('auth'))

    useEffect(() => {
        sidebarHide()
        userRestriction(['user', 'auditor'], token.userStatus, true)
    }, [])

    return (
        <div>
            <Title title={`Gestão de emissões`} subtitle={'Metas e Planos de Ação'} backButton />
        </div>
    )
}