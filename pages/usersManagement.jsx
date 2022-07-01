import Title from '../src/components/title/Title'
import sidebarHide from "../utils/sidebarHide";
import { useEffect, useState } from 'react'
import { userRestriction } from '../utils/permission';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';
import Link from 'next/link'
import UsersManagementTable from '../src/components/tables/UsersManagementTable';
import baseUrl from '../utils/baseUrl';
import axios from 'axios'

export default function UsersManagement() {

    const [token, setToken] = useState('')
    const [company_id, setCompany_id] = useState('')
    const [loading, setLoading] = useState(true)
    const [usersList, setUsersList] = useState([])
    const [user_id, setUser_id] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [companyUserConfig, setCompanyUserConfig] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            userRestriction(['auditor'], data.userStatus, true)
            setUser_id(data.sub)
            setCompany_id(data.company_id)
            setUserStatus(data.userStatus)
            dataFunction(data.company_id)
        } else {
            return
        }
    }, [token])


    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/companyUsers`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            setUsersList(res.data.usersInfo)
            setLoading(false)
            setCompanyUserConfig(res.data.companyInfo)
        }).catch(e => { console.log(e) })
    }

    return (
        <div>
            <Title title={`Gestão de Usuários`} subtitle={'fdsafdsafdsaf'} />

            {loading ?
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <div className="pagesContent shadow fadeItem">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {userRestriction(['user', 'auditor'], userStatus) && (
                                    <>
                                        <div className="row mb-4">
                                            <div className="col-6 text-start">
                                                <Link href='/userAdd' >
                                                    <button className="akvo_btn akvo_btn_primary btn-sm">
                                                        Adicionar Usuário
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5 className='h5_title'>Usuários cadastrados</h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                {usersList.length && (
                                                    <UsersManagementTable
                                                        userConfig={companyUserConfig}
                                                        userStatus={userStatus}
                                                        users={usersList}
                                                        updateList={() => dataFunction(company_id)}
                                                        user_id={user_id} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            }
        </div>
    )
}