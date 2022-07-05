import { useEffect, useState } from "react"
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
import { useSelector, useDispatch } from "react-redux";

export default function FontesEstacionariasDeCombustaoTable(props) {

    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

    useEffect(() => {
        handleToolTip();
    });

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

    const handleToolTip = () => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        })
    };

    const handleEditDB = async () => {

        const isValid = validateEditDB()

        if (isValid) {

            const emissoes = calc(editCombustivelDB, editQtdDB, states.unidSetorPrimario, states.fonteEmissao, props.fatoresEmissao)

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
                    handleToolTip();
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

        if (showMore) {
            $("#inventoryTable").addClass("inventoryTable")
        } else {
            $("#inventoryTable").removeClass("inventoryTable")
        }
    }

    const renderInventoryTable = (list) => {

        let inventoryList = []
        let inventoryLength = 0

        for (let i = 0; i < list.length; i++) {

            if (list[i].fonteEmissao === "Fontes Estacionárias de Combustão" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                !showMore && inventoryList.length < 5) {
                inventoryList.push(list[i])
            } else if (list[i].fonteEmissao === "Fontes Estacionárias de Combustão" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                showMore) {
                inventoryList.push(list[i])
            }
            if (list[i].fonteEmissao === "Fontes Estacionárias de Combustão" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario) {
                inventoryLength++
            }
        }

        if (inventoryList.length > 0) {
            return (
                <div className="fadeItem">
                    <h6 className="h5_title">Últimos dados cadastrados na unidade {states.unidName} / {states.anoInventario}</h6>
                    <div className="row mb-2 me-2">
                        <div className="d-flex justify-content-end">
                            <span
                                className="badge rounded-pill bg-primary "
                                type="button"
                                onClick={() => { setShowMoreInfo(!showMoreInfo); cancelEditDB() }}>
                                {showMoreInfo ?
                                    <FontAwesomeIcon icon={faMinus} />
                                    :
                                    <FontAwesomeIcon icon={faPlus} />
                                }
                            </span>

                        </div>
                    </div>
                    <div className="table-responsive">
                        <div id="inventoryTable">
                            <small>
                                <small>
                                    <table className="table table-striped table-sm scrollBarTable scrollit">
                                        <thead>
                                            {showMoreInfo && (
                                                <tr>
                                                    <th colSpan={7}></th>
                                                    <th colSpan={3} className="text-center akvo-text-escopo1">Combustíveis fósseis</th>
                                                    <th colSpan={3} className="text-center akvo-text-escopo1">Biocombustíveis</th>
                                                    <th colSpan={4}></th>
                                                </tr>
                                            )}
                                            <tr>
                                                <th className="text-center akvo-text-escopo1" style={{ "width": "100px" }}>Código</th>
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
                                                                    placeholder="Descrição da fonte"
                                                                    value={searchDescricao}
                                                                    onChange={e => setSearchDescricao(e.target.value)} />
                                                                <span className="input-group-text" ><FontAwesomeIcon icon={faSearch} /></span>
                                                            </div>
                                                        </th>
                                                    </>
                                                    :
                                                    <>
                                                        <th className="text-center akvo-text-escopo1" style={{ "width": "100px" }}>Id</th>
                                                        <th className="text-center akvo-text-escopo1" style={{ "width": "120px" }}>Descrição da fonte</th>
                                                    </>
                                                }
                                                <th className="text-center akvo-text-escopo1">Combustível</th>
                                                <th className="text-center akvo-text-escopo1">Qtd.</th>
                                                <th className="text-center akvo-text-escopo1">Emissões fósseis<br />t CO<sub>2</sub> eq.</th>
                                                <th className="text-center akvo-text-escopo1">Emissões biogênicas<br />t CO<sub>2</sub></th>
                                                {showMoreInfo && (
                                                    <>
                                                        <th className="text-center akvo-text-escopo1">Emissões t CO<sub>2</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emissões t CH<sub>4</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emissões t N<sub>2</sub>O<br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emissões t CO<sub>2</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emissões t CH<sub>4</sub><br /></th>
                                                        <th className="text-center akvo-text-escopo1">Emissões t N<sub>2</sub>O<br /></th>
                                                        <th className="text-center akvo-text-escopo1">Usuário</th>
                                                        <th className="text-center akvo-text-escopo1">Data de cadastro/Atualização</th>
                                                    </>
                                                )}
                                                <th className="text-center akvo-text-escopo1 bg-light" style={{ "zIndex": "999" }}></th>
                                                <th className="text-center akvo-text-escopo1" style={{ "zIndex": "999" }}></th>
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


                                                                <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" id="commentModalDB" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="h5_title" id="exampleModalLabel">Editar o comentario do registro {editCodeDB} </h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditComentarioDB(elem.comentario)}></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <textarea rows="3" type="text" className="form-control"
                                                                                    value={editComentarioDB}
                                                                                    onChange={e => setEditComentarioDB(e.target.value)} />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-outline-warning" onClick={() => setEditComentarioDB('')}><FontAwesomeIcon icon={faEraser} /></button>
                                                                                <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal"><FontAwesomeIcon icon={faSave} /></button>
                                                                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => setEditComentarioDB(elem.comentario)}> <FontAwesomeIcon icon={faTimes} /> </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


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
                                                                <td style={{ "overflow": "hidden" }} className="text-center">
                                                                    {elem.comentario && (
                                                                        <span type="button" tabIndex="0" className="position-relative" data-bs-trigger="focus" title={`Comentário`} data-bs-toggle="popover" data-bs-placement="left"
                                                                            data-bs-content={elem.comentario} >
                                                                            <FontAwesomeIcon icon={faComment} />
                                                                            <span className="notificationSign fadeItem">
                                                                                <span className="visually-hidden">New alerts</span>
                                                                            </span>
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td>
                                                                    {idCompare(token.sub, elem.user_id, props.data.userConfig, token.userStatus) && (
                                                                        <div className="btn-group btn-group-sm" role="group">
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




                                                                <div className="modal fade" id="deleteModalBD" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="h5_title" id="exampleModalLabel">Excluir registro</h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                Tem certeza que deseja excluir o registro {deleteElemCodeDB}
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                                                                                <button type="buttom" className="btn btn-danger btn-sm" data-bs-dismiss="modal"
                                                                                    onClick={() => handleDeleteDB(deleteElemCodeDB)}
                                                                                >Excluir
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
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

                    </div>
                    {inventoryLength > 5 && (
                        <>
                            {showMore ?
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { handleShowMore(false) }}><FontAwesomeIcon icon={faMinus} /></button>
                                </div>
                                :
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { handleShowMore(true) }}><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                            }
                        </>
                    )}
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-end">
                                <h6><a href="#" onClick={() => acessarInventorio()}>Acessar inventório completo</a></h6>
                            </div>
                        </div>

                    </div> */}
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