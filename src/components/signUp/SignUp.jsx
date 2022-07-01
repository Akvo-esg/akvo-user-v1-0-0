import styles from '../../../styles/Login.module.scss'
import baseUrl from '../../../utils/baseUrl'

import Link from 'next/link'
import Head from 'next/head'
import router from 'next/router'
import { useState, useEffect, createRef } from 'react'

import axios from 'axios'
import ReCAPTCHA from "react-google-invisible-recaptcha";

import PolicyText from './PolicyText'

if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");

}


export default function SignUp() {

    const refRecaptcha = createRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [loading, setLoading] = useState(false)
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [celularError, setCelularError] = useState('')
    const [secureCode, setSecureCode] = useState('')
    const [emailCode, setEmailCode] = useState('')
    const [emailConfirmLoading, setEmailConfirmLoading] = useState(false)
    const [emailConfirmError, setEmailConfirmError] = useState('')
    const [resendEmailAlert, setResendEmailAlert] = useState(false)

    const maskTelefone = (value) => {
        return setCelular(value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1'))
    }

    const validate = () => {

        let firstNameError = ''
        let lastNameError = ''
        let emailError = ''
        let celularError = ''
        let passwordError = ''


        if (!firstName) firstNameError = 'Digite seu nome'
        if (!lastName) lastNameError = 'Digite seu sobrenome'
        if (!email || !email.includes('@')) emailError = 'E-mail inválido'
        if (!celular) celularError = 'Digita seu número de celular'
        if (password.length < 6) passwordError = 'A senha deve ter no mínimo 6 caracteres'
        if (!password) passwordError = 'Digite uma senha'

        if (firstNameError || lastNameError || emailError || celularError || passwordError) {
            setFirstNameError(firstNameError)
            setLastNameError(lastNameError)
            setEmailError(emailError)
            setCelularError(celularError)
            setPasswordError(passwordError)
            return true
        } else {
            setFirstNameError('')
            setLastNameError('')
            setEmailError('')
            setCelularError('')
            setPasswordError('')
            setEmailConfirmError('')
            setSecureCode('')

            return false
        }
    }


    const save = async e => {
        e.preventDefault()

        const isValid = validate()

        if (!isValid) {

            setLoading(true)

            const data = {
                email: email
            }

            refRecaptcha.current.callbacks.execute()
                .then(async () => {
                    await axios.post(`${baseUrl()}/api/verifyUserEmail`, data)
                        .then(res => sendEmail())
                        .catch(e => {
                            setLoading(false)
                            setEmailError('E-mail já cadastrado')

                            return
                        })
                })
        } else {
            refRecaptcha.current.callbacks.reset()
            return
        }
    }



    const sendEmail = async () => {

        const data = {
            firstName,
            lastName,
            email,
            celular,
            password
        }

        try {
            await fetch('/api/mail', {
                method: 'post',
                body: JSON.stringify(data)
            }).then(res => {

                var myModal = new bootstrap.Modal(document.getElementById('emailConfirmationModal'))
                myModal.show()
                return Promise.all([res.json(), res])
            }).then(([responseData]) => {
                setSecureCode(responseData.code)
            })

        } catch {
            setLoading(false)
            setEmailError('E-mail já cadastrado.')
        }

        return
    }


    const register = async e => {
        setEmailConfirmLoading(true)

        const data = {
            firstName,
            lastName,
            email,
            celular,
            password,
            emailCode,
            secureCode
        }

        await axios.post(`${baseUrl()}/api/registerFreeAccount`, data)
            .then()
            .then(res => {
                window.location.href = baseUrl()
            })
            .catch(() => {
                setEmailConfirmLoading(false)
                setEmailConfirmError('Código incorreto.')
            })


    }

    const resendEmail = (e) => {
        e.preventDefault()

        sendEmail()
        setResendEmailAlert(true)
        return
    }

    return (

        <div className={`${styles.container} container-fluid`}>
            <Head>
                <title>Akvo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="icon" href="favicon.ico" />
            </Head>

            <div className={`row justify-content-center align-items-center ${styles.login_modal} `} >
                <div className={`${styles.login_modal_width} ${styles.fadeItem} text-center`}>
                    <div className="row mb-4 mt-3">
                        <div className="col-12">
                            <img src="logo1.png" className={styles.img} alt="Akvo logo" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group p-0">
                                        <div className="text-start mb-3">

                                            <p className={`text-center ${styles.p} text-light m-1`} >Teste a Akvo por 7 dias!</p>
                                        </div>
                                        <input
                                            type="text" name="firstName"
                                            className={`${styles.akvo_form_control}`}
                                            placeholder='Nome' value={firstName}
                                            onChange={e => setFirstName(e.target.value)} />
                                        <div className='text-start'>
                                            <small className={`${styles.error_font_size} text-danger `}>{firstNameError}</small>
                                        </div>
                                        <input
                                            type="text" name="lastName"
                                            className={`${styles.akvo_form_control} mt-2`}
                                            placeholder='Sobrenome' value={lastName}
                                            onChange={e => setlastName(e.target.value)} />
                                        <div className='text-start'>
                                            <small className={`${styles.error_font_size} text-danger `}>{lastNameError}</small>
                                        </div>
                                        <input
                                            type="text" name="celular"
                                            className={`${styles.akvo_form_control} mt-2`}
                                            placeholder='Celular' value={celular}
                                            onChange={e => maskTelefone(e.target.value)} />
                                        <div className='text-start'>
                                            <small className={`${styles.error_font_size} text-danger `}>{celularError}</small>
                                        </div>
                                        <input
                                            type="text" name="email"
                                            className={`${styles.akvo_form_control} mt-2`}
                                            placeholder='E-mail' value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                        <div className='text-start'>
                                            <small className={`${styles.error_font_size} text-danger `}>{emailError}</small>
                                        </div>
                                        <input
                                            type="password" name="password"
                                            className={`${styles.akvo_form_control} mt-2`}
                                            placeholder='Senha' value={password}
                                            onChange={e => setPassword(e.target.value)} />
                                        <div className='text-start'>
                                            <small className={`${styles.error_font_size} text-danger `}>{passwordError}</small>
                                        </div>
                                        {!loading ?
                                            <button
                                                type='button' data-bs-toggle="modal" data-bs-target="#policyModal"
                                                className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} mt-2`}>
                                                Cadastrar
                                            </button>
                                            :
                                            <button
                                                className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} mt-2 align-items-center`}
                                                type="button"
                                                disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span className="visually-hidden">Loading...</span>
                                            </button>
                                        }




                                        <div className="modal fade" id="policyModal" tabIndex="-1" aria-labelledby="policyModal" aria-hidden="true" data-bs-backdrop="static">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header text-start">
                                                        <h5 className={`${styles.h5_modal} modal-title`} id="exampleModalLabel">
                                                            Termos de uso, Política de Dados e Política de Privacidade
                                                        </h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <PolicyText />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button" data-bs-dismiss="modal"
                                                            className={`${styles.akvo_btn} ${styles.akvo_btn_secondary} ${styles.akvo_modal_button}`} >Fechar</button>
                                                        <button type="button" data-bs-dismiss="modal"
                                                            className={`${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_modal_button}`}
                                                            onClick={e => save(e)}>
                                                            Concordar e Cadastrar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                        <div className="modal fade" id="emailConfirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-md" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header text-start">
                                                        <h5 className={`${styles.h5_modal} modal-title`} id="exampleModalLabel">
                                                            Verifique seu e-mail!
                                                        </h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setLoading(false)}></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="text-start">
                                                            {resendEmailAlert && (
                                                                <small>
                                                                    <div className="alert alert-success fadeItem" role="alert">
                                                                        Verifique seu e-mail novamente.
                                                                    </div>
                                                                </small>
                                                            )}
                                                            <p className={`${styles.p} text-dark`}>
                                                                Enviamos em seu e-mail o código de autenticação.
                                                                Insira o código no campo abaixo:</p>
                                                        </div>
                                                        <div className="row justify-content-center mt-2">
                                                            <div className="col-6">
                                                                <input type="text"
                                                                    className={`${styles.akvo_form_control_dark} text-center`}
                                                                    name="emailCode"
                                                                    value={emailCode}
                                                                    onChange={e => setEmailCode(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-center">
                                                            <div className="col-12">
                                                                <small className="text-danger">{emailConfirmError}</small>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <p type="button"
                                                                    className={`${styles.p} text-dark`}
                                                                    onClick={e => resendEmail(e)}>
                                                                    <small>Enviar código novamente</small>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button" data-bs-dismiss="modal"
                                                            className={`${styles.akvo_btn} ${styles.akvo_btn_secondary} ${styles.akvo_modal_button}`} onClick={() => setLoading(false)}>
                                                            Cancelar
                                                        </button>
                                                        {!emailConfirmLoading ?

                                                            <button type="button"
                                                                className={`${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_modal_button}`}
                                                                onClick={e => register(e)}>
                                                                Continuar
                                                            </button>
                                                            :
                                                            <button
                                                                className={`${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_modal_button}`}
                                                                type="button"
                                                                disabled>
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Loading...</span>
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-12">
                            <p className={`text-center ${styles.p} text-light m-1`} >&mdash; Já possui cadastro? &mdash;</p>
                            <Link href='/'>
                                <button className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_cadastro_btn} `}>Entrar</button>
                            </Link>
                        </div>
                    </div>
                    <ReCAPTCHA
                        ref={refRecaptcha}
                        sitekey='6LdNe4UeAAAAAJzd9uyd1cKlOyM6pzpGL4hF9BVX' />
                </div>

            </div>
        </div>
    )
}