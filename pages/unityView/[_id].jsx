import Title from "../../src/components/title/Title"
import axios from "axios"
import baseUrl from "../../utils/baseUrl"
import { useState, useEffect } from "react"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import sidebarHide from "../../utils/sidebarHide"
import { userRestriction } from "../../utils/permission"
import { useRouter } from 'next/router'
import UnityUsersTable from "../../src/components/tables/UnityUsersTable"
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}



export default function UnityView() {

    const router = useRouter()

    //User Info
    const [user_id, setUser_id] = useState('')
    const [token, setToken] = useState('')
    const [company_id, setCompany_id] = useState('')
    const [userPermissions, setUserPermissions] = useState([])

    const [loading, setLoading] = useState(true)
    const [addCompanyButton, setAddCompanyButton] = useState(false)



    const [unidName, setUnidName] = useState('')
    const [setorPrimario, setSetorPrimario] = useState('')
    const [setorSecundario, setSetorSecundario] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep] = useState('')
    const [coordenadas, setCoordenadas] = useState(false)
    const [cnpj, setCnpj] = useState('')
    const [inscricaoEstadual, setInscricaoEstadual] = useState('')
    const [group, setGroup] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const [responsavel, setResponsavel] = useState([])
    const [unid_id, setUnid_id] = useState('')
    const [active, setActive] = useState('')

    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))

    }, [])

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    useEffect(() => {



        if (token && router) {
            const data = jwt.decode(token)
            setUser_id(data.sub)
            userRestriction(['auditor'], data.userStatus, true)
            if (data.company_id) {
                setCompany_id(data.company_id)
                setUserPermissions(data.permissions)
                setUnid_id(router.query._id)
                dataFunction(data.company_id)
            } else {
                setLoading(false)
                setAddCompanyButton(true)
            }
        } else {
            return
        }
    }, [token, router])

    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/unidEdit`, {
            params: {
                "company_id": company_id,
                "unid_id": router.query._id
            }
        }).then(res => {
            const data = res.data.data[0]
            const users = res.data.users
            const responsavel = res.data.users.filter(elem => elem._id.toString() === data.responsavel_id)
            setUnidName(data.unidName)
            setSetorPrimario(data.setorPrimario)
            setSetorSecundario(data.setorSecundario)
            setCnpj(data.cnpj)
            setInscricaoEstadual(data.inscricaoEstadual)
            setCidade(data.cidade)
            setEstado(data.estado)
            setLogradouro(data.logradouro)
            setNumero(data.numero)
            setCep(data.cep)
            setCoordenadas(data.localizacao)
            setEmail(data.email)
            setGroup(data.group)
            setActive(data.active)

            setUsers(users)

            setResponsavel(responsavel)

            setLoading(false)

        }).catch(e => {
            console.log(e)

        })

        // await axios.get(`${baseUrl()}/api/companyUsers`, {
        //     params: {
        //         company_id: company_id
        //     }
        // }).then(res => {
        //     const allUsersArray = res.data.data
        //     const filteredUsers = allUsersArray.filter(elem => elem.userStatus !== 'user')
        //     setUsersList(filteredUsers)
        //     setLoading(false)
        // })
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
                    <Title title={`${unidName} ${group ? ' - ' + group : ''}`} subtitle={`${setorPrimario} ${setorSecundario ? ' - ' + setorSecundario : ''} `} status={active} statusView backButton />
                    <div className="pagesContent shadow fadeItem">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row mt-2">
                                        <div className="col-12 col-lg-6 d-flex flex-column my-2 ">
                                            <div className="d-inline-flex p_neg_1">
                                                <h5 className="h5_title">CNPJ: </h5> <p className="p ms-2">{cnpj ? cnpj : 'Não informado'}</p>
                                            </div>
                                            {inscricaoEstadual && (
                                                <div className="d-inline-flex  p_neg_1">
                                                    <h5 className="h5_title">Inscrição Estadual: </h5> <p className="p ms-2">{inscricaoEstadual}</p>
                                                </div>
                                            )}
                                            <div className="d-inline-flex p_neg_1">
                                                <h5 className="h5_title">Setor: </h5> <p className="p ms-2">{`${setorPrimario} ${setorSecundario ? ' - ' + setorSecundario : ''} `}</p>
                                            </div>
                                            <div className="d-inline-flex  p_neg_1">
                                                <h5 className="h5_title">Grupo: </h5> <p className="p ms-2">{group ? group : "Sem grupo"}</p>
                                            </div>
                                            <div className="d-inline-flex  p_neg_1">
                                                <h5 className="h5_title">Responsável: </h5> <p className="p ms-2">{responsavel[0].firstName} {responsavel[0].lastName}</p>
                                            </div>
                                            <div className="d-inline-flex  p_neg_1">
                                                <h5 className="h5_title">E-mail: </h5> <p className="p ms-2">{email}</p>
                                            </div>
                                            <div className="d-inline-flex  p_neg_1">
                                                <h5 className="h5_title">Telefone: </h5> <p className="p ms-2">{responsavel[0].celular}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 d-flex flex-column my-2">
                                            <h5 className="h5_title">Localização: </h5>
                                            <p className="p mb-0">{logradouro}{numero ? ", " + numero : ''}</p>
                                            <p className="p">{cep ? 'CEP: ' + cep + ' - ' + cidade + ', ' + estado : cidade + ', ' + estado}</p>
                                            <p className="p">{coordenadas[0] ? 'Latitude: ' + coordenadas[0] : ''}</p>
                                            <p className="p">{coordenadas[1] ? 'Longitude: ' + coordenadas[1] : ''}</p>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                            <div className="col-12 d-flex">
                                                <div className="card shadow mt-3 akvo_card_auto_width px-2">
                                                    <div className="card-body">
                                                        <h5 className="h5_title">Responsável</h5>
                                                        <div className="d-inline-flex">
                                                            <div className="d-flex align-items-center me-3">
                                                                <img src={responsavel[0].profileImageUrl} className="akvo-profile-img shadow" />
                                                            </div>
                                                            <div className="d-flex flex-column">
                                                                <p className='p'>{responsavel[0].firstName} {responsavel[0].lastName}</p>
                                                                <p className='p'>{responsavel[0].email} </p>
                                                                <p className='p'>{responsavel[0].celular} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    <div className="row mt-5">
                                        <h5 className="h5_title">Usuários Cadastrados</h5>
                                        <div className="col-12">
                                            <UnityUsersTable users={users} unid_id={unid_id} responsavel_id={responsavel[0]._id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    )

}