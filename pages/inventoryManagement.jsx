import Title from '../src/components/title/Title2'
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
            <object type="text/html" data="https://spark.bootlab.io/charts-apexcharts.html" className='outerPage'></object>            
        </div>
    )
}