import { faCheckCircle, faSearch, faTrashAlt, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../../utils/baseUrl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { userRestriction, editCompanyView } from '../../../utils/permission'

if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}

export default function ResponsavelTable(props) {

    const [searchElement, setSearchElement] = useState('')
    const [disableItem, setDisableItem] = useState('')
    const [deleteItem, setDeleteItem] = useState('')

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }, [searchElement, props.unidades.length,])

    const responsavelImg = (id) => {
        const userImg = props.users.filter(elem => elem._id === id)
        return userImg[0].profileImageUrl
    }
    const responsavelName = (id) => {
        const userName = props.users.filter(elem => elem._id === id)
        return `${userName[0].firstName} ${userName[0].lastName}`
    }


    const handleActiveModal = (unidName, unid_id, active) => {

        const data = [
            unidName,
            unid_id,
            active
        ]
        setDisableItem(data)

        var myModal = new bootstrap.Modal(document.getElementById('unityDisable'))
        myModal.show()
        return
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
            unid_id: disableItem[1],
            user_id: props.user_id,
            active: disableItem[2]
        }

        await axios.patch(`${baseUrl()}/api/unidDisable`, { data })
            .then(res => props.updateList(props.company_id))
            .catch(err => console.log('err'))
    }



    const handleDelete = async () => {

        const data = {
            company_id: props.company_id,
            unid_id: deleteItem[1],
            user_id: props.user_id,
            deleted: deleteItem[2]
        }

        await axios.patch(`${baseUrl()}/api/unidDelete`, { data })
            .then(res => props.updateList(props.company_id))
            .catch(err => console.log('err'))
    }


    return (
        <>
            <div className="row">
                {props.searchInput && (

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
                )}
                <small>
                    <table className="table table-striped fadeItem">
                        <thead>
                            <tr>
                                <th scope="col">Nome da Unidade</th>
                                <th scope="col">Grupo</th>
                                <th scope="col">Responsável</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Cidade/UF</th>
                                <th scope="col">Status</th>
                                {props.editButtons && (
                                    <th scope="col"></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {props.unidades.filter(val => {
                                const name = responsavelName(val.responsavel_id)
                                if (searchElement == '') {
                                    return val
                                } else if (
                                    name.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.unidName.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.email.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.group.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
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
                                            <th scope="row ">{elem.unidName}</th>
                                            <td>{elem.group}</td>
                                            <td><img src={responsavelImg(elem.responsavel_id)} alt="Profile Image" className="akvo-smm-profile-img " /> {responsavelName(elem.responsavel_id)}</td>
                                            <td>{elem.email}</td>
                                            <td>{elem.cidade} / {elem.estado}</td>
                                            <td>{elem.active ?
                                                <span className="badge bg-success">Ativo</span>
                                                :
                                                <span className="badge bg-danger">Inativo</span>
                                            }</td>
                                            {props.editButtons && (
                                                <td>
                                                    <div className="d-inline-flex justify-content-center" >
                                                        <Link href={`/unityView/${elem._id}`}>
                                                            <span type="button" className="mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </span>
                                                        </Link>
                                                        {userRestriction(['user', 'auditor'], props.userStatus) && (props.user_id.includes(elem.responsavel_id) || editCompanyView(props.userStatus, props.userConfig)) && (
                                                            <>
                                                                <Link href={`/unityEdit/${elem._id}`} onClick={() => bootstrap.Tooltip.hide()}>
                                                                    <span type="button" className=" mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Editar">
                                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                                    </span>
                                                                </Link>
                                                                <span type="button" className="mx-2" data-bs-toggle="tooltip"
                                                                    data-bs-placement="bottom" title="Desativar"
                                                                    onClick={() => handleActiveModal(elem.unidName, elem._id, false)}>
                                                                    <FontAwesomeIcon icon={faXmarkCircle} />
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )

                                }
                            })}
                            {props.unidades.filter(val => {
                                const name = responsavelName(val.responsavel_id)
                                if (searchElement == '') {
                                    return val
                                } else if (
                                    name.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.unidName.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.email.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.group.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.estado.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    "inativo".includes(searchElement.toLocaleLowerCase())
                                ) {
                                    return val
                                }
                            }).map((elem, i) => {
                                if (elem.active === false && elem.deleted === false) {
                                    return (
                                        <tr key={i} className="fadeItem">
                                            <th scope="row ">{elem.unidName}</th>
                                            <td>{elem.group}</td>
                                            <td><img src={responsavelImg(elem.responsavel_id)} alt="Profile Image" className="akvo-smm-profile-img " /> {responsavelName(elem.responsavel_id)}</td>
                                            <td>{elem.email}</td>
                                            <td>{elem.cidade} / {elem.estado}</td>
                                            <td>{elem.active ?
                                                <span className="badge bg-success">Ativo</span>
                                                :
                                                <span className="badge bg-danger">Inativo</span>
                                            }</td>
                                            {props.editButtons && (
                                                <td>
                                                    <div className="d-inline-flex justify-content-center" >
                                                        <Link href={`/unityView/${elem._id}`}>
                                                            <span type="button" className="mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </span>
                                                        </Link>
                                                        {userRestriction(['user', 'auditor'], props.userStatus) && (props.user_id.includes(elem.responsavel_id) || editCompanyView(props.userStatus, props.userConfig)) && (
                                                            <>
                                                                <span type="button" className="mx-2" data-bs-toggle="tooltip"
                                                                    data-bs-placement="bottom" title="Reativar"
                                                                    onClick={() => handleActiveModal(elem.unidName, elem._id, true)}>
                                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                                </span>
                                                                <span type="button" className="mx-2" data-bs-toggle="tooltip"
                                                                    data-bs-placement="bottom" title="Excluir"
                                                                    onClick={() => handleDeleteModal(elem.unidName, elem._id, true)}>
                                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )

                                }
                            })}
                        </tbody>
                    </table>
                </small>
            </div >



            {/* DELETE MODAL */}
            <div className="modal fade" id="unityDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                                Deletar unidade
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSaveLoading(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-start">
                                <p className={`p text-dark`}>
                                    Tem certeza que deseja {deleteItem[2] ? "reativar" : "deletar"} a unidade &quot;{deleteItem[0]}&quot;?
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
            <div className="modal fade" id="unityDisable" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h5 className={`h5_modal modal-title`} id="exampleModalLabel">
                                {disableItem[2] ? "Reativar" : "Desativar"} unidade
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSaveLoading(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-start">
                                <p className={`p text-dark`}>
                                    Tem certeza que deseja {disableItem[2] ? "reativar" : "desativar"} a unidade &quot;{disableItem[0]}&quot;?
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
        </>
    )
}

