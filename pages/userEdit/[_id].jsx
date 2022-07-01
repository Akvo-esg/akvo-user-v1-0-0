import { useState, useEffect } from "react"
import Title from "../../src/components/title/Title"
import Router, { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { userRestriction, userConfigUserStatusPermission, userStatusName } from "../../utils/permission"
import sidebarHide from "../../utils/sidebarHide"
import axios from 'axios'
import baseUrl from "../../utils/baseUrl"
import $ from 'jquery'
import UnitysPermissionTable from "../../src/components/tables/UnitysPermissionTable"
import Link from 'next/link'



export default function EditUser() {

    const router = useRouter()

    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [loading, setLoading] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateLimit, setDateLimit] = useState('')
    const [active, setActive] = useState("")
    const [editUserStatus, setEditUserStatus] = useState('')
    const [unidades, setUnidades] = useState([])
    const [userPermissions, setUserPermissions] = useState([])
    const [forceUpdate, setForceUpdate] = useState(0)
    const [userConfig, setUserConfig] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [userProfilePicture, setUserProfilePicture] = useState('')
    const [responsavelError, setResponsavelError] = useState([])
    const [initialUserStatus, setInitialUserStatus] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            setDateLimit(data.dateLimit)
            userRestriction(['user', 'auditor'], data.userStatus, true)
            setUser_id(data.sub)
            setUserStatus(data.userStatus)
            if (data.company_id) {
                dataFunction(data.userStatus)
            } else {
                Router.push("/companyEdit")
            }
        } else {
            return
        }
    }, [token])

    useEffect(() => {

        if (userStatus) {
            $(document).ready(() => {
                $("#userStatusSelect").val(editUserStatus);
            });

            // setEditUserStatus(editUserStatus)
        }

    }, [editUserStatus])



    const dataFunction = async (userStatus) => {

        const data = router.query._id

        await axios.get(`${baseUrl()}/api/userEdit`, {
            params: {
                "user_id": data
            }
        }).then(res => {

            console.log(res.data.userInfo.userConfig, res.data.userInfo.userStatus)

            if (res.data.userInfo.userConfig === "basico" &&
                res.data.userInfo.userStatus === "admLocal") {
                setUserPermissions(false)
            } else {
                setUserPermissions(res.data.userInfo.userPermissions)
            }


            setFirstName(res.data.userInfo.firstName)
            setLastName(res.data.userInfo.lastName)
            setActive(res.data.userInfo.active)
            setEditUserStatus(res.data.userInfo.userStatus)
            setUnidades(res.data.unitsInfo)
            setUserConfig(res.data.userInfo.userConfig)
            setUserProfilePicture(res.data.userInfo.profileImageUrl)
            setLoading(false)
            setInitialUserStatus(res.data.userInfo.userStatus)

            if (!userConfigUserStatusPermission(res.data.userInfo.userConfig, userStatus, res.data.userInfo.userStatus)) {
                Router.push("/")
            }
        }).catch(e => {
            console.log(e)
        })
    }


    const save = async e => {
        e.preventDefault()

        setSaveLoading(true)

        const data = {
            "_id": router.query._id,
            "userStatus": editUserStatus,
            "permissions": userPermissions,
            "user_id": user_id,
            "userConfig": userConfig
        }

        await axios.patch(`${baseUrl()}/api/userEdit`, data)
            .then(res => {
                setSaveLoading(false)
                router.push('/usersManagement')
            }).catch(e => {
                setErrorAlert(true)
                setSaveLoading(false)
            })
    }

    const handleUserStatus = (value) => {

        if (value !== "admGlobal" && value !== "admLocal") {

            const unidadesResponsavel = []

            unidades.map(elem => {
                if (elem.responsavel_id === router.query._id) {
                    unidadesResponsavel.push(elem.unidName)
                }
            })

            setResponsavelError(unidadesResponsavel)

            $(document).ready(() => {
                $("#userStatusSelect").val(initialUserStatus);
            });
            setEditUserStatus(initialUserStatus)

        }
        else {
            setResponsavelError([])

            setEditUserStatus(value)
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
                    <Title title={`${firstName} ${lastName}`} subtitle={'Editar permissões e Categoria do usuário'} statusView status={active} />
                    <div className="pagesContent shadow fadeItem">

                        <div className="container">
                            <div className="row">
                                <div className="col-12">

                                    <div className="form mt-1">
                                        <div className="row mb-3">
                                            {errorAlert && (
                                                <div className="alert alert-danger fadeItem" role="alert">
                                                    Houve um erro na edição do usuário.
                                                </div>
                                            )}





                                            <div className="form-group col-12 col-xl-6 px-3">
                                                <div className="row my-4">
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

                                                </div>






                                                <label className='akvo_form_label h5_title'>Categoria do usuário</label>
                                                <select className="form-select  akvo_form_control_sm" aria-label="Default select example" id="userStatusSelect" onChange={e => handleUserStatus(e.target.value)}>

                                                    {userConfig === "basico" && (
                                                        <>
                                                            {editUserStatus === "admGlobal" ?
                                                                <option value="admGlobal">Administrador</option>
                                                                :
                                                                <>
                                                                    {editUserStatus === "admLocal" ?
                                                                        <option value="admLocal">Administrador</option>
                                                                        :
                                                                        <option value="admGlobal">Administrador</option>
                                                                    }

                                                                </>
                                                            }
                                                            <option value="user">Usuário</option>
                                                            <option value="auditor">Auditor</option>
                                                        </>
                                                    )}

                                                    {userConfig === "avancado" && (
                                                        <>
                                                            {userStatus === "admGlobal" && (
                                                                <>
                                                                    <option value="admGlobal">Administrador Global</option>
                                                                    <option value="admLocal">Administrador Local</option>
                                                                    <option value="user">Usuário</option>
                                                                    <option value="auditor">Auditor</option>
                                                                </>
                                                            )}
                                                            {userStatus === "admLocal" && (
                                                                <>
                                                                    <option value="admLocal">Administrador Local</option>
                                                                    <option value="user">Usuário</option>
                                                                    <option value="auditor">Auditor</option>
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                </select>

                                                {responsavelError.length > 0 && (
                                                    <small>
                                                        <div className="alert alert-danger fadeItem mt-2" role="alert">
                                                            <div>
                                                                O usuário é responsável pela{responsavelError.length>1?"s":""} unidade{responsavelError.length>1?"s":""}:
                                                            </div>
                                                            {responsavelError.map((elem, index) => {
                                                                return (
                                                                    <div key={`unid${index}`}>
                                                                        - {elem}
                                                                    </div>
                                                                )
                                                            })}
                                                            <div>
                                                                Para alterar sua categoria para &quot;usuário&quot; ou &quot;auditor&quot;, primeiro acesse a página <Link href="/unitsManagement"><a>Gestão de unidades</a></Link> e altere o respolsável por esta{responsavelError.length>1?"s":""} unidade{responsavelError.length>1?"s":""}.
                                                            </div>
                                                        </div>
                                                    </small>
                                                )}

                                            </div>
                                            <div className="form-group col-12 col-xl-6 px-3">
                                                {editUserStatus !== "admGlobal" && editUserStatus !== "admLocal" && userConfig === "basico" && (
                                                    <>
                                                        <label className='akvo_form_label h5_title'>Unidades permitidas</label>
                                                        <UnitysPermissionTable unidades={unidades} permissions={userPermissions} userStatus={userStatus} editUser_id={router.query._id} onChange={value => { setUserPermissions(value); setForceUpdate(forceUpdate + 1) }} />
                                                    </>
                                                )}

                                                {editUserStatus !== "admGlobal" && userConfig === "avancado" && (
                                                    <>
                                                        <label className='akvo_form_label h5_title'>Unidades permitidas</label>
                                                        <UnitysPermissionTable unidades={unidades} permissions={userPermissions} userStatus={userStatus} editUser_id={router.query._id} onChange={value => { setUserPermissions(value); setForceUpdate(forceUpdate + 1) }} />
                                                    </>
                                                )}
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-end">
                                                {saveLoading ?
                                                    <button className="akvo_btn akvo_btn_primary btn-sm" disabled >
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Salvando...
                                                    </button>
                                                    :
                                                    <button className="akvo_btn akvo_btn_primary btn-sm"
                                                        id="salvarButton" onClick={e => save(e)}>
                                                        Salvar Alterações
                                                    </button>
                                                }

                                                <Link href="/usersManagement">
                                                    <button type="button" className="akvo_btn akvo_btn_secondary btn-sm ms-2">
                                                        Cancelar
                                                    </button>
                                                </Link>
                                            </div>
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