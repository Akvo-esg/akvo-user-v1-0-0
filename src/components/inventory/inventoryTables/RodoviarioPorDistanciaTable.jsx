import { useEffect, useState } from "react"
import $ from "jquery"
import { calc } from '../../../utils/equations/transportesDistancia'
import axios from "axios"
import FrotaList from "../inventory/FrotaList"
import AnoOptions from "../inventory/AnoOptions"
import ConsumoMensalListEdit from "../inventory/ConsumoMensalListEdit"
import baseUrl from "../../../utils/baseUrl"

export default function FontesEstacionariasDeCombustao(props) {


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

            const emissoes = calc(editTipoFrotaIdDB, editAnoFrotaDB, editConsumoAnualDB, props.data.fonteEmissao, props.fatoresEmissao, props.tipoCalculo)

            const data = {
                unid_id: props.data.unid_id,
                unidSetorPrimario: props.data.unidSetorPrimario,
                unidName: props.data.unidName,
                anoInventario: props.data.anoInventario,
                escopo: props.data.escopo,
                fonteEmissao: props.data.fonteEmissao,
                transporte: props.transporte,
                tipoCalculo: props.tipoCalculo,
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
                userName: `${props.data.userName} ${props.data.userLastName}`,
                user_id: props.data.user_id,
                dateAdded: editDateAddedDB,
                dateUpdated: new Date()
            }

            await axios.patch(`${baseUrl()}/api/editInventory/${props.data.company_id}`, data)
                .then(setLoadingEditDB(true))
                .then(res => {
                    setLoadingEditDB(false)
                    props.updateList()
                    setEditCodeDB(null)
                    setEditIdentificadorDB('')
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
            company_id: props.data.company_id,
            code: code
        }

        await axios.post(`${baseUrl()}/api/editInventory/${props.data.company_id}`, data)
            .then(res => { props.updateList() })

    }

    const renderInventoryTable = (list) => {

        $(function () {
            $("[data-toggle=popover]")
                .popover({ html: true })
        })

        let inventoryList = []
        let inventoryLength = 0

        for (let i = 0; i < list.length; i++) {
            if (list[i].fonteEmissao === "Transportes" &&
                list[i].transporte === "Transporte rodoviário" &&
                list[i].tipoCalculo === "Por distancia" &&
                list[i].unid_id === props.data.unid_id &&
                list[i].anoInventario === props.data.anoInventario &&
                !showMore && inventoryList.length < 5) {
                inventoryList.push(list[i])
            } else if (list[i].fonteEmissao === "Transportes" &&
                list[i].transporte === "Transporte rodoviário" &&
                list[i].tipoCalculo === "Por distancia" &&
                list[i].unid_id === props.data.unid_id &&
                list[i].anoInventario === props.data.anoInventario &&
                showMore) {
                inventoryList.push(list[i])
            }
            if (list[i].fonteEmissao === "Transportes" &&
                list[i].transporte === "Transporte rodoviário" &&
                list[i].tipoCalculo === "Por distancia" &&
                list[i].unid_id === props.data.unid_id &&
                list[i].anoInventario === props.data.anoInventario) {
                inventoryLength++
            }
        }

        if (inventoryList.length > 0) {
            return (

                <div className="mt-5 fadeItem">
                    <h6>Últimos dados cadastrados em {props.data.unidName} / {props.data.anoInventario}</h6>

                    <div className="table-responsive">
                        <small>
                            <small>
                                <table className="table table-striped table-sm ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Código</th>
                                            {showMore ?
                                                <th>
                                                    <div className="input-group input-group-sm">
                                                        <input type="text" className="form-control form-control-sm"
                                                            placeholder="Identificador"
                                                            value={searchIdentificador}
                                                            onChange={e => setSearchIdentificador(e.target.value)} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" ><i className="fa fa-search"></i></span>
                                                        </div>
                                                    </div>

                                                </th>
                                                :
                                                <th scope="col">Identificador</th>
                                            }
                                            {showMore ?
                                                <th>
                                                    <div className="input-group input-group-sm">
                                                        <input type="text" className="form-control form-control-sm"
                                                            placeholder="Descrição da fonte"
                                                            value={searchDescricao}
                                                            onChange={e => setSearchDescricao(e.target.value)} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" ><i className="fa fa-search"></i></span>
                                                        </div>
                                                    </div>
                                                </th>
                                                :
                                                <th scope="col">Descrição da fonte</th>
                                            }
                                            <th scope="col">Tipo da frota de veículos</th>
                                            <th scope="col">Ano da frota</th>
                                            <th scope="col">Período de coleta de dados</th>
                                            <th scope="col" className="fadeItem">Distância anual percorrida</th>
                                            <th scope="col">Emissões fósseis totais<br />t CO<sub>2</sub> eq.</th>
                                            <th scope="col">Emissões biogênicas<br />t CO<sub>2</sub></th>
                                            {showMoreInfo && (
                                                <>
                                                    <th scope="col">Emissões t CO<sub>2</sub><br />(Combustíveis fóssies)</th>
                                                    <th scope="col">Emissões t CH<sub>4</sub><br />(Combustíveis fóssies)</th>
                                                    <th scope="col">Emissões t N<sub>2</sub>O<br />(Combustíveis fóssies)</th>
                                                    <th scope="col">Emissões t CO<sub>2</sub><br />(Biocombustíveis)</th>
                                                    <th scope="col">Emissões t CH<sub>4</sub><br />(Biocombustíveis)</th>
                                                    <th scope="col">Emissões t N<sub>2</sub>O<br />(Biocombustíveis)</th>
                                                    <th scope="col">Usuário</th>
                                                    <th scope="col">Data de cadastro/Atualização</th>
                                                </>
                                            )}
                                            <th scope="col"></th>
                                            <th scope="col">
                                                <span
                                                    class="badge badge-pill badge-primary"
                                                    type="button"
                                                    onClick={() => setShowMoreInfo(!showMoreInfo)}>
                                                    {showMoreInfo ?
                                                        <i className="fa fa-minus"></i>
                                                        :
                                                        <i className="fa fa-plus"></i>
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
                                                return val
                                            }
                                        }).filter(val => {
                                            if (searchDescricao == '') {
                                                return val
                                            } else if (val.descricaoFrota.toLowerCase().includes(searchDescricao.toLocaleLowerCase())) {
                                                return val
                                            }
                                        }).map(elem => {
                                            return (
                                                <>
                                                    {editCodeDB === elem.code ?
                                                        <>
                                                            <tr className="fadeItem">
                                                                <td scopo="row">
                                                                    <small>{elem.code}</small>
                                                                </td>
                                                                <td scopo="row">
                                                                    <input className="form-control form-control-sm" type="text" value={editIdentificadorDB} onChange={e => setEditIdentificadorDB(e.target.value)} />
                                                                </td>
                                                                <td scopo="row">
                                                                    <input className="form-control form-control-sm" type="text" value={editdescricaoFrotaDB} onChange={e => setEditdescricaoFrotaDB(e.target.value)} />
                                                                </td>
                                                                <td scopo="row">
                                                                    <select className="custom-select custom-select-sm"
                                                                        value={`${editTipoFrotaIdDB},${editTipoFrotaNameDB},${editUnidadeDB}`}
                                                                        onChange={e => {
                                                                            multiplosValoresEditDB(e.target.value)
                                                                        }}>
                                                                        <FrotaList />
                                                                    </select>
                                                                </td>
                                                                <td scopo="row">
                                                                    <select className="custom-select custom-select-sm"
                                                                        value={editAnoFrotaDB}
                                                                        onChange={e => {
                                                                            setEditAnoFrotaDB(e.target.value)
                                                                        }}>
                                                                        <AnoOptions />
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
                                                                        <div className="input-group-append">
                                                                            <span class="input-group-text">km</span>
                                                                        </div>
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
                                                                    <button type="button"
                                                                        className="btn btn-sm btn-info"
                                                                        data-toggle="modal"
                                                                        data-target="#commentModalDB"
                                                                    >
                                                                        <i className="fa fa-comments"></i>
                                                                    </button>
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
                                                                                <i className="fa fa-check"></i>
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
                                                                            <i className="fa fa-times"></i>
                                                                        </button>

                                                                    </div>
                                                                </td>
                                                                <div className="modal fade" data-backdrop="static" id="commentModalDB" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLabel">Editar o comentario do registro {editCodeDB} </h5>
                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setEditComentarioDB(elem.comentario)}>
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <textarea rows="3" type="text" className="form-control"
                                                                                    value={editComentarioDB}
                                                                                    onChange={e => setEditComentarioDB(e.target.value)} />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-outline-success" data-dismiss="modal"><i className="fa fa-save"></i></button>
                                                                                <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={() => setEditComentarioDB(elem.comentario)}> <i className="fa fa-times"></i> </button>
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
                                                                {elem.tipoFrotaName}
                                                            </td>
                                                            <td>
                                                                {elem.anoFrota}
                                                            </td>
                                                            <td>
                                                                {elem.periodoConsumo.charAt(0).toUpperCase() + elem.periodoConsumo.slice(1)}
                                                            </td>
                                                            <td>
                                                                {elem.consumoAnual} km
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
                                                                    <span type="button" tabindex="0" className="badge badge-pill badge-info" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="bottom"
                                                                        data-content={elem.comentario} >
                                                                        <i className="fa fa-comments"></i>
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="btn-group btn-group-sm" role="group">
                                                                    <button type="button"
                                                                        className="btn btn-warning"
                                                                        data-toggle-tooltip="true" data-placement="bottom" title="Editar"
                                                                        onClick={() => editDB(elem)}>
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                    <button type="button"
                                                                        className="btn btn-danger"
                                                                        data-toggle="modal" data-toggle-tooltip="true" data-target="#deleteModalBD"
                                                                        data-placement="bottom" title="Excluir"
                                                                        onClick={() => setDeleteElemCodeDB(elem.code)}>
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </td>

                                                            <div className="modal fade" id="deleteModalBD" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLabel">Excluir registro</h5>
                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            Tem certeza que deseja excluir o registro {deleteElemCodeDB}
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Cancelar</button>
                                                                            <button type="buttom" className="btn btn-danger btn-sm" data-dismiss="modal"
                                                                                onClick={() => handleDeleteDB(deleteElemCodeDB)}
                                                                            >Excluir
                                                                                <i className="fa fa-trash ml-1"></i>
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
                    {inventoryLength > 5 && (
                        <>
                            {showMore ?
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { setShowMore(false) }}><i class="fa fa-minus"></i></button>
                                </div>
                                :
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary btn-circle btn-lg"
                                        onClick={() => { setShowMore(true) }}><i class="fa fa-plus"></i></button>
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
                </div>
            )
        } else {
            return
        }
    }

    return (
        <>
            {renderInventoryTable(props.inventario)}
        </>
    )

}