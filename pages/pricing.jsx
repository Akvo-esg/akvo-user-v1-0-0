import Title from "../src/components/title/Title";
import { useEffect, useState } from "react";
import { userRestriction } from '../utils/permission';
import sidebarHide from "../utils/sidebarHide";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Router from 'next/router'



export default function Pricing() {


    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            userRestriction(['user', 'auditor'], data.userStatus, true)
            setUser_id(data.sub)
        } else {
            return
        }
    }, [token])


    const changeFreeAccount = async (id) => {

        await axios.patch(`${baseUrl()}/api/change2Premium`, { id })
            .then(async res => {

                await axios.post(`${baseUrl()}/api/updateToken`, { user_id })
                    .then(async res => {
                        localStorage.setItem('auth', (Cookie.get('auth')))
                        Router.reload()
                    })
            })

    }

    return (

        <div>
            <Title title={'Página de preços'} />

            <div className="pagesContent shadow fadeItem">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-4">
                                <div className="col-6 text-start">
                                    <button className="akvo_btn akvo_btn_primary btn-sm"
                                        id="salvarButton" onClick={() => changeFreeAccount(user_id)}
                                    >
                                        Teste mudar para conta premium
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}