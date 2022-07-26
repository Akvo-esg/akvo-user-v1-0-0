import Title from '../src/components/title/Title'
import { useState, useEffect } from 'react'
import sidebarHide from "../utils/sidebarHide";
import Setores from '../src/components/formComponets/Setores';
import Link from 'next/link'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import baseUrl from '../utils/baseUrl';
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import EstadosList from '../src/components/formComponets/EstadosList';
import ResponsavelTable from '../src/components/tables/ResponsavelTable';
import { userRestriction } from '../utils/permission';

export default function UnityAdd() {

    const token = jwt.decode(Cookie.get('auth'))

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
    const [coordenadas, setCoordenadas] = useState(false)
    const [cnpj, setCnpj] = useState('')
    const [inscricaoEstadual, setinscricaoEstadual] = useState('')
    const [email, setEmail] = useState('')

    //Render components
    const [handleCnpj, setHandleCnpj] = useState(true)
    const [handleInscEst, setHandleInscEst] = useState(false)
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
        userRestriction(['user', 'auditor'], token.userStatus, true)
        if (token.company_id) {
            dataFunction(token.company_id, token.dateLimit)
        } else {
            Router.push("/companyEdit")
        }
    }, [])

    useEffect(() => {

        if (!handleCnpj) setCnpj('')
        if (!handleInscEst) setinscricaoEstadual('')
        if (!coordenadas) { setLongitude(''); setLatitude('') }

    }, [handleCnpj, handleInscEst, coordenadas])

    const dataFunction = async (company_id, dateLimit) => {

        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        }).then(res => {

            if (dateLimit && res.data.unidades.length > 0) {
                Router.push('/pricing')
            } else {
                let groups = []

                if (res.data.unidades.length > 0) {
                    res.data.unidades.map(elem => { if (elem.group && !groups.includes(elem.group)) groups.push(elem.group) })
                }
                setGroups(groups)
                setSaveLoading(false)
                setLoading(false)
                setNewUserLoading(false)
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
            const filteredUsers = allUsersArray.filter(elem => elem.userStatus !== 'user' && elem.userStatus !== 'auditor')
            setUsersList(filteredUsers)
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
                "company_id": token.company_id,
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
                "user_id": token.sub,
                "responsavel_id": responsavel_id,
                "email": email,
                "group": groupSelected && groupSelected !== "novoGrupo" ? groupSelected : newGroup,
                "responsavelStatus": responsavelStatus,
                "userStatus": token.userStatus
            }

            await axios.patch(`${baseUrl()}/api/unidadeOperacional`, UnidadeOperacional)
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
                .then(res => sendEmail())
                .catch(error => {
                    setUnidNameError(error.response.data.error)
                    setSaveLoading(false)
                })


        } else {
            setSaveLoading(false)
            return
        }
    }
    const sendEmail = async () => {

        const data = {
            unidName,
            email,
            link: `${baseUrl()}/inventory`
        }

        try {
            await fetch('/api/unityMail', {
                method: 'post',
                body: JSON.stringify(data)
            }).then(res => {
                Router.push('/unitsManagement')
            })

        } catch {
        }
    }



    return (
        <div>
            <Title title={`Adicionar Unidade`} subtitle={'bla bla bla'} backButton />


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
                                                            type="checkbox" role="switch"
                                                            onChange={e => setHandleCnpj(e.target.checked)} checked={cnpj || handleCnpj} />
                                                        <label className='akvo_form_label'>CNPJ</label>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox" role="switch"
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
                                            }} className="mb-0" />
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
                                                            onChange={e => setCoordenadas(e.target.checked)} checked={coordenadas} />
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
                                                <p className='p'>Somente administradores podem ser responsáveis pelas unidades. <br />
                                                    Caso o responsável foi cadastrado como &quot;Usuário&quot;, você deve alterar o status deste para &quot;Administrador&quot; na seção de <Link href={"/usersManagement"}>Gestão de Usuários</Link>. <br />
                                                    Você poderá alterar o responsável pela unidade a qualquer momento na seção <Link href="/unitsManagement">Gestão de Unidades</Link>.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">

                                            {usersList.length > 0 && (
                                                <>
                                                    <ResponsavelTable
                                                        users={usersList}
                                                        onChange={(responsavelId, email, responsavelStatus) => { setResponsavel_id(responsavelId); setEmail(email); setResponsavelStatus(responsavelStatus) }}
                                                        reload={() => { dataFunction(company_id, dateLimit); setNewUserLoading(true) }} />
                                                    <small className='text-danger error_font_size'>{responsavelError}</small>
                                                </>
                                            )
                                            }
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
                                                <h5 className="h5_title">Deseja incluir a unidade em um grupo?</h5>
                                                <p className='p'>Utilize essa funcionalidade se sua instituição possui unidades operacionais de diversas categorias, empresas distintas com filiais próprias ou se você deseja criar grupos para gestão das emissões de GEE.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-grup d-inline-flex col-12 col-xl-3 px-1 align-items-center">
                                            <select className="form-select  akvo_form_control_sm" aria-label="Default select example" onChange={e => setGroupSelected(e.target.value)}>
                                                <option selected value="">Sem grupo</option>
                                                {groups.map((elem, i) => <option value={elem} key={i}>{elem}</option>
                                                )}
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
            }
        </div>

    )
}