import Title from '../src/components/title/Title'
import { useEffect, useState } from 'react'
import sidebarHide from "../utils/sidebarHide";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faUser,
    faUserPen,
    faUserGear,
    faUserCheck,
    faChalkboardUser
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import baseUrl from '../utils/baseUrl';
import axios from 'axios'
import UnitysPermissionTable from '../src/components/tables/UnitysPermissionTable';
import Router from 'next/router';
import { unitsPermissions, userRestriction } from '../utils/permission';

export default function UserAdd() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [userStatusError, setUserStatusError] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [token, setToken] = useState('')
    const [userConfig, setUserConfig] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [unidades, setUnidades] = useState([])
    const [user_id, setUser_id] = useState('')
    const [company_id, setCompany_id] = useState('')
    const [loading, setLoading] = useState(true)
    const [permissions, setPermissions] = useState([])
    const [permissionsError, setPermissionsError] = useState('')
    const [forceUpdate, setForceUpdate] = useState(0)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [userPermissions, setUserPermissions] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            userRestriction(['user', 'auditor', 'consultor'], data.userStatus, true)

            if (data.dateLimit) {
                Router.push('/pricing')
            } else {
                setUser_id(data.sub)
                if (data.company_id) {
                    dataFunction(data.company_id)
                    setCompany_id(data.company_id)
                    setUserPermissions(data.permissions)
                } else {
                    setLoading(false)
                }
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
            setCompanyName(res.data.companyName)
            setUserConfig(res.data.userConfig)
            setUnidades(res.data.unidades)
            setLoading(false)
        }).catch(e => {
            console.log(e)
        })

    }

    const validate = () => {

        let firstNameError = ''
        let userStatusError = ''
        let permissionsError = ''
        let emailError = ''

        if (!email || !email.includes('@')) emailError = "E-mail inválido"
        if (!firstName) firstNameError = 'Digite um nome'
        if (!userStatus) userStatusError = "Escolha uma das opções"
        if ((userStatus === "admLocal" || userStatus === "user" || userStatus === "auditor") && permissions.length === 0) permissionsError = "Adicione as permissões do usuário"


        if (firstNameError || emailError || permissionsError || userStatusError) {
            setFirstNameError(firstNameError)
            setEmailError(emailError)
            setPermissionsError(permissionsError)
            setUserStatusError(userStatusError)
            return false
        } else {
            setFirstNameError('')
            setEmailError('')
            setPermissionsError('')
            setUserStatusError('')
            return true
        }
    }

    const randomPassword = () => {
        let password = ''
        do {
            password += Math.random().toString(36).substr(2)
        } while (password.length < 8)
        password = password.substr(0, 8)
        return password
    }

    const save = async e => {
        e.preventDefault()

        setSaveLoading(true)

        const isValid = validate()

        if (isValid) {
            await axios.post(`${baseUrl()}/api/verifyUserEmail`, { email })
                .then(res => {
                    register()
                })
                .catch(e => {
                    setSaveLoading(false)
                    setEmailError('E-mail já cadastrado')
                })
        } else {
            setSaveLoading(false)
        }
    }

    const register = async () => {

        const password = randomPassword()

        const data = {
            firstName,
            lastName,
            email,
            company_id,
            userStatus: userStatus,
            password: password,
            permissions: userStatus === "admGlobal" ? false : permissions,
        }

        await axios.post(`${baseUrl()}/api/userRegister`, data)
            .then(res => {
                sendEmail(password)
            })
            .catch(e => {
                console.log(e)
            })

    }

    const sendEmail = async (password) => {

        const data = {
            firstName,
            email,
            password,
            link: `${baseUrl()}`
        }

        try {
            await fetch('/api/addUserMail', {
                method: 'post',
                body: JSON.stringify(data)
            })
                .then(res => Router.push("/usersManagement"))

        } catch {
            setLoading(false)
            setEmailError('Falha ao enviar o email de confirmação.')
        }
    }


    return (
        <div>
            <Title title={`Adicionar Usuário`} subtitle={'lalalalallalala'} backButton />

            {loading ?
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :

                <div className="pagesContent shadow fadeItem">

                    <div className="container">
                        <div className="form">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h5 className='h5_title'>Dados de identificação</h5>
                                            <div className="row">
                                                <div className="col-8 col-xl-4 px-1">
                                                    <label className='akvo_form_label'>Nome *</label>
                                                    <input
                                                        type="text"
                                                        className='form-control akvo_form_control_sm'
                                                        value={firstName} onChange={e => setFirstName(e.target.value)} />
                                                    <small className='text-danger error_font_size'>{firstNameError}</small>

                                                </div>
                                                <div className="col-8 col-xl-4 px-1">
                                                    <label className='akvo_form_label'>Sobrenome</label>
                                                    <input
                                                        type="text"
                                                        className='form-control akvo_form_control_sm'
                                                        value={lastName} onChange={e => setLastName(e.target.value)} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <div className="row">
                                                <h5 className="h5_title">E-mail do usuário *</h5>
                                                <div className="row">
                                                    <div className="col-8 col-xl-4 px-1">
                                                        <input
                                                            type="text"
                                                            className='form-control akvo_form_control_sm'
                                                            value={email} onChange={e => setEmail(e.target.value)} />
                                                        <small className='text-danger error_font_size'>{emailError}</small>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <div className="row">
                                                <h5 className="h5_title">Categoria do usuário *</h5>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            {userConfig === "basico" && (
                                                                <div className="col-12 col-xl-3 col-lg-6 my-2">
                                                                    <div className="card cardAnimation border-secondary shadow"
                                                                        id="userStatusadmGlobal" type="button" onClick={() => setUserStatus('admGlobal')}>
                                                                        <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                            {userStatus === "admGlobal" && (
                                                                                <div className="akvo-cardCheck fadeItem">
                                                                                    <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                                </div>
                                                                            )}
                                                                            <FontAwesomeIcon icon={faUserGear} className="text-light h-75" />
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <h5 className="h5_title">Administrador</h5>
                                                                            <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}


                                                            {userConfig === "avancado" && (
                                                                <>
                                                                    <div className="col-12 col-xl-3 col-lg-6 my-2">
                                                                        <div className="card cardAnimation border-secondary shadow"
                                                                            id="userStatusadmGlobal" type="button" onClick={() => setUserStatus('admGlobal')}>
                                                                            <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                                {userStatus === "admGlobal" && (
                                                                                    <div className="akvo-cardCheck fadeItem">
                                                                                        <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                                    </div>
                                                                                )}
                                                                                <FontAwesomeIcon icon={faUserGear} className="text-light h-75" />
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h5 className="h5_title">Adm. Global</h5>
                                                                                <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-xl-3 col-lg-6 my-2">
                                                                        <div className="card cardAnimation border-secondary shadow"
                                                                            id="userStatusadmLocal" type="button" onClick={() => setUserStatus('admLocal')}>
                                                                            <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                                {userStatus === "admLocal" && (
                                                                                    <div className="akvo-cardCheck fadeItem">
                                                                                        <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                                    </div>
                                                                                )}
                                                                                <FontAwesomeIcon icon={faUserPen} className="text-light h-75" />
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h5 className="h5_title">Adm. Local</h5>
                                                                                <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            <div className="col-12 col-xl-3 col-lg-6 my-2">
                                                                <div className="card cardAnimation border-secondary shadow"
                                                                    id="userStatususer" type="button" onClick={() => setUserStatus('user')}>
                                                                    <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                        {userStatus === "user" && (
                                                                            <div className="akvo-cardCheck fadeItem">
                                                                                <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                            </div>
                                                                        )}
                                                                        <FontAwesomeIcon icon={faUser} className="text-light h-75" />
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h5 className="h5_title">Usuário</h5>
                                                                        <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xl-3 col-lg-6 my-2">
                                                                <div className="card cardAnimation border-secondary shadow"
                                                                    id="userStatusauditor" type="button" onClick={() => setUserStatus('auditor')}>
                                                                    <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                        {userStatus === "auditor" && (
                                                                            <div className="akvo-cardCheck fadeItem">
                                                                                <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                            </div>
                                                                        )}
                                                                        <FontAwesomeIcon icon={faUserCheck} className="text-light h-75" />
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h5 className="h5_title">Auditor</h5>
                                                                        <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xl-3 col-lg-6 my-2">
                                                                <div className="card cardAnimation border-secondary shadow"
                                                                    id="userStatuconsultor" type="button" onClick={() => setUserStatus('consultor')}>
                                                                    <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                        {userStatus === "consultor" && (
                                                                            <div className="akvo-cardCheck fadeItem">
                                                                                <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                            </div>
                                                                        )}
                                                                        <FontAwesomeIcon icon={faChalkboardUser} className="text-light h-75" />
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h5 className="h5_title">Consultor Externo</h5>
                                                                        <p className="p">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <small className="text-danger error_font_size">{userStatusError}</small>
                                            </div>
                                        </div>
                                    </div>
                                    {(userStatus === "admLocal" || userStatus === "user" || userStatus === "auditor" || userStatus === "consultor") && (

                                        <div className="row mb-4 fadeItem">
                                            <div className="col-12">
                                                <div className="row">
                                                    <h5 className="h5_title">Permissões *</h5>
                                                    <div className="row">
                                                        <div className="col-8 col-xl-6 px-1">
                                                            <UnitysPermissionTable unidades={unitsPermissions(unidades, userPermissions, userConfig, userStatus)} permissions={permissions} onChange={value => { setPermissions(value); setForceUpdate(forceUpdate + 1) }} />
                                                        </div>
                                                    </div>
                                                    <small className="text-danger error_font_size">{permissionsError}</small>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <hr />
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-end">
                                            {saveLoading ?
                                                <button className="akvo_btn akvo_btn_primary btn-sm" disabled >
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Enviando...
                                                </button>
                                                :
                                                <button className="akvo_btn akvo_btn_primary btn-sm"
                                                    id="salvarButton" onClick={e => save(e)}>
                                                    Enviar Solicitação
                                                </button>
                                            }

                                            <Link href="/">
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
            }

        </div >
    )
}