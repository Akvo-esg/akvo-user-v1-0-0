import Title from "../src/components/title/Title";
import { useEffect, useState } from "react";
import sidebarHide from "../utils/sidebarHide";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faEye,
    faUserGroup,
    faUsers,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import CompanyLogo from "../src/components/cropper/CompanyLogo";
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import Router from 'next/router'
import { unitsPermissions, editCompanyView, userRestriction } from "../utils/permission";

if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");

}

export default function CompanyEdit() {

    const [companyName, setCompanyName] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [companyNameError, setCompanyNameError] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [userConfig, setUserConfig] = useState('')
    const [oldUserConfig, setOldUserConfig] = useState('')
    const [userConfigError, setUserConfigError] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')
    const [company_id, setCompany_id] = useState('')
    const [loading, setLoading] = useState(true)
    const [unidades, setUnidades] = useState([])
    const [userStatus, setUserStatus] = useState('')
    const [userPermissions, setUserPermissions] = useState([])

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            setUser_id(data.sub)
            setUserStatus(data.userStatus)
            setUserPermissions(data.permissions)
            userRestriction(['user', 'auditor'], data.userStatus, true)
            if (data.company_id) {
                dataFunction(data.company_id, data.userStatus)
                setCompany_id(data.company_id)
            } else {
                setLoading(false)
            }
        } else {
            return
        }
    }, [token])

    const dataFunction = async (company_id, userStatus) => {

        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        }).then(res => {

            if (!editCompanyView(userStatus, res.data.userConfig)) {
                Router.push('/')
            } else {
                setCompanyName(res.data.companyName)
                setProfileImageUrl(res.data.profileImageUrl)
                setUserConfig(res.data.userConfig)
                setOldUserConfig(res.data.userConfig)
                setUnidades(res.data.unidades)
                setLoading(false)
            }

        }).catch(e => {
            console.log(e)
        })
    }

    const validate = () => {

        let companyNameError = ''
        let userConfigError = ''

        if (!companyName) companyNameError = 'Digite um nome'
        if (!userConfig) userConfigError = 'Selecione uma das opções'

        if (companyNameError || userConfigError) {
            setCompanyNameError(companyNameError)
            setUserConfigError(userConfigError)
            return false
        } else {
            setCompanyNameError('')
            setUserConfigError('')
            return true
        }
    }


    const handleSave = (e) => {
        e.preventDefault()

        const isValid = validate()

        if (isValid) {

            setSaveLoading(true)

            if (!company_id) {
                saveNewCompany(e)
                return
            }

            if (oldUserConfig !== userConfig) {

                var myModal = new bootstrap.Modal(document.getElementById('emailConfirmationModal'))
                myModal.show()
                return
            }

            if (oldUserConfig === userConfig) {
                editCompany(e)
                return
            }
        } else {
            return
        }
    }

    const createImageUrl = async () => {

        if (previewSource) {

            const formData = new FormData()
            formData.append("file", previewSource)
            formData.append("upload_preset", "co2blue_profile_images")

            const data = await axios.post('https://api.cloudinary.com/v1_1/co2blue/image/upload', formData)
            return data.data.secure_url
        } else {
            return profileImageUrl
        }

    }

    const saveNewCompany = async (e) => {
        e.preventDefault()

        const imageUrl = await createImageUrl()


        const company = {
            user_id,
            companyName,
            profileImageUrl: imageUrl,
            userConfig
        }

        await axios.post(`${baseUrl()}/api/company`, company)
            .then(async res => {
                setSaveLoading(false)

                Cookie.remove('auth')
                localStorage.removeItem('auth')

                await axios.post(`${baseUrl()}/api/updateToken`, { user_id })
                    .then(res => {
                        localStorage.setItem('auth', (Cookie.get('auth')))
                        Router.reload()
                    })
            }).catch(e => {
                companyNameError('Houve um problema no cadastro da instituição')
                setSaveLoading(false)
            })
    }

    const editCompany = async (e) => {
        e.preventDefault()

        const imageUrl = await createImageUrl()

        const company = {
            company_id,
            companyName,
            profileImageUrl: imageUrl ? imageUrl : '',
            userConfig
        }

        await axios.patch(`${baseUrl()}/api/company`, company)
            .then(async res => {
                Router.reload()
            }).catch(e => {
                companyNameError('Houve um problema na atualização dos dados da instituição')
                setSaveLoading(false)
            })
    }


    const render = () => {

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })

        return (
            <div >
                <Title title={'Editar Instituição'} subtitle={'Complete o cadastro da sua organização e mantenha as informações atualizadas'} backButton />

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
                                    {company_id && unidades.length === 0 && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            <strong>Instituição cadastrada com sucesso!</strong> <Link href="/unityAdd">Cadastrar unidade</Link>.
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    )}
                                    {successAlert && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            Instituição atualizada com sucesso!
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    )}
                                    <div className="row">
                                        <div className="col-xxl-4 col-12 d-flex align-items-center mb-3">
                                            <CompanyLogo onChange={e => setPreviewSource(e)} data={profileImageUrl} />

                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h5 className="h5_title">Identificação da Instituição</h5>
                                                </div>
                                            </div>
                                            <div className="form mt-1">
                                                <div className="row mb-3">
                                                    <div className="form-group col-12 col-xl-8 px-1">
                                                        <label className="akvo_form_label">Nome da Instituição*</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="firstName" value={companyName}
                                                            onChange={e => setCompanyName(e.target.value)} />
                                                        <small className="text-danger error_font_size">{companyNameError}</small>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="form-group col-12 col-xl-10 px-1">
                                                        <label className="akvo_form_label">Estrutura de Usuários *</label>
                                                        <p className='p'><strong>Básico:</strong> acesso irrestrito aos dados da instituição e das unidades, quando for o caso, para todos os Administradores.</p>
                                                        <p className='p'><strong>Multinível:</strong> acesso irrestrito aos dados da instituição e de todas as unidades ao Administrador Global; acesso aos dados de determinadas unidades e/ou grupos de unidades para os Administradores Locais.</p>
                                                        <p className='p'><strong>Importante:</strong> essa categoria poderá ser alterada a qualquer momento pelo Administrador (estrutura básica) ou pelo Administrador Global (estrutura multinível), caso a opção selecionada não esteja adequada ao seu arranjo institucional.</p>

                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="card cardAnimation border-secondary shadow"
                                                                    id="userConfigbasico" type="button" onClick={() => setUserConfig('basico')}>
                                                                    <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                        {userConfig === "basico" && (
                                                                            <div className="akvo-cardCheck fadeItem">
                                                                                <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                            </div>
                                                                        )}
                                                                        <FontAwesomeIcon icon={faUserGroup} className="text-light h-75" />
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h5 className="h5_title">Básico</h5>
                                                                        <ul className="list-group list-group-flush" style={{ "height": "130px" }}>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "15px" }}>&bull; Administrador</li>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "-5px" }}>&bull; Usuário</li>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "-5px" }}>&bull; Auditor</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="card cardAnimation border-secondary shadow"
                                                                    id="userConfigavancado" type="button" onClick={() => setUserConfig('avancado')}>
                                                                    <div className="card-img-top border-secondary akvo_BigCardHeader d-flex align-items-center justify-content-center">
                                                                        {userConfig === "avancado" && (
                                                                            <div className="akvo-cardCheck fadeItem">
                                                                                <FontAwesomeIcon icon={faCheck} className="akvo-cardCheck-checked" />
                                                                            </div>
                                                                        )}
                                                                        <FontAwesomeIcon icon={faUsers} className="text-light h-75" />

                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h5 className="h5_title">Multinível</h5>
                                                                        <ul className="list-group list-group-flush" style={{ "height": "130px" }}>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "0px" }} >&bull; Adm Global</li>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "-5px" }}>&bull; Adm Local</li>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "-5px" }}>&bull; Usuário</li>
                                                                            <li className="list-group-item p_Card" style={{ "marginTop": "-5px", "marginBottom": "-22px" }}>&bull; Auditor</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small className="text-danger error_font_size">{userConfigError}</small>
                                                    </div>
                                                </div>
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
                                                        id="salvarButton" onClick={e => handleSave(e)}>
                                                        Salvar
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

                                    {company_id && unidades.length >= 0 && (
                                        <>
                                            <hr />

                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-6 text-start">
                                                            <h5 className="h5_title">Unidades Cadastradas</h5>
                                                        </div>
                                                        <div className="col-6 text-end">
                                                            <Link href='/unityAdd' >
                                                                <button className="akvo_btn akvo_btn_primary btn-sm"
                                                                    id="salvarButton"
                                                                >
                                                                    Cadastrar Nova Unidade
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">

                                                        {unitsPermissions(unidades, userPermissions, userConfig, userStatus).map((elem, i) => {
                                                            if (elem.active && !elem.deleted) {
                                                                return (
                                                                    <div className="col-12 col-xl-4 col-lg-6 my-2 px-4" key={`card${i}`}>
                                                                        <div className="card cardAnimation border-secondary shadow" type="button">
                                                                            <div className="card-img-top border-secondary akvo_CardHeader d-flex align-items-center justify-content-center text-light h5_ti">
                                                                                {elem.unidName}
                                                                            </div>
                                                                            <div className="card-body px-2 py-2">
                                                                                <ul className="list-group list-group-flush mb-1" style={{ "marginTop": "-5px" }}>
                                                                                    <li className="list-group-item p_Card">&bull; {elem.cidade} - {elem.estado}</li>
                                                                                    <li className="list-group-item p_Card">&bull; {elem.email}</li>
                                                                                    <li className="list-group-item p_Card">&bull; {elem.telefone ? elem.telefone : "Telefone não cadastrado"}</li>
                                                                                </ul>
                                                                                <div className="d-flex justify-content-center">
                                                                                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                                                                        <button type="button" className="btn btn-outline-dark" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                                                            <FontAwesomeIcon icon={faEye} />
                                                                                        </button>
                                                                                        <button type="button" className="btn btn-outline-dark" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Editar">
                                                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            }
                                                        })}

                                                    </div>
                                                </div>
                                            </div>

                                        </>

                                    )}

                                </div>
                            </div>
                        </div>


                    </div>
                }


                <div className="modal fade" id="emailConfirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-start">
                                <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                                    Alteração da gestão de usuários!
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSaveLoading(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="text-start">
                                    <p className={`p text-dark`}>
                                        Tem certeza que deseja alterar a gestão dos usuários? Isso causará........
                                    </p>
                                    {userStatus === "admLocal" && (
                                        <p className={`p text-dark`}>
                                            Como você está cadastrado como Administrador Local, você não poderá editar a instituição novamente. Somente os Administradores Globais terão acesso à essa página.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button" data-bs-dismiss="modal"
                                    className="akvo_btn akvo_btn_secondary btn-sm"
                                    onClick={() => setSaveLoading(false)}>
                                    Cancelar
                                </button>
                                <button type="button" data-bs-dismiss="modal"
                                    className="akvo_btn akvo_btn_primary btn-sm ms-2"
                                    onClick={e => editCompany(e)}>
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }





    return (
        render()
    )
}