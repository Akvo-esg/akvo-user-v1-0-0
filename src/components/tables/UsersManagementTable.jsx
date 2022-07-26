import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faPenToSquare, faSearch,
    faXmarkCircle, faCheckCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from "../../../utils/baseUrl"
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}
import { userRestriction, userConfigUserStatusPermission } from "../../../utils/permission"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';


export default function UsersManagementTable(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const [searchElement, setSearchElement] = useState('')
    const [disableItem, setDisableItem] = useState([])
    const [deleteItem, setDeleteItem] = useState([])

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        },
        )
    }, [searchElement, props.users.length,])





    const handleActiveModal = (unidName, listUser_id, active, responsavelUnits = []) => {

        const data = [
            unidName,
            listUser_id,
            active,
            responsavelUnits
        ]
        setDisableItem(data)

        if (responsavelUnits.length > 0) {
            var myModal = new bootstrap.Modal(document.getElementById('userResponsavel'))
            myModal.show()
            return
        } else {
            var myModal = new bootstrap.Modal(document.getElementById('userDisable'))
            myModal.show()
            return
        }
    }

    const handleDeleteModal = (unidName, unid_id, unid_delete) => {

        const data = [
            unidName,
            unid_id,
            unid_delete
        ]

        setDeleteItem(data)

        var myModal = new bootstrap.Modal(document.getElementById('unityDelete'))
        myModal.show()
        return

    }

    const handleActive = async () => {

        const data = {
            company_id: props.company_id,
            listUser_id: disableItem[1],
            user_id: token.user_id,
            active: disableItem[2]
        }

        await axios.patch(`${baseUrl()}/api/userDisable`, { data })
            .then(res => props.updateList())
            .catch(err => console.log('err'))
    }



    const handleDelete = async () => {

        const data = {
            listUser_id: deleteItem[1],
            user_id: token.user_id,
            deleted: deleteItem[2]
        }

        await axios.patch(`${baseUrl()}/api/userDelete`, { data })
            .then(res => props.updateList())
            .catch(err => console.log('err'))
    }

    // const goToLink = (url) => {

    //     console.log('fhdsufhdusaf')

    //     var myTooltipEl = document.getElementById('buttonTooltip')
    //     console.log(myTooltipEl)
    //     var tooltip = new bootstrap.Tooltip(myTooltipEl)


    //     tooltip.dispose()



    // }



    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-group">
                                <input type="text"
                                    className="form-control akvo_form_control_sm form"
                                    placeholder="Procurar" aria-label="User search" aria-describedby="user-search"
                                    value={searchElement} onChange={e => setSearchElement(e.target.value)} />
                                <span className="akvo_btn btn-sm input-group-text" type="text"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <small>
                    <small>
                        <table className="table table-striped fadeItem">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Celular</th>
                                    <th scope="col">Cidade/UF</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.users.filter(val => {
                                    const name = `${val.firstName} ${val.lastName}`
                                    if (searchElement == '') {
                                        return val
                                    } else if (
                                        name.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.email.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.celular.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.estado.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        "ativo".includes(searchElement.toLocaleLowerCase())
                                    ) {
                                        return val
                                    }
                                }).map((elem, i) => {
                                    if (elem.active === true && elem.deleted === false) {
                                        return (
                                            <tr key={i} className="fadeItem">
                                                <td><img src={elem.profileImageUrl} alt="Profile Image" className="akvo-smm-profile-img " /></td>
                                                <th scope="row ">{elem.firstName} {elem.lastName}</th>
                                                <td>{elem.email}</td>
                                                <td>{elem.celular}</td>
                                                <td>{elem.cidade} / {elem.estado}</td>
                                                <td>{token.userConfig === "avancado" ? (elem.userStatus === "admGlobal" ? "Adm. Global" : elem.userStatus === "admLocal" ? "Adm. Local" : elem.userStatus === "user" ? "Usuário" : "Auditor") :
                                                    ((elem.userStatus === "admGlobal" ? "Administrador" : elem.userStatus === "admLocal" ? "Administrador" : elem.userStatus === "user" ? "Usuário" : "Auditor"))}</td>
                                                <td>{elem.active ?
                                                    <span className="badge bg-success">Ativo</span>
                                                    :
                                                    <span className="badge bg-danger">Inativo</span>
                                                }</td>
                                                <td>
                                                    <div className="d-inline-flex justify-content-center" >
                                                        <Link href={`/userView/${elem._id}`}>
                                                            <span type="button" className="mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </span>
                                                        </Link>
                                                        {userRestriction(['user', 'auditor'], token.userStatus) &&
                                                            elem._id !== token.user_id &&
                                                            userConfigUserStatusPermission(token.userConfig, token.userStatus, elem.userStatus) && (
                                                                <>
                                                                    <Link href={`/userEdit/${elem._id}`}>
                                                                        <span type="button" className=" mx-2" data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom" title="Editar" id="buttonTooltip">
                                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                                        </span>
                                                                    </Link>
                                                                    <span type="button" className="mx-2" data-bs-toggle="tooltip"
                                                                        data-bs-placement="bottom" title="Desativar"
                                                                        onClick={() => handleActiveModal(`${elem.firstName} ${elem.lastName}`, elem._id, false, elem.responsavelUnits)}>
                                                                        <FontAwesomeIcon icon={faXmarkCircle} />
                                                                    </span>
                                                                </>
                                                            )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                                {props.users.filter(val => {
                                    const name = `${val.firstName} ${val.lastName}`
                                    if (searchElement == '') {
                                        return val
                                    } else if (
                                        name.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.email.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.celular.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        val.estado.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                        "ativo".includes(searchElement.toLocaleLowerCase())
                                    ) {
                                        return val
                                    }
                                }).map((elem, i) => {
                                    if (elem.active === false && elem.deleted === false) {
                                        return (
                                            <tr key={i} className="fadeItem">
                                                <td><img src={elem.profileImageUrl} alt="Profile Image" className="akvo-smm-profile-img " /></td>
                                                <th scope="row ">{elem.firstName} {elem.lastName}</th>
                                                <td>{elem.email}</td>
                                                <td>{elem.celular}</td>
                                                <td>{elem.cidade} / {elem.estado}</td>
                                                <td>{elem.userStatus === "admGlobal" ? "Adm. Global" : elem.userStatus === "admLocal" ? "Adm. Local" : elem.userStatus === "user" ? "Usuário" : "Auditor"}</td>
                                                <td>{elem.active ?
                                                    <span className="badge bg-success">Ativo</span>
                                                    :
                                                    <span className="badge bg-danger">Inativo</span>
                                                }</td>
                                                <td>
                                                    <div className="d-inline-flex justify-content-center" >
                                                        <Link href={`/unityView/${elem._id}`}>
                                                            <span type="button" className="mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </span>
                                                        </Link>
                                                        {userRestriction(['user', 'auditor'], token.userStatus) &&
                                                            elem._id !== token.user_id &&
                                                            userConfigUserStatusPermission(token.userConfig, token.userStatus, elem.userStatus) && (
                                                                <>
                                                                    <span type="button" className="mx-2" data-bs-toggle="tooltip"
                                                                        data-bs-placement="bottom" title="Reativar"
                                                                        onClick={() => handleActiveModal(`${elem.firstName} ${elem.lastName}`, elem._id, true)}>
                                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                                    </span>
                                                                    <span type="button" className="mx-2" data-bs-toggle="tooltip"
                                                                        data-bs-placement="bottom" title="Excluir"
                                                                        onClick={() => handleDeleteModal(`${elem.firstName} ${elem.lastName}`, elem._id, true)}>
                                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                                    </span>
                                                                </>
                                                            )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>

                        </table>
                    </small>
                </small>
            </div>


            {/* DELETE MODAL */}
            <div className="modal fade" id="unityDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                                Deletar usuário
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-start">
                                <p className={`p text-dark`}>
                                    Tem certeza que deseja {deleteItem[2] ? "reativar" : "deletar"} o usuário &quot;{deleteItem[0]}&quot;?
                                </p>
                                {!deleteItem[2] && (
                                    <p className={`p text-dark`}>
                                        Você não poderá mais.....
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" data-bs-dismiss="modal"
                                className="akvo_btn akvo_btn_secondary btn-sm"
                            >
                                Cancelar
                            </button>
                            <button type="button" data-bs-dismiss="modal"
                                className="akvo_btn akvo_btn_primary btn-sm ms-2"
                                onClick={() => handleDelete()}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>




            {/* ACTIVE MODAL */}
            <div className="modal fade" id="userDisable" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                                {disableItem[2] ? "Reativar" : "Desativar"} Usuário
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-start">
                                <p className={`p text-dark`}>
                                    Tem certeza que deseja {disableItem[2] ? "reativar" : "desativar"} o usuário &quot;{disableItem[0]}&quot;?
                                </p>
                                {!disableItem[2] && (
                                    <p className={`p text-dark`}>
                                        Você não poderá mais.....
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" data-bs-dismiss="modal"
                                className="akvo_btn akvo_btn_secondary btn-sm"
                            >
                                Cancelar
                            </button>
                            <button type="button" data-bs-dismiss="modal"
                                className="akvo_btn akvo_btn_primary btn-sm ms-2"
                                onClick={() => handleActive()}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>




            {/* RESPONSAVEL MODAL */}
            <div className="modal fade" id="userResponsavel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                                {disableItem[2] ? "Reativar" : "Desativar"} Usuário
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-start">
                                <p className={`p text-dark`}>
                                    o usuário &quot;{disableItem[0]}&quot; é responsável {disableItem[3] && disableItem[3].length >= 2 ? "pelas unidades" : "pela unidade"}:
                                </p>
                                {disableItem[3] ?
                                    disableItem[3].map(elem => {
                                        return (
                                            <>
                                                <p className={`h6 text-dark my-0`}>- {elem.unidName}</p>
                                            </>
                                        )
                                    })
                                    :
                                    ''}
                                <p className={`p text-dark mt-3`}>
                                    Antes de desativar o usuário você deve substituir o responsável por {disableItem[3] && disableItem[3].length >= 2 ? "estas unidades" : "esta unidade"}.
                                </p>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" data-bs-dismiss="modal"
                                className="akvo_btn akvo_btn_secondary btn-sm"
                            >
                                Cancelar
                            </button>
                            <Link href="/unitsManagement">
                                <button type="button" data-bs-dismiss="modal"
                                    className="akvo_btn akvo_btn_primary btn-sm ms-2" >
                                    Gestão de Unidades
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}