import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../../utils/baseUrl"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function ResponsavelTable(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const [searchElement, setSearchElement] = useState('')
    const [userId, setUserId] = useState('')
    const [newUser, setNewUser] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [newUserError, setNewUserError] = useState('')

    useEffect(() => {
        if (token.userConfig === 'basico') setUserStatus('admGlobal')

        setUserId(props.responsavel_id)
    }, [])

    useEffect(() => {
        setNewUserError('')
    }, [firstName, lastName, email, userStatus])


    const validate = () => {

        let newUserError = ''
        let emailExists = props.users.find(elem => elem.email === email)
        // console.log(props.users, emailExists)

        if (!email || !email.includes('@') || !firstName || !userStatus) newUserError = 'Os campos marcados com * devem ser preenchidos'
        if (emailExists) newUserError = "E-mail já cadastrado"


        if (newUserError) {
            setNewUserError(newUserError)
            return false
        } else {
            setNewUserError('')
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

    const handleAddUser = async () => {

        const isValid = validate()

        if (isValid) {
            setSaveLoading(true)

            const password = randomPassword()

            const data = {
                firstName,
                lastName,
                email,
                company_id: token.company_id,
                userStatus,
                password: password,
                permissions: userStatus === "admGlobal" ? false : [],
            }

            await axios.post(`${baseUrl()}/api/userRegister`, data)
                .then(res => {
                    sendEmail(password)
                })
                .catch(e => {
                    console.log(e)
                })

        } else {
            setSaveLoading(false)
            return
        }

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
                .then(res => {
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setUserStatus('')
                    setNewUserError('')
                    setNewUser(false)
                    props.reload()
                })
        } catch {
            setSaveLoading(false)
            setNewUserError('Falha ao enviar o email de confirmação, tente novamente.')
        }
    }


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
            </div>

            <small>
                <table className="table table-striped fadeItem">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Telefone</th>
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
                                val.celular.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase())
                            ) {
                                return val
                            }
                        }).map((elem, i) => {
                            if (elem.active && !elem.deleted) {

                                return (
                                    <tr key={i} className="fadeItem">
                                        <th scope="row ">
                                            <div className="form-check form-switch d-flex align-items-center">
                                                <input className="form-check-input selectItems"
                                                    type="checkbox" role="switch" id={`elem${elem._id}`} value={elem._id}
                                                    onChange={e => { props.onChange(elem._id.toString(), elem.email, elem.userStatus); setUserId(e.target.value.toString()); setNewUser(false) }}
                                                    checked={userId === elem._id && !newUser} />
                                            </div>
                                        </th>
                                        <td><img src={elem.profileImageUrl} alt="Profile Image" className="akvo-sm-profile-img " /></td>
                                        <td>{elem.firstName} {elem.lastName}</td>
                                        <td>{elem.email}</td>
                                        <td>{elem.celular}</td>
                                    </tr>

                                )
                            }
                        })}
                    </tbody>
                </table>
            </small>

            {!token.dateLimit && (

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <a type="button" className="akvo-p-span" onClick={() => setNewUser(!newUser)}>O responsável ainda não foi cadastrado?</a>
                    </div>
                    {newUser && (
                        <div className="row my-1 fadeItem">
                            <div className="col-12">
                                <div className="row">
                                    <label className="akvo_form_label" >Novo usuário</label>
                                    {token.userConfig === "avancado" && (
                                        <>
                                            <div className="col-3 px-1">
                                                <input type="text" placeholder="Nome *"
                                                    className="form-control akvo_form_control_sm"
                                                    value={firstName}
                                                    onChange={e => setFirstName(e.target.value)} />
                                            </div>
                                            <div className="col-3 px-1">
                                                <input type="text" placeholder="Sobrenome"
                                                    className="form-control akvo_form_control_sm"
                                                    value={lastName}
                                                    onChange={e => setLastName(e.target.value)} />
                                            </div>
                                            <div className="col-4 px-1">
                                                <input type="text" placeholder="E-mail *"
                                                    className="form-control akvo_form_control_sm"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            <div className="col-2 px-1">
                                                <select type="text" placeholder="Status *" className="form-select akvo_form_control_sm"
                                                    onChange={e => setUserStatus(e.target.value)}>
                                                    <option value="" disabled selected>Status *</option>
                                                    <option value="admLocal">Adm. Local</option>
                                                    <option value="admGlobal">Adm. Global</option>
                                                </select>

                                            </div>
                                        </>
                                    )}
                                    {token.userConfig === "basico" && (
                                        <>
                                            <div className="col-4 px-1">
                                                <input type="text" placeholder="Nome *"
                                                    className="form-control akvo_form_control_sm"
                                                    value={firstName}
                                                    onChange={e => setFirstName(e.target.value)} />
                                            </div>
                                            <div className="col-4 px-1">
                                                <input type="text" placeholder="Sobrenome"
                                                    className="form-control akvo_form_control_sm"
                                                    value={lastName}
                                                    onChange={e => setLastName(e.target.value)} />
                                            </div>
                                            <div className="col-4 px-1">
                                                <input type="text" placeholder="E-mail *"
                                                    className="form-control akvo_form_control_sm"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)} />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="row my-1">
                                    <small className="text-danger error_font_size">{newUserError}</small>
                                    <div className="col-12 d-inline-flex justify-content-end px-1">
                                        <button className="akvo_btn akvo_btn_secondary btn-sm" onClick={() => setNewUser(false)}>Cancelar</button>
                                        {saveLoading ?
                                            <button className="akvo_btn akvo_btn_primary btn-sm ms-2" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                Atualizando
                                            </button>
                                            :
                                            <button className="akvo_btn akvo_btn_primary btn-sm ms-2" onClick={() => handleAddUser()}>Adicionar usuário</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}