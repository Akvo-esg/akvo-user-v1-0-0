import Title from '../src/components/title/Title'
import sidebarHide from "../utils/sidebarHide";
import { useEffect, useState } from 'react'
import { userRestriction } from '../utils/permission';
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';
import AddCompanyUnid from '../src/components/redirctPages/AddCompanyUnid';
import baseUrl from '../utils/baseUrl';
import axios from 'axios'
import Link from 'next/link'
import UnitsManagementTable from '../src/components/tables/UnitsManagementTable'

export default function UnitsManagement() {

    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')
    const [loading, setLoading] = useState(true)
    const [addUnitButton, setAddUnitButton] = useState(false)
    const [addCompanyButton, setAddCompanyButton] = useState(false)
    const [company_id, setCompany_id] = useState('')
    const [usersList, setUsersList] = useState([])
    const [userPermissions, setUserPermissions] = useState([])
    const [unidades, setUnidades] = useState([])
    const [userStatus, setUserStatus] = useState('')
    const [userConfig, setUserConfig] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            setUser_id(data.sub)
            userRestriction(['auditor'], data.userStatus, true)
            setUserStatus(data.userStatus)
            if (data.company_id) {
                setCompany_id(data.company_id)
                setUserPermissions(data.permissions)
                dataFunction(data.company_id)
            } else {
                setLoading(false)
                setAddCompanyButton(true)
            }
        } else {
            return
        }
    }, [token])


    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            if (res.data.unidades.length > 0) {
                setUnidades(res.data.unidades)
                setUserConfig(res.data.userConfig)
            } else {
                setAddUnitButton(true)
            }
        }).catch(e => {
            console.log(e)
        })

        await axios.get(`${baseUrl()}/api/companyUsers`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            const allUsersArray = res.data.usersInfo
            setUsersList(allUsersArray)
            setLoading(false)
        })
    }


    return (
        <div>
            <Title title={`Gestão de unidades`} subtitle={'lalalalalla'} backButton />


            {loading ?
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <>
                    {addCompanyButton ?
                        <AddCompanyUnid title={"Cadastre sua instituição"}
                            text={"Para gerenciar suas unidades é necessário fazer o cadastro da sua empresa."}
                            link={"/companyEdit"} button={"Cadastrar instituição"} />
                        :
                        <>
                            {addUnitButton ?
                                <AddCompanyUnid title={"Cadastre unidade"}
                                    text={"Para gerenciar suas unidades é necessário adicionar sua primeira unidade."}
                                    link={"/unityAdd"} button={"Adicionar unidade"} />
                                :
                                <div className="pagesContent shadow fadeItem">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                {userRestriction(['user', 'auditor'], userStatus) && (
                                                    <>
                                                        <div className="row mb-4">
                                                            <div className="col-6 text-start">
                                                                <Link href='/unityAdd' >
                                                                    <button className="akvo_btn akvo_btn_primary btn-sm">
                                                                        Adicionar Unidade
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                            <div className="col-6 text-end">
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
                                                                <h5 className='h5_title'>Unidades cadastradas</h5>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {unidades.length > 0 && usersList.length > 0 && (

                                                                    <UnitsManagementTable
                                                                        searchInput
                                                                        editButtons
                                                                        userConfig={userConfig}
                                                                        userStatus={userStatus}
                                                                        unidades={unidades}
                                                                        permissions={userPermissions}
                                                                        users={usersList}
                                                                        company_id={company_id}
                                                                        user_id={user_id}
                                                                        updateList={company_id => dataFunction(company_id)} />
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

                        </>
                    }
                </>
            }

        </div>
    )
}