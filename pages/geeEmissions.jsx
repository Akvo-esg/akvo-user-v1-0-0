import Title from '../src/components/title/Title'
import { useEffect, useState } from 'react'
import sidebarHide from "../utils/sidebarHide";
import { userRestriction } from '../utils/permission';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';



export default function GeeEmissions() {

    const [token, setToken] = useState('')


    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            userRestriction(['auditor'], data.userStatus, true)
        } else {
            return
        }
    }, [token])


    return (
        <div >
            <Title title={`Gestão de emissões`} subtitle={'Emissões GEE'} backButton />
        </div>
    )
}