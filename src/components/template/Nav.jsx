import { useState, useEffect } from 'react'
import styles from './Nav.module.scss'
import Link from 'next/link'
import Image from "next/image"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleRight,
    faBookOpen,
    faChartLine,
    faClipboardList,
    faDiagramProject,
    faGear,
    faHome,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { Scrollbars } from 'react-custom-scrollbars-2';
import $ from 'jquery'
import axios from 'axios'
import baseUrl from '../../../utils/baseUrl'
import { userStatusName, editCompanyView, freeAccountRedirect, userRestriction } from '../../../utils/permission'
import Accordion from 'react-bootstrap/Accordion';


export default function Nav({ children }) {

    $(document).ready(function () {
        $('.collapse').collapse
    });

    const list = useSelector(state => state.inventoryList)
    const token = jwt.decode(Cookie.get('auth'))

    const [companyLogo, setCompanyLogo] = useState('')
    const [activeId, setActiveId] = useState('0')

    useEffect(() => {
        dataFunction(token.company_id)
    }, [])


    const dataFunction = async (company_id) => {

        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        }).then(res => {
            setCompanyLogo(res.data.profileImageUrl)
        }).catch(e => {
            console.log(e)
        })
    }



    const collapseBack = (id) => {

        if (activeId === id) {
            setActiveId(null);
        } else {
            setActiveId(id);
        }

    }


    return (

        <aside className={`${styles.menuArea} shadow`}>

            <div className=" row align-items-center my-4 fadeItem">
                <div className="col">
                    <div className="row align-items-center">
                        <Link href={`/editProfile/${token.sub}`}>
                            <div className="d-flex justify-content-center">
                                <span type="button">
                                    <img src={token.profilePicture ? token.profilePicture : "./userIcon.png"} alt="User profile picture" className={`${styles.img} shadow`} />
                                </span>
                            </div>
                        </Link>
                    </div>
                    {companyLogo && (
                        <Link href={"/companyEdit"}>
                            <span type="button" className="row align-items-center mt-3">

                                <div className="d-flex justify-content-center">
                                    <img src={`${token.companyLogo}`} style={{ "height": "25px" }} className="" />
                                </div>
                            </span>
                        </Link>
                    )}
                    <div className="row align-items-center mt-2">
                        <div className={`d-flex justify-content-center ${styles.userName}`}>
                            {token.firstName} {token.lastName}
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="d-flex justify-content-center">
                            <small className={styles.userStatus}>{userStatusName(token.userStatus, token.userConfig)}</small>
                        </div>
                    </div>

                </div>

            </div>

            <Scrollbars style={{ height: "100%" }} autoHide autoHideTimeout={1000} autoHideDuration={200}>

                {/* 

                <Accordion defaultActiveKey={activeId} >

                    <div className={activeId === '0' ? 'panel-wrap active-panel' : 'panel-wrap'}>
                        <div className="panel-header">
                            <Accordion.Toggle onClick={() => toggleActive('0')} className="font-weight-bold btn-toggle" variant="link" eventKey="0">

                                Gestão de emissões
                            </Accordion.Toggle>
                        </div>

                        <Accordion.Collapse eventKey="0">
                            <div className="panel-body">Body content for panel 1</div>
                        </Accordion.Collapse>
                    </div>
                </Accordion> */}












                <ul className='accordion' id="siberbarMenu">
                    <li>
                        <Link href="/">
                            <span className="font-weight-bold "
                                type='button'
                                data-bs-toggle="collapse" data-bs-target="#InicioItem" aria-expanded="true" aria-controls="InicioItem">
                                <div className="row  align-items-center">
                                    <div className='d-flex justify-content-start '>
                                        <div className="col-1 me-2">
                                            <FontAwesomeIcon icon={faHome} className="me-2 icon" />
                                        </div>
                                        <div className="col-9">
                                            Início
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </Link>
                        <ul className="collapse" id="InicioItem" aria-labelledby="InicioItem" data-bs-parent="#siberbarMenu">
                        </ul>
                    </li>
                    {userRestriction(['auditor'], token.userStatus) && (
                        <li>
                            <Link href="/inventory">
                                <span className="font-weight-bold" type='button'
                                    data-bs-toggle="collapse" data-bs-target="#inventarioItem" aria-expanded="false" aria-controls="inventarioItem">
                                    <div className="row">
                                        <div className='d-flex'>
                                            <div className="col-1 me-2">
                                                <FontAwesomeIcon icon={faClipboardList} className="me-2 icon" />
                                            </div>
                                            <div className="col-6">
                                                Inventário
                                            </div>
                                            {list.length > 0 && (
                                                <div className="align-self-center">
                                                    <span className="badge badge-pill bg-danger text-light inventoryListLength ">
                                                        <p>
                                                            {list.length}
                                                        </p>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </span>
                            </Link>
                            <ul className="collapse" id="inventarioItem" aria-labelledby="inventarioItem" data-bs-parent="#siberbarMenu">
                            </ul>
                        </li>
                    )}
                    <li>
                        <span
                            className="font-weight-bold btn-toggle"
                            type='button' id='gestaoButton'
                            data-bs-toggle="collapse" data-bs-target="#gestaoEmissoesCollapse" aria-expanded="false" aria-controls="gestaoEmissoesCollapse"
                            onClick={e => collapseBack()}
                        >
                            <div className="row align-items-center">
                                <div className='d-flex justify-content-start '>
                                    <div className="col-1 me-2">
                                        <FontAwesomeIcon icon={faChartLine} className="icon" />
                                    </div>
                                    <div className="col-9">
                                        Gestão de emissões
                                    </div>
                                    <div className="col-1 toggleIcon">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </div>
                            </div>
                        </span>

                        <ul className="collapse" id="gestaoEmissoesCollapse" aria-labelledby="gestaoEmissoesCollapse" data-bs-parent="#siberbarMenu">
                            {userRestriction(['auditor'], token.userStatus) && (
                                <li >
                                    <Link href="/geeEmissions">
                                        <a>Emissões GEE</a>
                                    </Link>
                                </li>
                            )}
                            {userRestriction(['user', 'auditor'], token.userStatus) && (
                                <li>
                                    <Link href="/inventoryManagement">
                                        <a>Metas e Planos de Ação</a>
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href="/dataRevision">
                                    <a>Revisão de dados</a>
                                </Link>
                            </li>
                        </ul>












                    </li>
                    {userRestriction(['auditor'], token.userStatus) && (
                        <li >
                            <span className="font-weight-bold btn-toggle collapsed "
                                type='button' id='unidadeButton'
                                data-bs-toggle="collapse" data-bs-target="#unidades" aria-expanded="false" aria-controls="unidades"
                            >
                                <div className="row  align-items-center">
                                    <div className='d-flex justify-content-start '>
                                        <div className="col-1 me-2">
                                            <FontAwesomeIcon icon={faDiagramProject} className=" icon" />
                                        </div>
                                        <div className="col-9">

                                            Unidades
                                        </div>
                                        <div className="col-1 toggleIcon">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <ul className="collapse" id='unidades' aria-labelledby="unidades" data-bs-parent="#siberbarMenu">
                                {userRestriction(['user', 'auditor'], token.userStatus) && (

                                    <li>
                                        <Link href="/unityAdd">
                                            <a>Adicionar unidade</a>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link href="/unitsManagement">
                                        <a>Gestão de unidades</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    )}

                    {userRestriction(['auditor'], token.userStatus) && (

                        <li>
                            <span className="font-weight-bold btn-toggle"
                                type='button' id="usuariosItem"
                                data-bs-toggle="collapse" data-bs-target="#usuarios" aria-expanded="false" aria-controls="usuarios"
                            >
                                <div className="row  align-items-center">
                                    <div className='d-flex '>
                                        <div className="col-1 me-2">
                                            <FontAwesomeIcon icon={faUsers} className="me-2 icon" />
                                        </div>
                                        <div className="col-9">
                                            Usuários
                                        </div>
                                        <div className="col-1 toggleIcon">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </div>
                                    </div>
                                </div>
                            </span>
                            <ul className="collapse" id='usuarios' aria-labelledby="usuarios" data-bs-parent="#siberbarMenu">
                                {userRestriction(['user', 'auditor'], token.userStatus) && (
                                    <li>
                                        <Link href={freeAccountRedirect(token.dateLimit, '/userAdd')}>
                                            <a>Adicionar usuário</a>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link href="/usersManagement">
                                        <a>Gestão de usuários</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    <li>
                        <span className="font-weight-bold btn-toggle"
                            type='button' id="configuracaoItem"
                            data-bs-toggle="collapse" data-bs-target="#configuracoes" aria-expanded="false" aria-controls="configuracoes"
                        >
                            <div className="row  align-items-center">
                                <div className='d-flex'>
                                    <div className="col-1 me-2">
                                        <FontAwesomeIcon icon={faGear} className="me-2 icon" />
                                    </div>
                                    <div className="col-9">
                                        Configurações
                                    </div>
                                    <div className="col-1 toggleIcon">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </div>
                            </div>
                        </span>
                        <ul className="collapse" id='configuracoes' aria-labelledby="configuracoes" data-bs-parent="#siberbarMenu">
                            <li>
                                <Link href={`/editProfile/${token.sub}`}>
                                    <a>Editar Perfil</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/passwordChange">
                                    <a>Alterar Senha</a>
                                </Link>
                            </li>
                            {userRestriction(['user', 'auditor'], token.userStatus) && editCompanyView(token.userStatus, token.userConfig) && (
                                <li>
                                    <Link href="/companyEdit">
                                        <a>Editar Instituição</a>
                                    </Link>
                                </li>

                            )}
                        </ul>
                    </li>
                    <li>
                        <span className="font-weight-bold btn-toggle"
                            type='button' id="configuracaoItem"
                            data-bs-toggle="collapse" data-bs-target="#referencias" aria-expanded="false" aria-controls="referencias"
                        >
                            <div className="row  align-items-center">
                                <div className='d-flex'>
                                    <div className="col-1 me-2">
                                        <FontAwesomeIcon icon={faBookOpen} className="me-2 icon" />
                                    </div>
                                    <div className="col-9">
                                        Referências
                                    </div>
                                    <div className="col-1 toggleIcon">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </div>
                            </div>
                        </span>

                        <ul className="collapse" id='referencias' aria-labelledby="referencias" data-bs-parent="#siberbarMenu">
                            <li>
                                <Link href={`/manualAkvo`}>
                                    <a>Manual Akvo</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials">
                                    <a>Tutoriais</a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <div id='closeTabs' aria-labelledby="closeTabs" data-bs-parent="#closeTabs"></div>

                </ul >

            </Scrollbars >

        </aside >

    )
}