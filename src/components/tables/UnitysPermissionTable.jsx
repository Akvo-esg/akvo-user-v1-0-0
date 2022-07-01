import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default function UnitysPermissionTable(props) {

    const [searchElement, setSearchElement] = useState('')
    const [permissions, setPermissions] = useState(props.permissions ? props.permissions : [])
    const [permissionErrorAlert, setPermissionErrorAlert] = useState(false)

    useEffect(() => {
        if (!props.permissions) {
            const admGlobalPerm = []
            props.unidades.map(elem => {
                admGlobalPerm.push(elem._id)
            })
            setPermissions(admGlobalPerm)
        } else {
            setPermissions(props.permissions)
        }
    }, [props.permissions])

    const handleUnidSelect = (id, checked, responsavel_id = '') => {

        if (responsavel_id === props.editUser_id) {
            setPermissionErrorAlert(false)
            setPermissionErrorAlert(true)

            setTimeout(() => {
                setPermissionErrorAlert(false)
            }, 5000)
        } else {
            let permissionsSelect = permissions

            const idExists = permissionsSelect.indexOf(id)

            if (idExists === -1) {
                permissionsSelect.push(id)
                props.onChange(permissionsSelect)
            } else {
                if (!checked) {
                    const filtered = permissionsSelect.filter(function (elem) { return elem !== id })
                    props.onChange(filtered)
                }
            }

        }



    }

    const selectAll = (checked) => {

        if (checked) {
            let permissionsSelect = []

            props.unidades.filter(val => {
                if (searchElement == '') {
                    return val
                } else if (
                    val.unidName.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                    val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                    val.group.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                    val.responsavel_id.toString() === props.editUser_id
                ) {
                    return val
                }
            }).map(elem => {
                permissionsSelect.push(elem._id.toString())
            })

            props.onChange(permissionsSelect)
        } else {
            let responsavelPerm = []

            props.unidades.map(elem => {
                if (elem.responsavel_id === props.editUser_id) {
                    responsavelPerm.push(elem._id.toString())
                }
            })
            props.onChange(responsavelPerm)
        }

    }


    return (
        <>
            {permissionErrorAlert && (
                <small>
                    <div className="alert alert-danger fadeItem" role="alert">
                        O usuário é responsável por esta unidade!
                    </div>
                </small>
            )}
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
            </div>


            <small>
                <small>
                    <table className="table table-striped fadeItem">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div className="form-check form-switch d-flex align-items-end">
                                        <input className="form-check-input" type="checkbox" role="switch" id="selectAll" onChange={e => selectAll(e.target.checked)} />
                                    </div>
                                </th>
                                <th scope="col">Grupo</th>
                                <th scope="col">Nome da Unidade</th>
                                <th scope="col">Cidade/UF</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.unidades.filter(val => {
                                if (searchElement == '') {
                                    return val
                                } else if (
                                    val.unidName.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                                    val.group.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase())
                                ) {
                                    return val
                                }
                            }).map((elem, i) => {
                                if (elem.active && !elem.deleted) {

                                    return (
                                        <tr key={i}>
                                            <th scope="row">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input selectItems" type="checkbox" role="switch" id={`elem${elem._id}`} onChange={e => handleUnidSelect(elem._id, e.target.checked, elem.responsavel_id)} checked={permissions.indexOf(elem._id) !== -1} />
                                                </div>
                                            </th>
                                            <td>{elem.group}</td>
                                            <td><label htmlFor={`elem${i}`}>{elem.unidName}</label></td>
                                            <td>{elem.cidade ? elem.cidade : "não especificado"}/{elem.estado ? elem.estado : "não especificado"}</td>
                                        </tr>

                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </small>
            </small>
        </>
    )
}