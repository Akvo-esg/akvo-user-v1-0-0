import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useState, useEffect } from 'react'
import {
    faBars,
    faBuilding,
    faCircleRight,
    faGear,
    faKey,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import axios from 'axios'
import baseUrl from '../../../utils/baseUrl'
import { editCompanyView } from '../../../utils/permission'


export default function Header() {

    const [sidebarToggleStatus, setSidebarToggleStatus] = useState(false)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [userConfig, setUserConfig] = useState('')
    const [companyEdit, setCompanyEdit] = useState(false)


    useEffect(() => {
        setToken(Cookie.get('auth'))
    }, [])

    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            setUserId(data.sub)
            setUserStatus(data.userStatus)
            dataFunction(data.company_id, data.userStatus)
        }
    }, [token])

    useEffect(() => {
        if (window.innerWidth < 800) setSidebarToggleStatus(true)
    }, [])

    const dataFunction = async (company_id, userStatus) => {

        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            setUserConfig(res.data.userConfig)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        handleSidebarToggle()
    }, [sidebarToggleStatus])

    useEffect(() => {
        const asideWidth = document.documentElement.style.getPropertyValue('--aside-width')
        if (asideWidth) setSidebarToggleStatus(true)
    }, [document.documentElement.style.getPropertyValue('--aside-width'), !document.documentElement.style.getPropertyValue('--aside-width')])


    const handleSidebarToggle = () => {
        const fixedWidht = document.documentElement.style.getPropertyValue('--aside-fixed-width')
        if (!sidebarToggleStatus) document.documentElement.style.setProperty('--aside-width', fixedWidht)
        else document.documentElement.style.setProperty('--aside-width', '0px')
    }


    const hendleSession = async () => {
        Cookie.remove('auth')
        localStorage.removeItem('auth')
        await Router.replace('/')
        Router.reload()
    }


    return (
        <nav className={`${styles.headerPosition} text-light navbar shadow-lg d-flex justify-content-between`}>
            <div className="col">
                <div className="ms-3">
                    <span
                        type="button"
                        className={styles.sidebarToggle}
                        onClick={() => setSidebarToggleStatus(!sidebarToggleStatus)}
                    >
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </span>
                </div>

            </div>
            {sidebarToggleStatus && (
                <div className="col d-flex justify-content-center fadeItem1s">
                    <Link href="/">
                        <a >
                            <img src="/logo1.png" alt="logo" className={styles.logo} />
                        </a>
                    </Link>
                </div>

            )}
            <div className="col d-flex justify-content-end me-3">
                <div className={`${styles.sidebarToggle} dropdown `}>
                    <span type="button" className="dropdown" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faGear} size="lg" />
                    </span>

                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <small >
                            <li className='mb-1 '>
                                <Link href={`/editProfile/${userId}`}>
                                    <a className="dropdown-item text-gray-dark" >
                                        <FontAwesomeIcon icon={faUser} className="me-1" /> Editar perfil
                                    </a>
                                </Link>
                            </li>
                            <li className='my-1'>
                                <Link href="/passwordChange">
                                    <a className="dropdown-item text-gray-dark" >
                                        <FontAwesomeIcon icon={faKey} className="me-1" /> Alterar senha
                                    </a>
                                </Link>
                            </li>
                            {editCompanyView(userStatus, userConfig) && (
                                <li className='my-1'>
                                    <Link href="/companyEdit">
                                        <a className="dropdown-item text-gray-dark" >
                                            <FontAwesomeIcon icon={faBuilding} className="me-1" /> Editar instituição
                                        </a>
                                    </Link>
                                </li>
                            )}
                            <li className='my-1'><hr className='dropdown-divider' /></li>
                            <li className='mt-1'>
                                <a className="dropdown-item text-gray-dark" type='button' onClick={() => hendleSession()}>
                                    <FontAwesomeIcon icon={faCircleRight} className="me-1" /> Sair
                                </a>
                            </li>
                        </small>
                    </ul>
                </div>

            </div>



        </nav>
    )



}