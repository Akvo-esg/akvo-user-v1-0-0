import { useState, useEffect } from "react"
import Title from "../../src/components/title/Title"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import sidebarHide from "../../utils/sidebarHide"
import { useRouter } from 'next/router'
import { userStatusName, unitsPermissions } from "../../utils/permission"
import axios from "axios"
import baseUrl from "../../utils/baseUrl"
import UnitsManagementTable from '../../src/components/tables/UnitsManagementTable'

export default function UserView() {

    const router = useRouter()

    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [loading, setLoading] = useState(true)
    const [company_id, setCompany_id] = useState('')
    const [userPermissions, setUserPermissions] = useState([])
    const [userProfilePicture, setUserProfilePicture] = useState('')
    const [userConfig, setUserConfig] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [unidades, setUnidades] = useState([])
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])





    useEffect(() => {
        if (token && router) {
            const data = jwt.decode(token)
            setUser_id(data.sub)
            if (data.company_id) {
                setCompany_id(data.company_id)
                setUser_id(router.query._id)
                dataFunction(data.company_id, data.userStatus)
            } else {
                setLoading(false)
                // setAddCompanyButton(true)
            }
        } else {
            return
        }
    }, [token, router])


    const dataFunction = async (company_id, userStatus) => {

        await axios.get(`${baseUrl()}/api/editProfile/${router.query._id}`)
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
                setUserPermissions(res.data.permissions)
                setUserStatus(res.data.userStatus)
                setUserProfilePicture(res.data.profileImageUrl)
                setCelular(res.data.celular)
                setCidade(res.data.cidade)
                setEstado(res.data.estado)
                companyData(company_id, res.data.permissions, userStatus)
            }).catch(e => {
                console.log(e)
            })

    }


    const companyData = async (company_id, permissions, userStatus) => {
        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            setUserConfig(res.data.userConfig)
            tableData(company_id, res.data.unidades, permissions, res.data.userConfig, userStatus)
        }).catch(e => console.log(e))

    }

    const tableData = async (company_id, unidades, permissions, userConfig, userStatus) => {

        if (company_id, userPermissions, userStatus) {
            await axios.get(`${baseUrl()}/api/companyUsers`, {
                params: {
                    company_id: company_id
                }
            }).then(res => {
                const allUsersArray = res.data.usersInfo
                setUsersList(allUsersArray)
                setUnidades(unitsPermissions(unidades, permissions, userConfig, userStatus))
                setLoading(false)
            })
        }
    }


    return (
        <div>

            {loading ?
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <>
                    <Title title={`${firstName} ${lastName}`} subtitle={`${userStatus === "admGlobal" ? 'Administrador Global' : userStatus === "admLocal" ? 'Administrador Local' : userStatus === "user" ? '' : 'auditor'}  `} status={true} statusView backButton />

                    <div className="pagesContent shadow fadeItem">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row mt-2">
                                        <div className="col-12 col-lg-6 d-flex flex-column my-4 ">
                                            <div className="row align-items-center">
                                                <div className="d-flex justify-content-center">
                                                    <img src={userProfilePicture ? userProfilePicture : "./userIcon.png"} alt="User profile picture" className="akvo-profile-img shadow" />
                                                </div>
                                            </div>
                                            <div className="row align-items-center mt-2">
                                                <div className={`d-flex justify-content-center h5_title`}>
                                                    {firstName} {lastName}
                                                </div>
                                            </div>

                                            <div className="row align-items-center">
                                                <div className="d-flex justify-content-center">
                                                    <small className='p'>{userStatusName(userStatus, userConfig)}</small>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-12 col-lg-6 d-flex flex-column my-4 ">
                                            <div className="d-inline-flex">
                                                <h5 className="h5_title">E-mail: </h5> <p className="p ms-2">{email}</p>
                                            </div>
                                            <div className="d-inline-flex">
                                                <h5 className="h5_title">Telefone: </h5> <p className="p ms-2">{celular ? celular : 'não informado'}</p>
                                            </div>
                                            <div className="d-inline-flex">
                                                <h5 className="h5_title">Cidade: </h5> <p className="p ms-2">{cidade ? cidade : 'não informado'}</p>
                                            </div>
                                            <div className="d-inline-flex">
                                                <h5 className="h5_title">Estado: </h5> <p className="p ms-2">{estado ? estado : 'não informado'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <h5 className="h5_title">Unidades Associadas ao Usuário</h5>
                                        <div className="col-12">
                                            <UnitsManagementTable
                                                unidades={unidades}
                                                permissions={userPermissions}
                                                users={usersList}
                                                company_id={company_id}
                                                user_id={user_id}
                                                updateList={company_id => dataFunction(company_id, userPermissions, userStatus)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}