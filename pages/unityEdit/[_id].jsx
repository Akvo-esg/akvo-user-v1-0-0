import Title from '../../src/components/title/Title'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import sidebarHide from "../../utils/sidebarHide";
import Setores from '../../src/components/formComponets/Setores';
import Link from 'next/link'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl';
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import EstadosList from '../../src/components/formComponets/EstadosList';
import ResponsavelTable from '../../src/components/tables/ResponsavelTable';
import { userRestriction } from '../../utils/permission';
import $ from 'jquery'

export default function UnityAdd() {

    const router = useRouter()

    //User Info
    const [user_id, setUser_id] = useState('')
    const [company_id, setCompany_id] = useState('')
    const [token, setToken] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [userConfig, setUserConfig] = useState('')
    const [dateLimit, setDateLimit] = useState('')

    //Form Content
    const [unidName, setUnidName] = useState('')
    const [setorPrimario, setSetorPrimario] = useState('')
    const [setorSecundario, setSetorSecundario] = useState('')
    const [outroSetorSec, setOutroSetorSec] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [coordenadas, setCoordenadas] = useState(true)
    const [cnpj, setCnpj] = useState('')
    const [inscricaoEstadual, setinscricaoEstadual] = useState('')
    const [email, setEmail] = useState('')
    const [group, setGroup] = useState('')
    const [active, setActive] = useState('')
    const [responsavel, setResponsavel] = useState('')

    //Render components
    const [handleCnpj, setHandleCnpj] = useState(true)
    const [handleInscEst, setHandleInscEst] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)
    const [groups, setGroups] = useState([])
    const [groupSelected, setGroupSelected] = useState('')
    const [newGroup, setNewGroup] = useState('')
    const [usersList, setUsersList] = useState([])
    const [responsavel_id, setResponsavel_id] = useState('')
    const [responsavelStatus, setResponsavelStatus] = useState('')
    const [loading, setLoading] = useState(true)
    const [newUserLoading, setNewUserLoading] = useState(false)

    //Error States
    const [unidNameError, setUnidNameError] = useState('')
    const [setorError, setSetorError] = useState('')
    const [cidadeError, setCidadeError] = useState('')
    const [estadoError, setEstadoError] = useState('')
    const [responsavelError, setResponsavelError] = useState('')


    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {

        if (!handleCnpj) setCnpj('')
        if (!handleInscEst) setinscricaoEstadual('')
        if (!coordenadas) { setLongitude(''); setLatitude('') }

    }, [handleCnpj, handleInscEst, coordenadas])

    useEffect(() => {

        if (group && !loading) {
            $(document).ready(() => {
                $("#groupSelect").val(group);
            });
        }

    }, [loading])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            setDateLimit(data.dateLimit)
            userRestriction(['user', 'auditor'], data.userStatus, true)
            setUser_id(data.sub)
            setUserStatus(data.userStatus)
            if (data.company_id) {
                setCompany_id(data.company_id)
                dataFunction(data.company_id)
            } else {
                Router.push("/companyEdit")
            }
        } else {
            return
        }
    }, [token])

    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/unidEdit`, {
            params: {
                "company_id": company_id,
                "unid_id": router.query._id
            }
        }).then(res => {
            const data = res.data.data[0]
            const responsavel = res.data.users.filter(elem => elem._id.toString() === data.responsavel_id)
            setUnidName(data.unidName)
            setResponsavel_id(data.responsavel_id)
            setSetorPrimario(data.setorPrimario)
            setSetorSecundario(data.setorSecundario)
            setCnpj(data.cnpj)
            setinscricaoEstadual(data.inscricaoEstadual)
            setCidade(data.cidade)
            setEstado(data.estado)
            setLogradouro(data.logradouro)
            setNumero(data.numero)
            setCep(data.cep)
            setLatitude(data.localizacao[0])
            setLongitude(data.localizacao[1])
            setEmail(data.email)
            setGroup(data.group)
            setGroupSelected(data.group)
            setActive(data.active)
            setUserConfig(res.data.userConfig)
            setGroups(res.data.groups)

            if (!data.cnpj) setHandleCnpj(false)
            if (!data.inscricaoEstadual) setHandleInscEst(false)
            if (!data.localizacao[0], !data.localizacao[1]) setCoordenadas(false)

            setNewUserLoading(false)

        }).catch(e => {
            console.log(e)
        })

        await axios.get(`${baseUrl()}/api/companyUsers`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            const allUsersArray = res.data.usersInfo
            const filteredUsers = allUsersArray.filter(elem => elem.userStatus !== 'user' && elem.userStatus !== 'auditor')
            setUsersList(filteredUsers)
            setLoading(false)
        })
    }

    const maskCnpj = (value) => {
        return setCnpj(value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1'))
    }

    const maskinscricaoEstadual = (value) => {
        return setinscricaoEstadual(value
            .replace(/\D/g, '')
            .replace(/(-\d{10})\d+?$/, '$1'))
    }

    const maskCep = (value) => {
        return setCep(value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1'))
    }

    const maskLatitude = (value) => {
        return setLatitude(value
            .replace(/\D/g, ''))
    }

    const maskLongitude = (value) => {
        return setLongitude(value
            .replace(/\D/g, ''))
    }

    const maskNumero = (value) => {
        return setNumero(value
            .replace(/\D/g, ''))
    }

    const onBlurCep = (event) => {

        const { value } = event.target

        const cep = value?.replace(/[^0-9]/g, '');

        if (cep?.length !== 8) {
            console.log(cep)
            return;
        }

        axios.get(`https://viacep.com.br/ws/${value}/json/`)
            .then(res => {

                const data = res.data

                setLogradouro(data.logradouro)
                setCidade(data.localidade)
                setEstado(data.uf)
            })
    }

    const validate = () => {

        let unidNameError = ''
        let setorError = ''
        let cidadeError = ''
        let estadoError = ''
        let responsavelError = ''

        if (!unidName) unidNameError = 'Digite um nome'
        if (!setorPrimario) setorError = 'Escolha um setor'
        if (!setorSecundario && (setorPrimario !== 'Construção' && setorPrimario !== 'Eletricidade e Gás')) setorError = 'Escolha um setor'
        if (setorSecundario === 'Outro' && !outroSetorSec) setorError = 'Escolha um setor'
        if (!cidade) cidadeError = 'insira a cidade'
        if (!estado) estadoError = 'insira o estado'
        if (!responsavel_id) responsavelError = 'Selecione um responsável'

        if (unidNameError || setorError || estadoError || cidadeError || responsavelError) {
            setUnidNameError(unidNameError)
            setSetorError(setorError)
            setCidadeError(cidadeError)
            setEstadoError(estadoError)
            setResponsavelError(responsavelError)
            return false
        } else {
            return true
        }
    }

    const save = async (e) => {
        e.preventDefault()

        const isValid = validate()

        if (isValid) {

            setSaveLoading(true)

            let UnidadeOperacional = {
                "company_id": company_id,
                "unid_id": router.query._id,
                "unidName": unidName,
                "setorPrimario": setorPrimario,
                "setorSecundario": outroSetorSec || setorSecundario,
                "cnpj": cnpj,
                "inscricaoEstadual": inscricaoEstadual,
                "cep": cep,
                "logradouro": logradouro,
                "numero": numero,
                "cidade": cidade,
                "estado": estado,
                "localizacao": [latitude, longitude],
                "user_id": user_id,
                "responsavel_id": responsavel_id,
                "email": email,
                "group": groupSelected && groupSelected !== "novoGrupo" ? groupSelected : newGroup,
                "responsavelStatus": responsavelStatus,
                "userStatus": userStatus
            }

            await axios.patch(`${baseUrl()}/api/unidEdit`, UnidadeOperacional)
                // .then(async res => {
                // const data = {
                //     "company_id": company_id,
                //     "_id": user_id,
                //     "message": `${userName} adicionou a unidade ${unidName}`,
                //     "userProfilePic": userProfilePic,
                //     "link": `${baseUrl()}/companyList`
                // }
                // await axios.patch(`${baseUrl()}/api/notifications`, data)
                //     .then(res => console.log('foi'))
                // })
                .then(res => Router.push('/unitsManagement'))
                .catch(error => {
                    setUnidNameError(error.response.data.error)
                    setSaveLoading(false)
                })

        } else {
            setSaveLoading(false)
            return
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
                    <Title title={`Editar Unidade "${unidName}"`} subtitle={'bla bla bla'} backButton />

                    <div className="pagesContent shadow fadeItem">

                        <div className="container">
                            <div className="row">
                                <div className="col-12">

                                    <div className="form mt-1">
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12 px-1">
                                                        <h5 className="h5_title">Dados Cadastrais</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-12 col-xl-6 px-1">
                                                <label className='akvo_form_label'>Nome da Unidade *</label>
                                                <input
                                                    type="text"
                                                    className='form-control akvo_form_control_sm'
                                                    value={unidName} onChange={e => setUnidName(e.target.value)} />
                                                <small className='text-danger error_font_size'>{unidNameError}</small>
                                            </div>
                                            <div className="form-group col-12 col-xl-6 px-1">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox" role="switch" id="cnpjCheck"
                                                                onChange={e => setHandleCnpj(e.target.checked)} checked={cnpj || handleCnpj} />
                                                            <label className='akvo_form_label'>CNPJ</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox" role="switch" id="inscEstCheck"
                                                                onChange={e => setHandleInscEst(e.target.checked)} checked={inscricaoEstadual || handleInscEst} />
                                                            <label className='akvo_form_label'>Inscrição estadual</label>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="input-group mb-1">

                                                    <input
                                                        type="text"
                                                        className='form-control akvo_form_control_sm '
                                                        disabled={!handleCnpj} value={cnpj}
                                                        onChange={e => maskCnpj(e.target.value)} />
                                                    <input
                                                        type="text"
                                                        className='form-control akvo_form_control_sm '
                                                        disabled={!handleInscEst} value={inscricaoEstadual}
                                                        onChange={e => maskinscricaoEstadual(e.target.value)} />
                                                </div>
                                                {/* <small className='text-danger error_font_size'>Error</small> */}
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="form-group col-12 col-xl-4 px-1">
                                                <h5 className="h5_title">Setor *</h5>
                                                <Setores onChange={(setorPrimario, setorSecundario, outroSetorSec) => {
                                                    setSetorPrimario(setorPrimario)
                                                    setSetorSecundario(setorSecundario)
                                                    setOutroSetorSec(outroSetorSec)
                                                }}
                                                    setorPrimario={setorPrimario}
                                                    setorSecundario={setorSecundario ? setorSecundario : outroSetorSec} className="mb-0" />
                                                <small className='text-danger error_font_size'>{setorError}</small>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <div className="row form-group">
                                                    <div className=" col-12 col-xl-2 px-1">
                                                        <h5 className="h5_title">Localização:</h5>
                                                    </div>
                                                    {/* <div className="col-12 col-xl-2">
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        onChange={e => setEndereco(e.target.checked)} checked={endereco} />
                                                    <label className='akvo_form_label'>Endereço</label>
                                                </div>
                                            </div> */}
                                                    <div className="col-12 col-xl-2">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                onChange={e => setCoordenadas(e.target.checked)} checked={coordenadas || latitude || longitude} />
                                                            <label className='akvo_form_label' >Coordenadas</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-2 fadeItem">
                                                    <div className="form-grup col-12 col-xl-2 px-1">
                                                        <label className="akvo_form_label">CEP</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            value={cep}
                                                            onChange={e => maskCep(e.target.value)}
                                                            onBlur={e => onBlurCep(e)} />
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-5 px-1">
                                                        <label className="akvo_form_label">Rua</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="logradouro" value={logradouro}
                                                            onChange={e => setLogradouro(e.target.value)} />
                                                    </div>

                                                    <div className="form-grup col-12 col-xl-2 px-1">
                                                        <label className="akvo_form_label">Número</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            value={numero}
                                                            onChange={e => maskNumero(e.target.value)} />
                                                    </div>
                                                    <div className="form-grup col-12 col-xl-2 px-1">
                                                        <label className="akvo_form_label">Cidade *</label>
                                                        <input type="text" className="form-control akvo_form_control_sm "
                                                            name="cidade" value={cidade}
                                                            onChange={e => setCidade(e.target.value)} />
                                                        <small className='text-danger error_font_size'>{cidadeError}</small>
                                                    </div>
                                                    <div className="form-grup col-12 col-xl-1 px-1">
                                                        <label className="akvo_form_label">Estado *</label>

                                                        <EstadosList onChange={value => setEstado(value)} value={estado} />
                                                        <small className='text-danger error_font_size'>{estadoError}</small>
                                                    </div>
                                                </div>
                                                {coordenadas && (
                                                    <div className="row fadeItem">
                                                        <div className="form-grup col-12 col-xl-2 px-1">
                                                            <label className="akvo_form_label">Latitude</label>
                                                            <input type="text" className="form-control akvo_form_control_sm "
                                                                value={latitude}
                                                                onChange={e => maskLatitude(e.target.value)} />
                                                        </div>

                                                        <div className="form-grup col-12 col-xl-2 px-1">
                                                            <label className="akvo_form_label">Longitude</label>
                                                            <input type="text" className="form-control akvo_form_control_sm "
                                                                name="logradouro" value={longitude}
                                                                onChange={e => maskLongitude(e.target.value)} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 px-1">
                                                    <h5 className="h5_title">Responsável</h5>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">

                                                <ResponsavelTable
                                                    users={usersList} responsavel_id={responsavel_id}
                                                    onChange={(responsavelId, email, responsavelStatus) => { setResponsavel_id(responsavelId); setEmail(email); setResponsavelStatus(responsavelStatus) }}
                                                    userConfig={userConfig} company_id={company_id} reload={() => { dataFunction(company_id, dateLimit); setNewUserLoading(true) }} dateLimit={dateLimit} />
                                                <small className='text-danger error_font_size'>{responsavelError}</small>

                                                {newUserLoading && (
                                                    <div className="d-flex justify-content-center mt-5">
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 px-1">
                                                    <h5 className="h5_title">Grupo</h5></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-grup d-inline-flex col-12 col-xl-3 px-1 align-items-center">
                                                <select className="form-select  akvo_form_control_sm" aria-label="Default select example" id="groupSelect" onChange={e => setGroupSelected(e.target.value)}>
                                                    <option value="">Sem grupo</option>
                                                    {groups.map((elem, i) => <option value={elem} key={i}>{elem}</option>)}
                                                    <option value="novoGrupo">Novo grupo</option>
                                                </select>
                                                {groupSelected === "novoGrupo" && (
                                                    <FontAwesomeIcon icon={faCircleArrowDown} className="ms-2 text-success fadeItem" />
                                                )}

                                            </div>

                                            {/* {addGroup ?
                                        <div className="form-grup col-12 col-xl-3 px-1">
                                            <div className="input-group fadeItem">
                                                <input type="text" className="form-control akvo_form_control_sm form" placeholder="Nome do grupo" aria-label="Nome do grupo" aria-describedby="button-addon2" />
                                                <button className="akvo_btn akvo_btn_danger btn-sm" type="button" id="button-addon2" onClick={() => setAddGroup(false)}><FontAwesomeIcon icon={faXmark} /></button>
                                            </div>
                                        </div>
                                        :
                                        <div className="form-grup col-12 col-xl-3 fadeItem px-1">
                                            <button className='akvo_btn akvo_btn_success btn-sm' onClick={() => { setAddGroup(true); setGroupSelected('') }}>+ Adicionar grupo</button>
                                        </div>
                                    } */}
                                        </div>
                                        {groupSelected === "novoGrupo" && (
                                            <div className="form-grup my-2 col-12 col-xl-3 px-1 fadeItem">
                                                <input type="text"
                                                    className="form-control akvo_form_control_sm form"
                                                    placeholder="Nome do grupo" aria-label="Nome do grupo"
                                                    aria-describedby="button-addon2" value={newGroup}
                                                    onChange={e => setNewGroup(e.target.value)} />
                                            </div>

                                        )}
                                    </div>
                                    <hr />

                                    <div className="row ">
                                        <div className="col-12 d-flex justify-content-end">
                                            {saveLoading ?
                                                <button className="akvo_btn akvo_btn_primary btn-sm" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                    Salvando...
                                                </button>
                                                :
                                                <button className="akvo_btn akvo_btn_primary btn-sm"
                                                    id="salvarButton" onClick={e => save(e)}>
                                                    Salvar
                                                </button>
                                            }
                                            <Link href="/unitsManagement">
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

                </>
            }
        </div>

    )
}