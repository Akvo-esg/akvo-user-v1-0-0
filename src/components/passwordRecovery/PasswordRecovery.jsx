import styles from '../../../styles/Login.module.scss'
import baseUrl from '../../../utils/baseUrl'

import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

import axios from 'axios'

export default function PasswordRecover(props) {

    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordOk, setPasswordOk] = useState(false)
    const [passwordRecoverToken, setPasswordRecoverToken] = useState('')
    const [userId, setUserId] = useState('')

    const urlSearchParams = new URLSearchParams(window.location.search)

    useEffect(() => {
        setPasswordRecoverToken(urlSearchParams.get('token'))
        setUserId(urlSearchParams.get('id'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            setPasswordError('Confirmação de senha não compatível.')
            return
        } else if (password.length < 6) {
            setPasswordError('A senha deve ter no mínimo 6 caracteres')
            return
        } else {
            setPasswordError('')
            setPasswordOk(true)

            const body = {
                userId,
                passwordRecoverToken,
                password
            }

            await axios.patch(`${baseUrl()}/api/passwordChange`, body)
                .then(res => {
                    Router.replace('/')
                    setTimeout(() => {
                        Router.reload()

                    }, 500)
                })
        }
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
                    <h5 className='text-light mt-2'> Alterar senha </h5>
                    <form onSubmit={e => handleSubmit(e)} noValidate>
                        <input
                            type="password" name="password"
                            className={`${styles.akvo_form_control} mt-2`}
                            placeholder='Nova senha' value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <input
                            type="password" name="passwordConfirm"
                            className={`${styles.akvo_form_control} mt-2`}
                            placeholder='Confirmar nova senha' value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)} />
                        <div className='text-start'>
                            <small className={`${styles.error_font_size} text-danger `}>{passwordError}</small>
                        </div>
                        {!passwordOk ?
                            <button type="submit"
                                className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} mt-2 mb-3`}>
                                Confirmar
                            </button>
                            :
                            <button type="button" disabled
                                className={`${styles.akvo_form_control} ${styles.akvo_btn} ${styles.akvo_btn_primary} mt-2 mb-3`} >
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        }
                    </form>

                </div>
            </div>
        </div >
    )



}
