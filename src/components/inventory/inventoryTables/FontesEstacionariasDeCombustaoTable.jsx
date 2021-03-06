import { useEffect, useRef, useState } from "react"
import $ from "jquery"
import { calc } from '../../../../utils/equations/fontesEstacionariasDeCombustao'
import axios from "axios"
import CombustiveisList from "../combustiveis/CombustiveisFontesEstacionarias"
import baseUrl from "../../../../utils/baseUrl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEraser,
    faCheck,
    faComment,
    faEdit,
    faMinus,
    faPlus,
    faSave,
    faSearch,
    faTimes,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { idCompare } from "../../../../utils/permission"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useSelector } from "react-redux";
import Comentarios from '../../formComponets/Comentarios';
import ShowMoreButtons from "../../formComponets/ShowMoreButtons"
import ModalDeleteItem from "../../formComponets/ModalDeleteItem"
import ModalCommentItem from "../../formComponets/ModalCommentItem"


export default function FontesEstacionariasDeCombustaoTable(props) {
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))
    
    //Edit Data Base Itens
    const [deleteElemCodeDB, setDeleteElemCodeDB] = useState(null)
    const [editCodeDB, setEditCodeDB] = useState(null)
    const [editIdentificadorDB, setEditIdentificadorDB] = useState(null)
    const [editDescricaoFonteDB, setEditDescricaoFonteDB] = useState(null)
    const [editCombustivelDB, setEditCombustivelDB] = useState(null)
    const [editCombustivelNameDB, setEditCombustivelNameDB] = useState(null)
    const [editQtdDB, setEditQtdDB] = useState(null)
    const [editUnidadeDB, setEditUnidadeDB] = useState(null)
    const [editComentarioDB, setEditComentarioDB] = useState(null)
    const [loadingEditDB, setLoadingEditDB] = useState(false)
    const [editDateAddedDB, setEditDateAddedDB] = useState('')

    //Search Items
    const [searchIdentificador, setSearchIdentificador] = useState('')
    const [searchDescricao, setSearchDescricao] = useState('')

    //Show more items
    const [showMore, setShowMore] = useState(false)
    const [showMoreInfo, setShowMoreInfo] = useState(false)


    const editDB = (elem) => {
        setShowMoreInfo(false)
        setEditCodeDB(elem.code)
        setEditIdentificadorDB(elem.identificador)
        setEditDescricaoFonteDB(elem.descricaoFonte)
        setEditCombustivelDB(elem.combustivel)
        setEditCombustivelNameDB(elem.combustivelName)
        setEditQtdDB(elem.qtd)
        setEditUnidadeDB(elem.unidade)
        setEditComentarioDB(elem.comentario)
        setEditDateAddedDB(elem.dateAdded)
    }

    const cancelEditDB = () => {
        setTimeout(() => {
            setEditCodeDB(null)
            setEditIdentificadorDB('')
            setEditDescricaoFonteDB(null)
            setEditCombustivelDB(null)
            setEditCombustivelNameDB(null)
            setEditQtdDB(null)
            setEditUnidadeDB(null)
            setEditComentarioDB(null)
        }, 10)
    }

    const handleEditDB = async () => {

        const isValid = validateEditDB()

        if (isValid) {

            const emissoes = calc(editCombustivelDB, editQtdDB, states.unidSetorPrimario, states.fonteEmissao, fatoresEmissao)

            const data = {
                company_id: token.company_id,
                unid_id: states.unid_id,
                unidSetorPrimario: states.setorPrimario,
                unidName: states.unidName,
                anoInventario: states.anoInventario,
                escopo: states.escopo,
                fonteEmissao: states.fonteEmissao,
                code: editCodeDB,
                identificador: editIdentificadorDB,
                descricaoFonte: editDescricaoFonteDB,
                unidade: editUnidadeDB,
                combustivel: editCombustivelDB,
                combustivelName: editCombustivelNameDB,
                qtd: editQtdDB,
                comentario: editComentarioDB,
                emissoesCO2_F: emissoes.emissoesCO2_F,
                emissoesCH4_F: emissoes.emissoesCH4_F,
                emissoesN2O_F: emissoes.emissoesN2O_F,
                emissoesCO2_B: emissoes.emissoesCO2_B,
                emissoesCH4_B: emissoes.emissoesCH4_B,
                emissoesN2O_B: emissoes.emissoesN2O_B,
                emissoesTotais: emissoes.emissoesTotais,
                emissoesBiogenicas: emissoes.emissoesBiogenicas,
                userName: `${token.firstName} ${token.lastName}`,
                user_id: token.sub,
                dateAdded: editDateAddedDB,
                dateUpdated: new Date()
            }

            await axios.patch(`${baseUrl()}/api/editInventory/${token.company_id}`, data)
                .then(setLoadingEditDB(true))
                .then(res => {
                    setLoadingEditDB(false)
                    props.updateList()
                    setEditCodeDB(null)
                    setEditIdentificadorDB(null)
                    setEditDescricaoFonteDB(null)
                    setEditCombustivelDB(null)
                    setEditCombustivelNameDB(null)
                    setEditQtdDB(null)
                    setEditUnidadeDB(null)
                    setEditComentarioDB(null)
                });

        } else {
            return
        }
    }

    const validateEditDB = () => {
        if (editDescricaoFonteDB && editQtdDB > 0) {
            return true
        } else {
            return false
        }
    }

    const multiplosValoresEditDB = (elem) => {
        const array = elem.split(",")
        setEditCombustivelDB(array[0])
        setEditUnidadeDB(array[1])
        setEditCombustivelNameDB(array[2])
    }

    const handleDeleteDB = async (code) => {

        const data = {
            company_id: token.company_id,
            code: code
        }

        await axios.post(`${baseUrl()}/api/editInventory`, data)
            .then(res => { props.updateList() })
    }

    const handleShowMore = (showMore) => {

        setShowMore(showMore)
        setSearchIdentificador('')
        setSearchDescricao('')
        cancelEditDB()

        // if (showMore) {
        //     $("#inventoryTable").addClass("inventoryTable")
        // } else {
        //     $("#inventoryTable").removeClass("inventoryTable")
        // }
    }

    const fixBugClass = !showMore &&  showMoreInfo;

    const renderInventoryTable = (list) => {

        let inventoryList = []
        let inventoryLength = 0

        for (let i = 0; i < list.length; i++) {

            if (list[i].fonteEmissao === "Fontes Estacion??rias de Combust??o" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                !showMore && inventoryList.length < 5) {
                inventoryList.push(list[i])
            } else if (list[i].fonteEmissao === "Fontes Estacion??rias de Combust??o" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                showMore) {
                inventoryList.push(list[i])
            }
            if (list[i].fonteEmissao === "Fontes Estacion??rias de Combust??o" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario) {
                inventoryLength++
            }
        }

        if (inventoryList.length > 0) {
            return (
                <div className="fadeItem">
                    < ShowMoreButtons unidName={states.unidName} anoInventario={states.anoInventario} showMoreInfo={showMoreInfo}
                     handleClick={ () => { setShowMoreInfo(!showMoreInfo); cancelEditDB() }} />
                    <div className={`table-responsive ${showMore ? 'inventoryTable' : ''} ${fixBugClass ? 'showMore' : '' }`} >
                            <small>
                                <small>
                                    <table className="table table-striped table-sm scrollBarTable scrollit">
                                        <thead>
                                            {showMoreInfo && (
                                                <tr>
                                                    <th colSpan={7}></th>
                                                    <th colSpan={3} className="text-center akvo-text-escopo1">Combust??veis f??sseis</th>
                                                    <th colSpan={3} className="text-center akvo-text-escopo1">Biocombust??veis</th>
                                                    <th colSpan={4}></th>
                                                </tr>
                                            )}
                                            <tr>
                                                <th className="text-center akvo-text-escopo1" style={{ "width": "100px" }}>C??digo</th>
                                                {showMore && !editCodeDB ?
                                                    <>
                                                        <th>
                                                            <div className="input-group input-group-sm" style={{ "width": "100px" }}>
                                                                <input type="text" className="form-control form-control-sm"
                                                                    placeholder="Id"
                                                                    value={searchIdentificador}
                                                                    onChange={e => setSearchIdentificador(e.target.value)} />
                                                                <span className="input-group-text" ><FontAwesomeIcon icon={faSearch} /></span>
                                                            </div>

                                                        </th>
                                                        <th>
                                                            <div className="input-group input-group-sm" style={{ "width": "120px" }}>
                                                                <input type="text" className="form-control form-control-sm"
                                                                    placeholder="Descri????o da fonte"
                                                                    value={searchDescricao}
                                                                    onChange={e => setSearchDescricao(e.target.value)} />
                                                                <span className="input-group-text" ><FontAwesomeIcon icon={faSearch} /></span>
                                                            </div>
                                                        </th>
                                                    </>
                                                    :
                                                    <>
                                                        <th className="text-center akvo-text-escopo1" style={{ "width": "100px" }}>Id</th>
                                                        <th className="text-center akvo-text-escopo1" style={{ "width": "120px" }}>Descri????o da fonte</th>
                                                    </>
                                                }
                                                <th className="text-center akvo-text-escopo1">Combust??vel</th>
                                                <th className="text-center akvo-text-escopo1">Qtd.</th>
                                                <th className="text-center akvo-text-escopo1">Emiss??es f??sseis<br />t CO<sub>2</sub> eq.</th>
                                                <th className="text-center akvo-text-escopo1">Emiss??es biog??nicas<br />t CO<sub>2</sub></th>
                                                {showMoreInfo && (
                                                    <>
                                                        <th className="text-center akvo-text-escopo1">Emiss??es t CO<sub>2</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emiss??es t CH<sub>4</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emiss??es t N<sub>2</sub>O<br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emiss??es t CO<sub>2</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emiss??es t CH<sub>4</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emiss??es t N<sub>2</sub>O<br /></th>
                                                        <th className="text-center akvo-text-escopo1">Usu??rio</th>
                                                        <th className="text-center akvo-text-escopo1">Data de cadastro/Atualiza????o</th>
                                                    </>
                                                )}
                                                <th className="text-center akvo-text-escopo1"></th>
                                                <th className="text-center akvo-text-escopo1"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryList.filter(val => {
                                                if (searchIdentificador == '') {
                                                    return val
                                                } else if (val.identificador.toLowerCase().includes(searchIdentificador.toLocaleLowerCase())) {
                                                    return val
                                                }
                                            }).filter(val => {
                                                if (searchDescricao == '') {
                                                    return val
                                                } else if (val.descricaoFonte.toLowerCase().includes(searchDescricao.toLocaleLowerCase())) {
                                                    return val
                                                }
                                            }).map((elem, index) => {
                                                return (
                                                    <>
                                                        {editCodeDB === elem.code ?

                                                            <tr className="fadeItem" key={`edit${index}`}>
                                                                <td className="text-center">
                                                                    <small>{editCodeDB}</small>
                                                                </td>
                                                                <td className="text-center">
                                                                    <input className="form-control form-control-sm" type="text" value={editIdentificadorDB} onChange={e => setEditIdentificadorDB(e.target.value)} />
                                                                </td>
                                                                <td className="text-center">
                                                                    <input className="form-control form-control-sm" type="text" value={editDescricaoFonteDB} onChange={e => setEditDescricaoFonteDB(e.target.value)} />
                                                                </td>
                                                                <td className="text-center">
                                                                    <select className="form-select form-select-sm"
                                                                        value={`${editCombustivelDB},${editUnidadeDB},${editCombustivelNameDB}`}
                                                                        onChange={e => {
                                                                            multiplosValoresEditDB(e.target.value)
                                                                        }}>
                                                                        <CombustiveisList />
                                                                    </select>
                                                                </td>
                                                                <td className="text-center">
                                                                    <div className="input-group input-group-sm">
                                                                        <input className="form-control form-control-sm"
                                                                            type="number"
                                                                            value={editQtdDB}
                                                                            placeholder="0"
                                                                            onChange={e => setEditQtdDB(e.target.value)} />
                                                                        <span className="input-group-text">{editUnidadeDB}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    -
                                                                </td>
                                                                <td className="text-center">
                                                                    -
                                                                </td>
                                                                {showMoreInfo && (
                                                                    <>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                        <td className="text-center">
                                                                            -
                                                                        </td>
                                                                    </>
                                                                )}
                                                                <td>
                                                                    <button type="button" className="me-1 position-relative btn btn-sm btn-outline-secondary"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#commentModalDB"                                                                >
                                                                        <FontAwesomeIcon icon={faComment} />
                                                                        {editComentarioDB && (
                                                                            <span className="notificationSign fadeItem">
                                                                                <span className="visually-hidden">New alerts</span>
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <div className="btn-group btn-group-sm fadeItem" role="group">
                                                                        {!loadingEditDB ?
                                                                            <>
                                                                                <button type="button"
                                                                                    className="btn btn-outline-success"
                                                                                    data-toggle-tooltip="true" data-placement="bottom" title="Confirmar"
                                                                                    onClick={() => {
                                                                                        setTimeout(() => {
                                                                                            handleEditDB(editCodeDB)
                                                                                        }, 10)
                                                                                    }}>
                                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                                </button>
                                                                                <button type="button"
                                                                                    className="btn btn-outline-danger"
                                                                                    data-toggle-tooltip="true" data-placement="bottom" title="Cancelar"
                                                                                    onClick={() => cancelEditDB()}>
                                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                                </button>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <button type="button" disabled="true"
                                                                                    className="btn btn-outline-success">
                                                                                    <div className="spinner-border spinner-border-sm text-success" role="status">
                                                                                        <span className="sr-only">Loading...</span>
                                                                                    </div>
                                                                                </button>
                                                                                <button type="button" disabled
                                                                                    className="btn btn-outline-danger"
                                                                                    data-toggle-tooltip="true" data-placement="bottom" title="Cancelar"
                                                                                    onClick={() => cancelEditDB()}>
                                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                                </button>
                                                                            </>
                                                                        }

                                                                    </div>
                                                                </td>

                                                                <ModalCommentItem editComentarioDB={editComentarioDB} editCodeDB={editCodeDB} handleChange={(e) => setEditComentarioDB(e.target.value)} elemComentario={elem.comentario} setEditComentarioDB={setEditComentarioDB} />
                                                            </tr>
                                                            :
                                                            <tr className="fadeItem" key={`view${index}`}>
                                                                <td className="text-center ">
                                                                    <small>{elem.code}</small>
                                                                </td>
                                                                <td className="text-center ">
                                                                    {elem.identificador}
                                                                </td>
                                                                <td className="text-center ">
                                                                    {elem.descricaoFonte}
                                                                </td>
                                                                <td className="text-center ">
                                                                    {elem.combustivelName}
                                                                </td>
                                                                <td className="text-center ">
                                                                    {elem.qtd} {elem.unidade}
                                                                </td>
                                                                <td className="text-center ">
                                                                    {elem.emissoesTotais.toFixed(2)}
                                                                </td>
                                                                <td className="text-center ">
                                                                    {elem.emissoesBiogenicas.toFixed(2)}
                                                                </td>
                                                                {showMoreInfo && (
                                                                    <>
                                                                        <td className="text-center ">
                                                                            {elem.emissoesCO2_F.toFixed(4)}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.emissoesCH4_F.toFixed(4)}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.emissoesN2O_F.toFixed(4)}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.emissoesCO2_B.toFixed(4)}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.emissoesCH4_B.toFixed(4)}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.emissoesN2O_B.toFixed(4)}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.userName}
                                                                        </td>
                                                                        <td className="text-center ">
                                                                            {elem.dateUpdated ? ` ${new Date(elem.dateUpdated).getDate()}/${new Date(elem.dateUpdated).getMonth()}/${new Date(elem.dateUpdated).getFullYear()}` : `${new Date(elem.dateAdded).getDate()}/${new Date(elem.dateAdded).getMonth()}/${new Date(elem.dateAdded).getFullYear()}`}
                                                                        </td>
                                                                    </>
                                                                )}
                                                                <td style={{ "overflow": "hidden" }} className={`text-center`}>
                                                                    {elem.comentario && (
                                                                        <Comentarios comentario={elem.comentario}/>
                                                                    )}
                                                                </td>

                                                                <td>
                                                                    {idCompare(token.sub, elem.user_id, token.userConfig, token.userStatus) && (
                                                                        <div className="btn-group btn-group-sm" role="group" disabled={idCompare(token.sub, elem.user_id, token.userConfig, token.userStatus) }> 
                                                                            <span type="button" className="mx-2"
                                                                                data-bs-toggle-tooltip="true" data-bs-placement="bottom" title="Editar"
                                                                                onClick={() => editDB(elem)}>
                                                                                <FontAwesomeIcon icon={faEdit} />
                                                                            </span>
                                                                            <span type="button" className="mx-2"
                                                                                data-bs-toggle="modal" data-bs-toggle-tooltip="true" data-bs-target="#deleteModalBD"
                                                                                data-bs-placement="bottom" title="Excluir"
                                                                                onClick={() => setDeleteElemCodeDB(elem.code)}>
                                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </td>

                                                                <ModalDeleteItem deleteElemCodeDB={deleteElemCodeDB} handleClick={ () => handleDeleteDB(deleteElemCodeDB)} />
                                                            </tr>
                                                        }
                                                    </>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </small>
                            </small>

                    </div>
                    {inventoryLength > 5 && (
                        <>
                            {showMore ?
                                <div className="d-flex justify-content-center showLessBtn">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { handleShowMore(false) }}><FontAwesomeIcon icon={faMinus} /></button>
                                </div>
                                :
                                <div className="d-flex justify-content-center showMoreBtn">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { handleShowMore(true) }}><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                            }
                        </>
                    )}
                </div >
            )
        } else {
            return
        }
    }

    return (
        <>
            {renderInventoryTable(inventory)}
        </>
    )
}