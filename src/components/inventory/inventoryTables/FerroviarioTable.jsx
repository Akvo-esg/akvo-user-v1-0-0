import { useEffect, useState } from "react"
import $ from "jquery"
import { calc } from '../../../../utils/equations/transportesTipoCombustivel'
import axios from "axios"
import ConsumoMensalListEdit from "../../formComponets/ConsumoMensalListEdit"
import baseUrl from "../../../../utils/baseUrl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCancel,
    faCheck,
    faComment,
    faCommentAlt,
    faCommentDots,
    faDownload,
    faEdit,
    faEye,
    faMinus,
    faPenToSquare,
    faPlus,
    faSave,
    faSearch,
    faTimes,
    faTrash,
    faTrashAlt,
    faUpload,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

import { idCompare } from "../../../../utils/permission"
import { Scrollbars } from 'react-custom-scrollbars-2'
import FerroviarioCombList from "../combustiveis/FerroviarioCombList"
import { useDispatch, useSelector } from "react-redux"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


export default function FerroviarioTable(props) {
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

     useEffect(() => {
        handleToolTip()
    });

    //Edit Data Base Itens
    const [deleteElemCodeDB, setDeleteElemCodeDB] = useState(null)
    const [editCodeDB, setEditCodeDB] = useState(null)
    const [editIdentificadorDB, setEditIdentificadorDB] = useState('')
    const [editdescricaoFrotaDB, setEditdescricaoFrotaDB] = useState(null)
    const [editCombustivelIdDB, setEditCombustivelIdDB] = useState('')
    const [editCombustivelNameDB, setEditCombustivelNameDB] = useState('')
    const [editUnidadeDB, setEditUnidadeDB] = useState('')
    const [editPeriodoConsumoDB, setEditPeriodoConsumoDB] = useState(null)
    const [editConsumoAnualDB, setEditConsumoAnualDB] = useState(null)
    const [editConsumoJanDB, setEditConsumoJanDB] = useState(null)
    const [editConsumoFevDB, setEditConsumoFevDB] = useState(null)
    const [editConsumoMarDB, setEditConsumoMarDB] = useState(null)
    const [editConsumoAbrDB, setEditConsumoAbrDB] = useState(null)
    const [editConsumoMaiDB, setEditConsumoMaiDB] = useState(null)
    const [editConsumoJunDB, setEditConsumoJunDB] = useState(null)
    const [editConsumoJulDB, setEditConsumoJulDB] = useState(null)
    const [editConsumoAgoDB, setEditConsumoAgoDB] = useState(null)
    const [editConsumoSetDB, setEditConsumoSetDB] = useState(null)
    const [editConsumoOutDB, setEditConsumoOutDB] = useState(null)
    const [editConsumoNovDB, setEditConsumoNovDB] = useState(null)
    const [editConsumoDezDB, setEditConsumoDezDB] = useState(null)
    const [editComentarioDB, setEditComentarioDB] = useState(null)
    const [editDateAddedDB, setEditDateAddedDB] = useState(null)
    const [loadingEditDB, setLoadingEditDB] = useState(false)

    //Search Items
    const [searchIdentificador, setSearchIdentificador] = useState('')
    const [searchDescricao, setSearchDescricao] = useState('')

    //Show more items
    const [showMore, setShowMore] = useState(false)
    const [showMoreInfo, setShowMoreInfo] = useState(false)

    const multiplosValoresEditDB = (elem) => {
        const array = elem.split(",")
        setEditCombustivelIdDB(array[0])
        setEditCombustivelNameDB(array[1])
        setEditUnidadeDB(array[2])
    }

    const validateEditDB = () => {
        if (editdescricaoFrotaDB && editCombustivelIdDB && editPeriodoConsumoDB && editConsumoAnualDB > 0) {
            return true
        } else {
            return false
        }
    }

    const editDB = (elem) => {
        setEditCodeDB(elem.code)
        setEditIdentificadorDB(elem.identificador)
        setEditdescricaoFrotaDB(elem.descricaoFrota)
        setEditCombustivelIdDB(elem.combustivelId)
        setEditCombustivelNameDB(elem.combustivelName)
        setEditUnidadeDB(elem.unidade)
        setEditPeriodoConsumoDB(elem.periodoConsumo)
        setEditConsumoAnualDB(elem.consumoAnual)
        setEditConsumoJanDB(elem.consumoJan)
        setEditConsumoFevDB(elem.consumoFev)
        setEditConsumoMarDB(elem.consumoMar)
        setEditConsumoAbrDB(elem.consumoAbr)
        setEditConsumoMaiDB(elem.consumoMai)
        setEditConsumoJunDB(elem.consumoJun)
        setEditConsumoJulDB(elem.consumoJul)
        setEditConsumoAgoDB(elem.consumoAgo)
        setEditConsumoSetDB(elem.consumoSet)
        setEditConsumoOutDB(elem.consumoOut)
        setEditConsumoNovDB(elem.consumoNov)
        setEditConsumoDezDB(elem.consumoDez)
        setEditComentarioDB(elem.comentario)
        setEditDateAddedDB(elem.dateAdded)
        if (elem.periodoConsumo === "mensal") {
            setTimeout(() => {
                $('#editConsumoItemDB').prop('disabled', true)
            }, 10)
        }
        if (elem.periodoConsumo === "anual") {
            setTimeout(() => {
                $('#editConsumoItemDB').prop('disabled', false)
            }, 10)
        }

    }

    const cancelEditDB = () => {
        setTimeout(() => {
            setEditCodeDB(null)
            setEditIdentificadorDB('')
            setEditdescricaoFrotaDB(null)
            setEditCombustivelIdDB(null)
            setEditCombustivelNameDB(null)
            setEditUnidadeDB(null)
            setEditPeriodoConsumoDB(null)
            setEditConsumoAnualDB(null)
            setEditConsumoJanDB(null)
            setEditConsumoFevDB(null)
            setEditConsumoMarDB(null)
            setEditConsumoAbrDB(null)
            setEditConsumoMaiDB(null)
            setEditConsumoJunDB(null)
            setEditConsumoJulDB(null)
            setEditConsumoAgoDB(null)
            setEditConsumoSetDB(null)
            setEditConsumoOutDB(null)
            setEditConsumoNovDB(null)
            setEditConsumoDezDB(null)
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

            const emissoes = calc(editCombustivelIdDB, editConsumoAnualDB, states.fonteEmissao, fatoresEmissao, "Por tipo de combustivel")

            const data = {
                company_id: token.company_id,
                unid_id: states.unid_id,
                unidSetorPrimario: states.unidSetorPrimario,
                unidName: states.unidName,
                anoInventario: states.anoInventario,
                escopo: states.escopo,
                fonteEmissao: states.fonteEmissao,
                tipoEmissao: states.tipoEmissao,
                tipoCalculo: "Por tipo de combustivel",
                code: editCodeDB,
                identificador: editIdentificadorDB,
                descricaoFrota: editdescricaoFrotaDB,
                combustivelId: editCombustivelIdDB,
                combustivelName: editCombustivelNameDB,
                unidade: editUnidadeDB,
                periodoConsumo: editPeriodoConsumoDB,
                consumoAnual: editConsumoAnualDB,
                consumoJan: editConsumoJanDB,
                consumoFev: editConsumoFevDB,
                consumoMar: editConsumoMarDB,
                consumoAbr: editConsumoAbrDB,
                consumoMai: editConsumoMaiDB,
                consumoJun: editConsumoJunDB,
                consumoJul: editConsumoJulDB,
                consumoAgo: editConsumoAgoDB,
                consumoSet: editConsumoSetDB,
                consumoOut: editConsumoOutDB,
                consumoNov: editConsumoNovDB,
                consumoDez: editConsumoDezDB,
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
                    setEditIdentificadorDB('')
                    setEditdescricaoFrotaDB(null)
                    setEditConsumoAnualDB(null)
                    setEditComentarioDB(null)
                    handleToolTip()
                })

        } else {
            return
        }
    }

    const handleDeleteDB = async (code) => {

        const data = {
            company_id: token.company_id,
            code: code
        }

        await axios.post(`${baseUrl()}/api/editInventory/${token.company_id}`, data)
            .then(res => { props.updateList() })
    }

    const renderInventoryTable = (list) => {

        let inventoryList = []
        let inventoryLength = 0

        for (let i = 0; i < list.length; i++) {
            if (list[i].fonteEmissao === "Transportes" &&
                list[i].tipoEmissao === "Transporte Ferroviário" &&
                list[i].tipoCalculo === "Por tipo de combustivel" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                !showMore && inventoryList.length < 5) {
                inventoryList.push(list[i])
            } else if (list[i].fonteEmissao === "Transportes" &&
                list[i].tipoEmissao === "Transporte Ferroviário" &&
                list[i].tipoCalculo === "Por tipo de combustivel" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                showMore) {
                inventoryList.push(list[i])
            }
            if (list[i].fonteEmissao === "Transportes" &&
                list[i].tipoEmissao === "Transporte Ferroviário" &&
                list[i].tipoCalculo === "Por tipo de combustivel" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario) {
                inventoryLength++
            }
        }

        if (inventoryList.length > 0) {
            return (

                <div className="mt-5 fadeItem">
                    <h6 className="h5_title">Últimos dados cadastrados em {states.unidName} / {states.anoInventario}</h6>

                    <div className="table-responsive">
                        <small>

                            <table className="table table-striped table-sm ">
                                <thead>
                                    <tr>
                                        <th className="text-center akvo-text-escopo1">Código</th>
                                        {showMore && !editCodeDB ?
                                            <>
                                                <th>
                                                    <div className="input-group input-group-sm">
                                                        <input type="text" className="form-control form-control-sm"
                                                            placeholder="Identificador"
                                                            value={searchIdentificador}
                                                            onChange={e => setSearchIdentificador(e.target.value)} />
                                                        <span className="input-group-text" ><FontAwesomeIcon icon={faSearch} /></span>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="input-group input-group-sm">
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
                                                <th className="text-center akvo-text-escopo1">Identificador</th>
                                                <th className="text-center akvo-text-escopo1">Descrição da fonte</th>
                                            </>
                                        }
                                        <th className="text-center akvo-text-escopo1">Tipo de combustível</th>
                                        <th className="text-center akvo-text-escopo1">Periodo de consumo</th>
                                        <th className="text-center akvo-text-escopo1 fadeItem">Consumo anual</th>
                                        <th className="text-center akvo-text-escopo1">Emissões fósseis totais<br />t CO<sub>2</sub> eq.</th>
                                        <th className="text-center akvo-text-escopo1">Emissões biogênicas<br />t CO<sub>2</sub></th>
                                        {showMoreInfo && (
                                            <>
                                                <th className="text-center akvo-text-escopo1">Emissões t CO<sub>2</sub><br />(Combustíveis fóssies)</th>
                                                <th className="text-center akvo-text-escopo1">Emissões t CH<sub>4</sub><br />(Combustíveis fóssies)</th>
                                                <th className="text-center akvo-text-escopo1">Emissões t N<sub>2</sub>O<br />(Combustíveis fóssies)</th>
                                                <th className="text-center akvo-text-escopo1">Emissões t CO<sub>2</sub><br />(Biocombustíveis)</th>
                                                <th className="text-center akvo-text-escopo1">Emissões t CH<sub>4</sub><br />(Biocombustíveis)</th>
                                                <th className="text-center akvo-text-escopo1">Emissões t N<sub>2</sub>O<br />(Biocombustíveis)</th>
                                                <th className="text-center akvo-text-escopo1">Usuário</th>
                                                <th className="text-center akvo-text-escopo1">Data de cadastro/Atualização</th>
                                            </>
                                        )}
                                        <th className="text-center akvo-text-escopo1"></th>
                                        <th className="text-center akvo-text-escopo1">
                                            <span
                                                className="badge rounded-pill bg-primary"
                                                type="button"
                                                onClick={() => { setShowMoreInfo(!showMoreInfo); cancelEditDB() }}>
                                                {showMoreInfo ?
                                                    <FontAwesomeIcon icon={faMinus} />
                                                    :
                                                    <FontAwesomeIcon icon={faPlus} />
                                                }
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryList.filter(val => {
                                        if (searchIdentificador == '') {
                                            return val
                                        } else if (val.identificador.toLowerCase().includes(searchIdentificador.toLocaleLowerCase())) {
                                            // console.log(val)
                                            return val
                                        }
                                    }).filter(val => {
                                        if (searchDescricao == '') {
                                            return val
                                        } else if (val.descricaoFrota.toLowerCase().includes(searchDescricao.toLocaleLowerCase())) {
                                            return val
                                        }
                                    }).map((elem, index) => {
                                        return (
                                            <>
                                                {editCodeDB === elem.code ?
                                                    <>
                                                        <tr className="fadeItem" key={`edit${index}`}>
                                                            <td scopo="row">
                                                                <small>{elem.code}</small>
                                                            </td>
                                                            <td>
                                                                <input className="form-control form-control-sm" type="text" value={editIdentificadorDB} onChange={e => setEditIdentificadorDB(e.target.value)} />
                                                            </td>
                                                            <td scopo="row">
                                                                <input className="form-control form-control-sm" type="text" value={editdescricaoFrotaDB} onChange={e => setEditdescricaoFrotaDB(e.target.value)} />
                                                            </td>
                                                            <td scopo="row">
                                                                <select className="form-select form-select-sm"
                                                                    value={`${editCombustivelIdDB},${editCombustivelNameDB},${editUnidadeDB}`}
                                                                    onChange={e => {
                                                                        multiplosValoresEditDB(e.target.value)
                                                                    }}>
                                                                    <FerroviarioCombList />
                                                                </select>
                                                            </td>
                                                            <td scopo="row">
                                                                {editPeriodoConsumoDB.charAt(0).toUpperCase() + editPeriodoConsumoDB.slice(1)}
                                                            </td>
                                                            <td>
                                                                <div className="input-group input-group-sm" >
                                                                    <input className="form-control form-control-sm" id="editConsumoItemDB"
                                                                        type="number" disabled
                                                                        value={editConsumoAnualDB}
                                                                        placeholder="0"
                                                                        onChange={e => setEditConsumoAnualDB(e.target.value)} />
                                                                    <span className="input-group-text">{editUnidadeDB}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                -
                                                            </td>
                                                            <td>
                                                                -
                                                            </td>
                                                            {showMoreInfo && (
                                                                <>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                    <td>
                                                                        -
                                                                    </td>
                                                                </>
                                                            )}
                                                            <td>
                                                                <span type="button" className="me-1 position-relative"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#commentModalDB"                                                                >
                                                                    <FontAwesomeIcon icon={faComment} />
                                                                    {editComentarioDB && (
                                                                        <span className="notificationSign fadeItem">
                                                                            <span className="visually-hidden">New alerts</span>
                                                                        </span>
                                                                    )}

                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="btn-group btn-group-sm fadeItem" role="group">
                                                                    {!loadingEditDB ?
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
                                                                        :
                                                                        <button type="button" disabled="true"
                                                                            className="btn btn-outline-success">
                                                                            <div className="spinner-border spinner-border-sm text-success" role="status">
                                                                                <span className="sr-only">Loading...</span>
                                                                            </div>
                                                                        </button>
                                                                    }
                                                                    <button type="button"
                                                                        className="btn btn-outline-danger"
                                                                        data-toggle-tooltip="true" data-placement="bottom" title="Cancelar"
                                                                        onClick={() => cancelEditDB()}>
                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                    </button>

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
                                                                            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal"><FontAwesomeIcon icon={faSave} /></button>
                                                                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => setEditComentarioDB(elem.comentario)}> <FontAwesomeIcon icon={faTimes} /> </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </tr>
                                                        {editPeriodoConsumoDB === "mensal" && (
                                                            <tr className="fadeItem">
                                                                <td colSpan="7">
                                                                    <ConsumoMensalListEdit onChange={(
                                                                        consumoJan,
                                                                        consumoFev,
                                                                        consumoMar,
                                                                        consumoAbr,
                                                                        consumoMai,
                                                                        consumoJun,
                                                                        consumoJul,
                                                                        consumoAgo,
                                                                        consumoSet,
                                                                        consumoOut,
                                                                        consumoNov,
                                                                        consumoDez,
                                                                        soma) => {
                                                                        setEditConsumoJanDB(consumoJan)
                                                                        setEditConsumoFevDB(consumoFev)
                                                                        setEditConsumoMarDB(consumoMar)
                                                                        setEditConsumoAbrDB(consumoAbr)
                                                                        setEditConsumoMaiDB(consumoMai)
                                                                        setEditConsumoJunDB(consumoJun)
                                                                        setEditConsumoJulDB(consumoJul)
                                                                        setEditConsumoAgoDB(consumoAgo)
                                                                        setEditConsumoSetDB(consumoSet)
                                                                        setEditConsumoOutDB(consumoOut)
                                                                        setEditConsumoNovDB(consumoNov)
                                                                        setEditConsumoDezDB(consumoDez)
                                                                        setEditConsumoAnualDB(soma)
                                                                    }}
                                                                        data={
                                                                            {
                                                                                editConsumoJan: editConsumoJanDB,
                                                                                editConsumoFev: editConsumoFevDB,
                                                                                editConsumoMar: editConsumoMarDB,
                                                                                editConsumoAbr: editConsumoAbrDB,
                                                                                editConsumoMai: editConsumoMaiDB,
                                                                                editConsumoJun: editConsumoJunDB,
                                                                                editConsumoJul: editConsumoJulDB,
                                                                                editConsumoAgo: editConsumoAgoDB,
                                                                                editConsumoSet: editConsumoSetDB,
                                                                                editConsumoOut: editConsumoOutDB,
                                                                                editConsumoNov: editConsumoNovDB,
                                                                                editConsumoDez: editConsumoDezDB,
                                                                                editConsumoAnual: editConsumoAnualDB
                                                                            }
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </>
                                                    :
                                                    <tr className="fadeItem">
                                                        <td>
                                                            <small>{elem.code}</small>
                                                        </td>
                                                        <td>
                                                            {elem.identificador}
                                                        </td>
                                                        <td>
                                                            {elem.descricaoFrota}
                                                        </td>
                                                        <td>
                                                            {elem.combustivelName}
                                                        </td>
                                                        <td>
                                                            {elem.periodoConsumo.charAt(0).toUpperCase() + elem.periodoConsumo.slice(1)}
                                                        </td>
                                                        <td>
                                                            {elem.consumoAnual} {elem.unidade}
                                                        </td>
                                                        <td>
                                                            {elem.emissoesTotais.toFixed(2)}
                                                        </td>
                                                        <td>
                                                            {elem.emissoesBiogenicas.toFixed(2)}
                                                        </td>
                                                        {showMoreInfo && (
                                                            <>
                                                                <td>
                                                                    {elem.emissoesCO2_F.toFixed(4)}
                                                                </td>
                                                                <td>
                                                                    {elem.emissoesCH4_F.toFixed(4)}
                                                                </td>
                                                                <td>
                                                                    {elem.emissoesN2O_F.toFixed(4)}
                                                                </td>
                                                                <td>
                                                                    {elem.emissoesCO2_B.toFixed(4)}
                                                                </td>
                                                                <td>
                                                                    {elem.emissoesCH4_B.toFixed(4)}
                                                                </td>
                                                                <td>
                                                                    {elem.emissoesN2O_B.toFixed(4)}
                                                                </td>
                                                                <td>
                                                                    {elem.userName}
                                                                </td>
                                                                <td>
                                                                    {elem.dateUpdated ? ` ${new Date(elem.dateUpdated).getDate()}/${new Date(elem.dateUpdated).getMonth()}/${new Date(elem.dateUpdated).getFullYear()}` : `${new Date(elem.dateAdded).getDate()}/${new Date(elem.dateAdded).getMonth()}/${new Date(elem.dateAdded).getFullYear()}`}
                                                                </td>
                                                            </>
                                                        )}
                                                        <td>
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
                                                                <div className="btn-group btn-group-sm" role="group" disabled={ idCompare(token.sub, elem.user_id, props.data.userConfig, token.userStatus)}>
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
                    </div>
                    {inventoryLength > 5 && (
                        <>
                            {showMore ?
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { setShowMore(false); setSearchDescricao(''); setSearchIdentificador('') }}><FontAwesomeIcon icon={faMinus} /></button>
                                </div>
                                :
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { setShowMore(true) }}><FontAwesomeIcon icon={faPlus} /></button>
                                </div>
                            }
                        </>
                    )}

                </div>
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