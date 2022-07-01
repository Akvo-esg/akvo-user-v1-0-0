import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import baseUrl from "../utils/baseUrl"
import Title from "../src/components/title/Title"
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}

import sidebarHide from "../utils/sidebarHide";



export default function PasswordChange() {

    //Form variables
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassaword, setConfirmPassword] = useState('')

    //validate Errors
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    //User info
    const [token, setToken] = useState('')
    const [user_id, setUser_id] = useState('')

    //Render Elements
    const [loading, setLoading] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    useEffect(() => {
        sidebarHide()
    })
    useEffect(() => {
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            setUser_id(data.sub)
        } else {
            return
        }
    }, [token])

    const validate = () => {

        let oldPasswordError = ''
        let newPasswordError = ''

        if (!oldPassword) oldPasswordError = 'Senha inválida'
        if (newPassword.length < 6) newPasswordError = 'A senha deve ter no mínimo 6 caracteres'
        if (newPassword !== confirmPassaword) newPasswordError = "Confirmação de senha incorreta"
        if (!newPassword) newPasswordError = 'Digite uma senha'

        if (oldPasswordError || newPasswordError) {
            setOldPasswordError(oldPasswordError)
            setNewPasswordError(newPasswordError)
            return false
        } else {
            return true
        }
    }


    const save = async e => {
        e.preventDefault()

        const isValid = validate()

        if (isValid) {

            setLoading(true)

            const data = {
                user_id,
                oldPassword,
                newPassword
            }

            await axios.patch(`${baseUrl()}/api/passwordChange2`, data)
                .then(res => window.location.href = baseUrl())
                .catch(e => { setOldPasswordError('Senha incorreta'); setLoading(false) })
        }
    }

    const handleResetPassword = async e => {
        e.preventDefault()
        setEmailSent(false)
        setLoadingModal(true)

        await axios.patch(`${baseUrl()}/api/recoverPasswordMail2`, { user_id })
            .then(res => {
                setEmailSent(true)
                setLoadingModal(false)
            })
            .catch(e => console.log(e))
    }

    return (
        <div>
            <Title title={`Alterar senha`} subtitle={''} backButton />
            <div className="pagesContent-sm shadow fadeItem">


                <div className="form-group row mb-2">
                    <div className="col-12 col-lg-6 ">
                        <label className=" akvo_form_label">Senha antiga</label>
                        <input type="password" className="form-control akvo_form_control_sm "
                            required
                            name="email" value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)} />
                        <small className="text-danger error_font_size">{oldPasswordError}</small>

                    </div>
                </div>
                <div className="form-group row mb-2">
                    <div className="col-12 col-lg-6 ">
                        <label className="akvo_form_label">Nova senha</label>
                        <input type="password" className="form-control form-control-sm"
                            required
                            name="email" value={newPassword}
                            onChange={e => setNewPassword(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row mb-2">
                    <div className="col-12 col-lg-6 ">
                        <label className="akvo_form_label">Confirmar nova senha</label>
                        <input type="password" className="form-control form-control-sm"
                            required
                            name="email" value={confirmPassaword}
                            onChange={e => setConfirmPassword(e.target.value)} />
                        <small className="text-danger error_font_size">{newPasswordError}</small>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        {!loading ?
                            <button className="akvo_btn akvo_btn_primary btn-sm"
                                id="salvarButton"
                                type="submit"
                                onClick={e => save(e)}>
                                Alterar senha
                            </button>
                            :
                            <button className="akvo_btn akvo_btn_primary btn-sm" type="button" disabled>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Salvando...
                            </button>
                        }

                        <Link href="/">
                            <button className="akvo_btn akvo_btn_secondary btn-sm ms-2">
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <span type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#forgotPasswordModal"
                        >
                            <small className="text-primary">Esqueceu a senha?</small>
                        </span>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-start">
                                <h5 className={`h5_modal modal-title`} id="exampleModalLabel">Esqueceu a senha?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Alert */}
                                {emailSent && (
                                    <div className="alert alert-success fadeItem" role="alert">
                                        Verifique seu email!
                                    </div>
                                )}
                                <p className="p">

                                    Será enviado em seu e-mail um link para recuperação de senha.
                                </p>
                            </div>
                            <div className="modal-footer">
                                {loadingModal ?
                                    <button className="akvo_btn akvo_btn_primary btn-sm" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Enviando...
                                    </button>
                                    :
                                    <button type="button" className="akvo_btn akvo_btn_primary btn-sm" onClick={e => handleResetPassword(e)}>Enviar</button>
                                }
                                <button
                                    type="button"
                                    className="akvo_btn akvo_btn_secondary btn-sm ms-2"
                                    data-bs-dismiss="modal"
                                    onClick={() => { setEmailSent(false); setLoadingModal(false) }}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>




    )
}
