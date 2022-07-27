import { useState, useEffect, useContext } from 'react'
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
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AccordionContext } from "react-bootstrap"

export default function Nav({ children }) {

    $(document).ready(function () {
        $('.collapse').collapse
    });

    const list = useSelector(state => state.inventoryList)
    const token = jwt.decode(Cookie.get('auth'))

    const [companyLogo, setCompanyLogo] = useState('')
    const [activeId, setActiveId] = useState('0')

    const [gestao, setGestao] = useState(false)
    const [unidades, setUnidades] = useState(false)
    const [usuarios, setUsuarios] = useState(false)
    const [config, setConfig] = useState(false)
    const [ref, setRef] = useState(false)

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


    // function CustomToggle({ children, eventKey, collapse }) {
    //     const decoratedOnClick = useAccordionButton(eventKey, () => {
    //         const elem = document.getElementById(collapse)
    //         const ariaExpanded = elem.getAttribute('aria-expanded')
    //         console.log(collapse, ariaExpanded)
    //         if (ariaExpanded = "true") {
    //             elem.setAttribute("aria-expanded", "true")
    //         } else {
    //             elem.setAttribute("aria-expanded", "false")
    //         }

    //     }
    //     );

    //     return (

    //         <div onClick={decoratedOnClick}>
    //             {children}
    //         </div>
    //     );
    // }


    function ContextAwareToggle({ children, eventKey, callback, }) {
        const { activeEventKey } = useContext(AccordionContext);

        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );

        const isCurrentEventKey = activeEventKey === eventKey;

        return (

            <span
                className="font-weight-bold btn-toggle"
                type='button' onClick={decoratedOnClick}
                collapsed={isCurrentEventKey ? "true" : "false"}
            >
                <div className="row align-items-center">
                    {children}
                </div>
            </span >
        );
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

                <ul>

                    <Accordion defaultActiveKey="0">
                        <li>
                            <ContextAwareToggle eventKey="0" collapse="InicioItem">
                                <Link href="/">

                                    <div className='d-flex justify-content-start '>
                                        <div className="col-1 me-2">
                                            <FontAwesomeIcon icon={faHome} className="me-2 icon" />
                                        </div>
                                        <div className="col-9">
                                            Início
                                        </div>
                                    </div>
                                </Link>
                            </ContextAwareToggle>
                        </li>
                        {userRestriction(['auditor'], token.userStatus) && (
                            <li>
                                <ContextAwareToggle eventKey="1" collapse="inventarioItem">
                                    <Link href="/inventory">

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
                                    </Link>
                                </ContextAwareToggle>
                            </li>
                        )}



                        <li>
                            <ContextAwareToggle eventKey="2">
                                <div className='d-flex justify-content-start '>
                                    <div className="col-1 me-2">
                                        <FontAwesomeIcon icon={faChartLine} className="icon" />
                                    </div>
                                    <div className="col-9">
                                        Gestão de Emissões
                                    </div>
                                    <div className="col-1 toggleIcon">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </div>
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="2">
                                <ul>
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
                            </Accordion.Collapse>
                        </li>




                        {userRestriction(['auditor'], token.userStatus) && (

                            <li>
                                <ContextAwareToggle eventKey="3">
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
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="3">
                                    <ul >
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
                                </Accordion.Collapse>
                            </li>
                        )}





                        {userRestriction(['auditor'], token.userStatus) && (
                            <li>
                                <ContextAwareToggle eventKey="4">

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
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="4">
                                    <ul>
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
                                </Accordion.Collapse>
                            </li>
                        )}







                        <li>
                            <ContextAwareToggle eventKey="5" collapse="configuracoesCollapse">

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
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="5">
                                <ul>
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
                            </Accordion.Collapse>
                        </li>









                        <li>
                            <ContextAwareToggle eventKey="6" collapse="referenciasCollpase">

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
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="6">
                                <ul >
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
                            </Accordion.Collapse>
                        </li>








                    </Accordion>
                </ul>




            </Scrollbars >

        </aside >

    )
}