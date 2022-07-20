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

    const token = jwt.decode(Cookie.get('auth'))

    useEffect(() => {
        sidebarHide()
        userRestriction(['user', 'auditor'], token.userStatus, true)
    }, [])

    const changeFreeAccount = async () => {

        await axios.patch(`${baseUrl()}/api/change2Premium`, { _id: token.sub })
            .then(async res => {

                await axios.post(`${baseUrl()}/api/updateToken`, { user_id: token.sub })
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
                                        id="salvarButton" onClick={() => changeFreeAccount()}
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