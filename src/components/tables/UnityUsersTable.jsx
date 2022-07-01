import { faCheckCircle, faCircle, faSearch, faTrashAlt, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../../utils/baseUrl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}

export default function UnityUsersTable(props) {

    const [searchElement, setSearchElement] = useState('')
    const [disableItem, setDisableItem] = useState('')
    const [deleteItem, setDeleteItem] = useState('')


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start">
                            <small className="p me-2"><FontAwesomeIcon icon={faCircle} className="ms-1 text-success pe-1" />Responsável pela unidade</small>
                            <small className="p"><FontAwesomeIcon icon={faCircle} className="ms-1 text-danger pe-1" />Usuário inativo</small>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <div className="row">
                                <div className="col-12 ">
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
                    </div>
                </div>
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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.users.filter(elem => {
                                return elem._id.toString() === props.responsavel_id
                            }).filter(val => {
                                const name = `${val.firstName} ${val.lastName}`
                                if (searchElement == '') {
                                    return val
                                } else if (
                                    name.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.email.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.celular.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.estado.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase())
                                ) {
                                    return val
                                }
                            }).map((elem, i) => {
                                if (!elem.deleted) {

                                    return (
                                        <tr key={i} className="fadeItem">
                                            <td><img src={elem.profileImageUrl} alt="Profile Image" className="akvo-sm-profile-img " /></td>
                                            <th scope="row " className='position-relative'>{elem.firstName} {elem.lastName}
                                                <FontAwesomeIcon icon={faCircle} className="ms-1 text-success" />
                                                {!elem.active && (
                                                    <FontAwesomeIcon icon={faCircle} className="ms-1 text-danger" />
                                                )}
                                            </th>
                                            <td>{elem.email}</td>
                                            <td>{elem.celular}</td>
                                            <td>{elem.cidade}/{elem.estado}</td>
                                            {elem.userStatus === "admGlobal" && (
                                                <td>Adm. Global</td>
                                            )}
                                            {elem.userStatus === "admLocal" && (
                                                <td>Adm. Local</td>
                                            )}
                                            {elem.userStatus === "user" && (
                                                <td>Usuário</td>
                                            )}
                                            {elem.userStatus === "auditor" && (
                                                <td>Auditor</td>
                                            )}
                                            <td>
                                                <div className="d-inline-flex justify-content-center" >
                                                    <Link href={`/userView/${elem._id}`}>
                                                        <span type="button" className="mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )
                            }
                            {props.users.filter(elem => {
                                return elem._id !== props.responsavel_id
                            }).filter(val => {
                                const name = `${val.firstName} ${val.lastName}`
                                if (searchElement == '') {
                                    return val
                                } else if (
                                    name.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.email.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.celular.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.estado.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase())
                                ) {
                                    return val
                                }
                            }).map((elem, i) => {
                                if (!elem.deleted) {
                                    return (
                                        <tr key={i} className="fadeItem">
                                            <td><img src={elem.profileImageUrl} alt="Profile Image" className="akvo-sm-profile-img " /></td>
                                            <th scope="row " className='position-relative'>{elem.firstName} {elem.lastName}
                                                {!elem.active && (
                                                    <FontAwesomeIcon icon={faCircle} className="ms-1 text-danger" />

                                                )}
                                            </th>
                                            <td>{elem.email}</td>
                                            <td>{elem.celular}</td>
                                            <td>{elem.cidade}/{elem.estado}</td>
                                            {elem.userStatus === "admGlobal" && (
                                                <td>Adm. Global</td>
                                            )}
                                            {elem.userStatus === "admLocal" && (
                                                <td>Adm. Local</td>
                                            )}
                                            {elem.userStatus === "user" && (
                                                <td>Usuário</td>
                                            )}
                                            {elem.userStatus === "auditor" && (
                                                <td>Auditor</td>
                                            )}
                                            <td>
                                                <div className="d-inline-flex justify-content-center" >
                                                    <Link href={`/userView/${elem._id}`}>
                                                        <span type="button" className="mx-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Visualizar">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )
                            }

                        </tbody>
                    </table>
                </small>
            </div >
        </>
    )
}