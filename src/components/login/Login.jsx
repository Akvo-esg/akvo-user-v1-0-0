import styles from '../../../styles/Login.module.scss'

import Link from 'next/link'
import Head from 'next/head'
import router from 'next/router'
import { useState, useEffect, createRef } from 'react'

import axios from 'axios'
import ReCAPTCHA from "react-google-invisible-recaptcha";
import { useDispatch } from "react-redux";
import Cookie from 'js-cookie'


import { reset } from '../../../store/InventoryList/InventoryList.actions'
import baseUrl from '../../../utils/baseUrl'

export default function Login(props) {

    const dispatch = useDispatch()
    const refRecaptcha = createRef()

    const [token, setToken] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [passwordRecovery, setPasswordRecovery] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [passwordSpinner, setPasswordSpinner] = useState(false)

    useEffect(() => {
        dispatch(reset([]))
    }, [])

    useEffect(() => {
        props.onChange(token)
    }, [token])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLogin(true)

        if (!email || !password) {
            setLoginError('E-mail e/ou senha incorretos.')
            refRecaptcha.current.callbacks.reset()
            setLogin(false)
        } else {
            refRecaptcha.current.callbacks.execute()
                .then(async (res) => {

                    if (res) {
                        const user = {
                            "email": email,
                            "password": password
                        }

                        await axios.post(`${baseUrl()}/api/login`, user)
                            .then(res => localStorage.setItem('auth', (Cookie.get('auth'))))
                            .then(res => setToken(localStorage.getItem('auth')))
                            .then(res => document.location.reload())
                            .catch(err => {
                                const error = err?.response?.data?.error
                                if (error === 'conta expirou.') {
                                    alert('Conta expirou.')
                                    router.push('/premiumAccount')
                                } else {
                                    setLoginError('E-mail e/ou senha incorretos.')
                                    setLogin(false)
                                }
                            })

                    } else {
                        setLogin(false)
                    }
                })
                .catch(e => {
                    refRecaptcha.current.callbacks.reset()
                    setLogin(false)

                })
        }


    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setPasswordSpinner(true)

        if (!email) {
            setPasswordSpinner(false)
            refRecaptcha.current.callbacks.reset()
            setLoginError('Inserir e-mail.')
        } else {
            refRecaptcha.current.callbacks.execute()
                .then(async () => {
                    const user = {
                        "email": email
                    }

                    await axios.post(`${baseUrl()}/api/verifyUserEmail`, user)
                        .then(res => {
                            setLoginError('E-mail não cadastrado.')
                            setPasswordSpinner(false)
                        })
                        .catch(e => {
                            setLoginError('')
                            sendEmail()
                        })
                })
                .catch(e => console.log(e))
        }
    }

    const sendEmail = async () => {
        await axios.patch(`${baseUrl()}/api/recoverPasswordMail`, { email })
            .then(res => { setEmailSent(true); setPasswordSpinner(false) })
            .catch(e => console.log(e))
    }

    return (

        <div className={`${styles.container} container-fluid`}>

            <Head>
                <title>Akvo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="icon" href="favicon.ico" />
            </Head>



            <div className={`row justify-content-center align-items-center ${styles.login_modal} `} >

                {!passwordRecovery ?


                    // LOGIN 
                    <div className={`${styles.login_modal_width} ${styles.fadeItem} text-center`}>
                        <div className="row mb-5 mt-3">
                            <div className="col-12">
                                <img src="logo1.png" className={styles.img} alt="Akvo logo" />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12">
                                <form onSubmit={e => handleLogin(e)}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group p-0">
                                                <small className={`${styles.error_font_size} text-danger mb-1`}>{loginError}</small>
                                                <input
                                                    type="text"
                                                    className={`${styles.akvo_form_control} mb-2`}
                                                    placeholder='E-mail'
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)} />
                                                <input
                                                    type="password"
                                                    className={`${styles.akvo_form_control} mb-2`}
                                                    placeholder='Senha'
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)} />
                                                {!login ?
                                                    <button
                                                        type='submit'
                                                        className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary}`}>
                                                        Entrar
                                                    </button>
                                                    :
                                                    <button
                                                        className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} align-items-center`}
                                                        type="button"
                                                        disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Loading...</span>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className={`text-center ${styles.p} text-light m-1`} >&mdash; Novo na plataforma? &mdash;</p>
                                <Link href='/signup'>
                                    <button className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_cadastro_btn} `}>Cadastre-se</button>
                                </Link>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <p type='button' className={`${styles.p} text-light`} onClick={() => { setPasswordRecovery(!passwordRecovery); setLoginError('') }}>Esqueci minha senha</p>
                            </div>
                        </div>
                        {(!login || login) && (
                            < ReCAPTCHA
                                ref={refRecaptcha}
                                sitekey='6LdNe4UeAAAAAJzd9uyd1cKlOyM6pzpGL4hF9BVX' />
                        )}
                    </div>



                    :


                    // RECUPERAR SENHA
                    <div className={`${styles.login_modal_width} ${styles.fadeItem}`}>
                        {emailSent && (
                            <div className="alert alert-success fadeItem mt-2" role="alert">
                                Verifique seu email!
                            </div>
                        )}
                        <div className="mt-3 text-white">
                            <h6>Recuperação de senha</h6>
                            <p className={`${styles.p} text-light`}>Insira o endereço de e-mail associado à sua conta Akvo.</p>
                            <small className={`${styles.error_font_size} text-danger mb-1`}>{loginError}</small>
                            <form onSubmit={e => handleResetPassword(e)}>
                                <input
                                    type="text"
                                    className={`${styles.akvo_form_control} mb-2`}
                                    placeholder='E-mail'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                {!passwordSpinner ?
                                    <button
                                        type='submit'
                                        className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_cadastro_btn} `}
                                    >
                                        Enviar
                                    </button>
                                    :
                                    <button
                                        className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} ${styles.akvo_cadastro_btn}`}
                                        type="button"
                                        disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </button>

                                }
                            </form>
                        </div>

                        <div className="text-end mt-3">
                            <p type='button' className={`${styles.p} text-light`} onClick={() => { setPasswordRecovery(!passwordRecovery); setLoginError(''); setEmailSent(false) }}>&larr; Voltar</p>
                        </div>

                        <ReCAPTCHA
                            ref={refRecaptcha}
                            sitekey='6LdNe4UeAAAAAJzd9uyd1cKlOyM6pzpGL4hF9BVX' />
                    </div>

                }
            </div>

        </div>
    )
}