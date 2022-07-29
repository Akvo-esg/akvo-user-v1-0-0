import Title from '../src/components/title/Title2'
import { useEffect, useState } from 'react'
import sidebarHide from "../utils/sidebarHide";
import { userRestriction } from '../utils/permission';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';



export default function GeeEmissions() {

    const token = jwt.decode(Cookie.get('auth'))

    useEffect(() => {
        sidebarHide()
        userRestriction(['auditor'], token.userStatus, true)
    }, [])

    return (
        <div >
            <Title title={`Gestão de emissões`} subtitle={'Emissões GEE'} backButton />
            <object type="text/html" data="https://spark.bootlab.io/charts-chartjs.html" className='outerPage'></object>
        </div>
    )
}