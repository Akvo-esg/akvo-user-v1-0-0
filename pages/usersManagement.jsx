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

    const token = jwt.decode(Cookie.get('auth'))

    const [loading, setLoading] = useState(true)
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        sidebarHide()
        userRestriction(['auditor'], token.userStatus, true)
        dataFunction(token.company_id)
    }, [])

    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/companyUsers`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            setUsersList(res.data.usersInfo)
            setLoading(false)
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
                                {userRestriction(['user', 'auditor'], token.userStatus) && (
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
                                                        users={usersList}
                                                        updateList={() => dataFunction(company_id)} />
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