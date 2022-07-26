import { useEffect, useState } from "react"
import $ from "jquery"
import { calc } from '../../../../utils/equations/transportesTipoFrota'
import axios from "axios"
import FrotaList from "../../formComponets/FrotaList"
import AnoOptions from "../../formComponets/AnoOptions"
import ConsumoMensalListEdit from "../../formComponets/ConsumoMensalListEdit"
import baseUrl from "../../../../utils/baseUrl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCancel,
    faEraser,
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
import { useDispatch, useSelector } from "react-redux"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import Comentarios from "../../formComponets/Comentarios"
import ShowMoreButtons from "../../formComponets/ShowMoreButtons"
import ModalDeleteItem from "../../formComponets/ModalDeleteItem"
import ModalCommentItem from "../../formComponets/ModalCommentItem"

export default function RodoviarioPorTipoTable(props) {
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

    //Edit Data Base Itens
    const [deleteElemCodeDB, setDeleteElemCodeDB] = useState(null)
    const [editCodeDB, setEditCodeDB] = useState(null)
    const [editIdentificadorDB, setEditIdentificadorDB] = useState(null)
    const [editdescricaoFrotaDB, setEditdescricaoFrotaDB] = useState(null)
    const [editTipoFrotaIdDB, setEditTipoFrotaIdDB] = useState('')
    const [editTipoFrotaNameDB, setEditTipoFrotaNameDB] = useState('')
    const [editUnidadeDB, setEditUnidadeDB] = useState('')
    const [editAnoFrotaDB, setEditAnoFrotaDB] = useState(null)
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
        setEditTipoFrotaIdDB(array[0])
        setEditTipoFrotaNameDB(array[1])
        setEditUnidadeDB(array[2])
    }

    const validateEditDB = () => {
        if (editdescricaoFrotaDB && editTipoFrotaIdDB && editAnoFrotaDB && editPeriodoConsumoDB && editConsumoAnualDB > 0) {
            return true
        } else {
            return false
        }
    }

    const editDB = (elem) => {
        setShowMoreInfo(false)
        setEditCodeDB(elem.code)
        setEditIdentificadorDB(elem.identificador)
        setEditdescricaoFrotaDB(elem.descricaoFrota)
        setEditTipoFrotaIdDB(elem.tipoFrotaId)
        setEditTipoFrotaNameDB(elem.tipoFrotaName)
        setEditUnidadeDB(elem.unidade)
        setEditAnoFrotaDB(elem.anoFrota)
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
            setEditIdentificadorDB(null)
            setEditdescricaoFrotaDB(null)
            setEditTipoFrotaIdDB(null)
            setEditTipoFrotaNameDB(null)
            setEditUnidadeDB(null)
            setEditAnoFrotaDB(null)
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

    const handleEditDB = async () => {

        const isValid = validateEditDB()

        if (isValid) {

            const emissoes = calc(editTipoFrotaIdDB, editAnoFrotaDB, editConsumoAnualDB, states.fonteEmissao, fatoresEmissao, states.tipoCalculo)

            const data = {
                company_id: token.company_id,
                unid_id: states.unid_id,
                unidSetorPrimario: states.unidSetorPrimario,
                unidName: states.unidName,
                anoInventario: states.anoInventario,
                escopo: states.escopo,
                fonteEmissao: states.fonteEmissao,
                tipoEmissao: states.tipoEmissao,
                tipoCalculo: states.tipoCalculo,
                code: editCodeDB,
                identificador: editIdentificadorDB,
                descricaoFrota: editdescricaoFrotaDB,
                tipoFrotaId: editTipoFrotaIdDB,
                tipoFrotaName: editTipoFrotaNameDB,
                unidade: editUnidadeDB,
                anoFrota: editAnoFrotaDB,
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
                    setEditIdentificadorDB(null)
                    setEditdescricaoFrotaDB(null)
                    setEditConsumoAnualDB(null)
                    setEditComentarioDB(null)
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
                list[i].tipoEmissao === "Transporte Rodoviário" &&
                list[i].tipoCalculo === "Por tipo e ano de fabricacao" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                !showMore && inventoryList.length < 5) {
                inventoryList.push(list[i])
            } else if (list[i].fonteEmissao === "Transportes" &&
                list[i].tipoEmissao === "Transporte Rodoviário" &&
                list[i].tipoCalculo === "Por tipo e ano de fabricacao" &&
                list[i].unid_id === states.unid_id &&
                list[i].anoInventario === states.anoInventario &&
                showMore) {
                inventoryList.push(list[i])
            }
            if (list[i].fonteEmissao === "Transportes" &&
                list[i].tipoEmissao === "Transporte Rodoviário" &&
                list[i].tipoCalculo === "Por tipo e ano de fabricacao" &&
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

                    <div className="table-responsive">
                        <small>
                            <small>
                            <table className="table table-striped table-sm scrollBarTable ">
                                {/* <Scrollbars > */}
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
                                        <th className="text-center akvo-text-escopo1">Tipo da frota de veículos</th>
                                        <th className="text-center akvo-text-escopo1">Ano da frota</th>
                                        <th className="text-center akvo-text-escopo1">Período de consumo</th>
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
                                        } else if (val.descricaoFrota.toLowerCase().includes(searchDescricao.toLocaleLowerCase())) {
                                            return val
                                        }
                                    }).map((elem, index) => {
                                        return (
                                            <>
                                                {editCodeDB === elem.code ?
                                                    <>
                                                        <tr className="fadeItem" key={`edit${index}`}>
                                                            <td scopo="row" className="text-center">
                                                                <small>{elem.code}</small>
                                                            </td>
                                                            <td scopo="row" className="text-center">
                                                                <input className="form-control form-control-sm" type="text" value={editIdentificadorDB} onChange={e => setEditIdentificadorDB(e.target.value)} />
                                                            </td>
                                                            <td scopo="row" className="text-center">
                                                                <input className="form-control form-control-sm" type="text" value={editdescricaoFrotaDB} onChange={e => setEditdescricaoFrotaDB(e.target.value)} />
                                                            </td>
                                                            <td scopo="row" className="text-center">
                                                                <select className="form-select form-select-sm frotaListItem"
                                                                    value={`${editTipoFrotaIdDB},${editTipoFrotaNameDB},${editUnidadeDB}`}
                                                                    onChange={e => {
                                                                        multiplosValoresEditDB(e.target.value)
                                                                    }}>
                                                                    <FrotaList />
                                                                </select>
                                                            </td>
                                                            <td scopo="row" className="text-center">
                                                                <select className="form-select form-select-sm"
                                                                    value={editAnoFrotaDB}
                                                                    onChange={e => {
                                                                        setEditAnoFrotaDB(e.target.value)
                                                                    }}>
                                                                    <AnoOptions />
                                                                </select>
                                                            </td>
                                                            <td scopo="row" className="text-center">
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
                                                            <td className="text-center">
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
                                                            <td className="text-center">
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
                                                            <ModalCommentItem editComentarioDB={editComentarioDB} editCodeDB={editCodeDB} handleChange={(e) => setEditComentarioDB(e.target.value)} elemComentario={elem.comentario} setEditComentarioDB={setEditComentarioDB} />
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
                                                        <td className="text-center">
                                                            <small>{elem.code}</small>
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.identificador}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.descricaoFrota}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.tipoFrotaName}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.anoFrota}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.periodoConsumo.charAt(0).toUpperCase() + elem.periodoConsumo.slice(1)}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.consumoAnual} {elem.unidade}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.emissoesTotais.toFixed(2)}
                                                        </td>
                                                        <td className="text-center">
                                                            {elem.emissoesBiogenicas.toFixed(2)}
                                                        </td>
                                                        {showMoreInfo && (
                                                            <>
                                                                <td className="text-center">
                                                                    {elem.emissoesCO2_F.toFixed(4)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.emissoesCH4_F.toFixed(4)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.emissoesN2O_F.toFixed(4)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.emissoesCO2_B.toFixed(4)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.emissoesCH4_B.toFixed(4)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.emissoesN2O_B.toFixed(4)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.userName}
                                                                </td>
                                                                <td className="text-center">
                                                                    {elem.dateUpdated ? ` ${new Date(elem.dateUpdated).getDate()}/${new Date(elem.dateUpdated).getMonth()}/${new Date(elem.dateUpdated).getFullYear()}` : `${new Date(elem.dateAdded).getDate()}/${new Date(elem.dateAdded).getMonth()}/${new Date(elem.dateAdded).getFullYear()}`}
                                                                </td>
                                                            </>
                                                        )}
                                                        <td className="text-center">
                                                            {elem.comentario && (
                                                                <Comentarios comentario={elem.comentario} />
                                                            )}
                                                        </td>
                                                        <td className="text-center">
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
                    {
                        inventoryLength > 5 && (
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
                        )
                    }
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