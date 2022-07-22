import { useEffect, useState } from "react"
import $ from "jquery"
import { calc } from '../../../utils/equations/transportesDistancia'
import FrotaList from "./FrotaList"
import AnoOptions from "./AnoOptions"
import {
    faCheck,
    faComment,
    faDownload,
    faEye,
    faPenToSquare,
    faSave,
    faTimes,
    faTrash,
    faTrashAlt,
    faUpload,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import ConsumoMensalList from "./ConsumoMensalList"
import ConsumoMensalListEdit from "./ConsumoMensalListEdit"
import { useSelector, useDispatch } from "react-redux";
import { add, addMany, update, remove, removeMany } from '../../../store/InventoryList/InventoryList.actions'
import inventoryCode from "../../../../utils/inventoryCode"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


export default function RodoviarioPorDistancia() {

    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

    //List Items
    const [code, setCode] = useState('')
    const [identificador, setIdentificador] = useState('')
    const [descricaoFrota, setDescricaoFrota] = useState('')
    const [tipoFrotaId, setTipoFrotaId] = useState('')
    const [tipoFrotaName, setTipoFrotaName] = useState('')
    const [unidade, setUnidade] = useState('-')
    const [anoFrota, setAnoFrota] = useState('')
    const [periodoConsumo, setPeriodoConsumo] = useState('')
    const [consumoAnual, setConsumoAnual] = useState(null)
    const [consumoJan, setConsumoJan] = useState(null)
    const [consumoFev, setConsumoFev] = useState(null)
    const [consumoMar, setConsumoMar] = useState(null)
    const [consumoAbr, setConsumoAbr] = useState(null)
    const [consumoMai, setConsumoMai] = useState(null)
    const [consumoJun, setConsumoJun] = useState(null)
    const [consumoJul, setConsumoJul] = useState(null)
    const [consumoAgo, setConsumoAgo] = useState(null)
    const [consumoSet, setConsumoSet] = useState(null)
    const [consumoOut, setConsumoOut] = useState(null)
    const [consumoNov, setConsumoNov] = useState(null)
    const [consumoDez, setConsumoDez] = useState(null)

    //Edit items
    const [editElementIndex, setEditElementIndex] = useState(false)
    const [editIdentificador, setEditIdentificador] = useState('')
    const [editdescricaoFrota, setEditdescricaoFrota] = useState(null)
    const [editTipoFrotaId, setEditTipoFrotaId] = useState('')
    const [editTipoFrotaName, setEditTipoFrotaName] = useState('')
    const [editUnidade, setEditUnidade] = useState('')
    const [editAnoFrota, setEditAnoFrota] = useState('')
    const [editPeriodoConsumo, setEditPeriodoConsumo] = useState('')
    const [editConsumoAnual, setEditConsumoAnual] = useState(null)
    const [editConsumoJan, setEditConsumoJan] = useState(null)
    const [editConsumoFev, setEditConsumoFev] = useState(null)
    const [editConsumoMar, setEditConsumoMar] = useState(null)
    const [editConsumoAbr, setEditConsumoAbr] = useState(null)
    const [editConsumoMai, setEditConsumoMai] = useState(null)
    const [editConsumoJun, setEditConsumoJun] = useState(null)
    const [editConsumoJul, setEditConsumoJul] = useState(null)
    const [editConsumoAgo, setEditConsumoAgo] = useState(null)
    const [editConsumoSet, setEditConsumoSet] = useState(null)
    const [editConsumoOut, setEditConsumoOut] = useState(null)
    const [editConsumoNov, setEditConsumoNov] = useState(null)
    const [editConsumoDez, setEditConsumoDez] = useState(null)
    const [deleteElemIndex, setDeleteElemIndex] = useState(null)
    const [deleteElemCode, setDeleteElemCode] = useState(null)
    const [commentElemCode, setCommentElemCode] = useState(null)
    const [commentElemIndex, setCommentElemIndex] = useState(null)
    const [editComentario, setEditComentario] = useState(null)
    const [deleteManyArray, setDeleteManyArray] = useState([])

    useEffect(() => {
        handleCode()
    }, [, list, inventory])

    useEffect(() => {
        let boxes = document.getElementsByClassName('listElement')
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].checked = false
            setDeleteManyArray([])
        }
    }, [list])

    useEffect(() => {
        let tags = document.getElementsByClassName('editElement')
        if (deleteManyArray.length) {
            for (var i = 0; i < tags.length; i++) {
                tags[i].disabled = true
            }
        } else {
            for (var i = 0; i < tags.length; i++) {
                tags[i].disabled = false
            }
        }
    }, [deleteManyArray])

    useEffect(() => {
        if (editPeriodoConsumo === "anual") {
            $('#editConsumoItem').each(function () {
                this.disabled = false
            })
        }
        else {
            $('#editConsumoItem').each(function () {
                this.disabled = true
            })
        }
    }, [editConsumoAnual])

    const handleCode = (oldCode) => {
        const code = inventoryCode(list, inventory, states.fonteEmissao, oldCode)
        setCode(code)
        return code
    }

    const multiplosValores = (elem) => {
        const array = elem.split(",")
        setTipoFrotaId(array[0])
        setTipoFrotaName(array[1])
        setUnidade(array[2])
    }

    const multiplosValoresEdit = (elem) => {
        const array = elem.split(",")
        setEditTipoFrotaId(array[0])
        setEditTipoFrotaName(array[1])
        setEditUnidade(array[2])
    }

    const handleSubmit = () => {

        const isValid = validate()

        if (isValid) {
            const emissoes = calc(tipoFrotaId, anoFrota, consumoAnual, states.fonteEmissao, fatoresEmissao, states.tipoCalculo)

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
                comentario: '',
                code,
                descricaoFrota,
                identificador,
                tipoFrotaId,
                tipoFrotaName,
                unidade,
                anoFrota,
                periodoConsumo,
                consumoAnual,
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
                emissoesCO2_F: emissoes.emissoesCO2_F,
                emissoesCH4_F: emissoes.emissoesCH4_F,
                emissoesN2O_F: emissoes.emissoesN2O_F,
                emissoesCO2_B: emissoes.emissoesCO2_B,
                emissoesCH4_B: emissoes.emissoesCH4_B,
                emissoesN2O_B: emissoes.emissoesN2O_B,
                emissoesTotais: emissoes.emissoesTotais,
                emissoesBiogenicas: emissoes.emissoesBiogenicas
            }

            dispatch(add(list, data))

            setIdentificador('')
            setDescricaoFrota('')
            setTipoFrotaId(null)
            setTipoFrotaName(null)
            setUnidade('')
            setAnoFrota(null)
            setPeriodoConsumo(null)
            setConsumoAnual(null)
            setConsumoJan(null)
            setConsumoFev(null)
            setConsumoMar(null)
            setConsumoAbr(null)
            setConsumoMai(null)
            setConsumoJun(null)
            setConsumoJul(null)
            setConsumoAgo(null)
            setConsumoSet(null)
            setConsumoOut(null)
            setConsumoNov(null)
            setConsumoDez(null)


            $('#consumoItem').each(function () {
                this.disabled = true
                this.value = null
            })

            $('#tipoFrotaSelect').each(function () {
                this.value = ''
            })
            $('#anoFrotaSelect').each(function () {
                this.value = ''
            })
            $('#periodoConsumoSelect').each(function () {
                this.value = ''
            })
            handleCode()
        } else {
            return
        }

    }

    const validate = () => {

        if (descricaoFrota && tipoFrotaId && anoFrota && periodoConsumo && consumoAnual > 0) {
            return true
        } else {
            return false
        }
    }

    const handleComentario = (index) => {
        const oldList = list
        oldList[index].comentario = editComentario
        dispatch(update(oldList))

        setEditComentario('')
        setCommentElemCode('')

        return
    }

    const edit = (elem, index) => {
        setEditElementIndex(index)
        setEditIdentificador(elem.identificador)
        setEditdescricaoFrota(elem.descricaoFrota)
        setEditTipoFrotaId(elem.tipoFrotaId)
        setEditTipoFrotaName(elem.tipoFrotaName)
        setEditUnidade(elem.unidade)
        setEditAnoFrota(elem.anoFrota)
        setEditPeriodoConsumo(elem.periodoConsumo)
        setEditConsumoAnual(elem.consumoAnual)
        setEditConsumoJan(elem.consumoJan)
        setEditConsumoFev(elem.consumoFev)
        setEditConsumoMar(elem.consumoMar)
        setEditConsumoAbr(elem.consumoAbr)
        setEditConsumoMai(elem.consumoMai)
        setEditConsumoJun(elem.consumoJun)
        setEditConsumoJul(elem.consumoJul)
        setEditConsumoAgo(elem.consumoAgo)
        setEditConsumoSet(elem.consumoSet)
        setEditConsumoOut(elem.consumoOut)
        setEditConsumoNov(elem.consumoNov)
        setEditConsumoDez(elem.consumoDez)
        $('#tipoFrotaSelect').each(function () {
            this.disabled = true
        })
        $('#identificadorItem').each(function () {
            this.disabled = true
        })
        $('#descricaoFrotaItem').each(function () {
            this.disabled = true
        })
        $('#anoFrotaSelect').each(function () {
            this.disabled = true
        })
        $('#periodoConsumoSelect').each(function () {
            this.disabled = true
        })
        $('#consumoItem').each(function () {
            this.disabled = true
        })
        $('.listElement').each(function () {
            this.disabled = true
        })
    }

    const cancel = () => {
        setTimeout(() => {
            setEditElementIndex(false)
            setEditdescricaoFrota('')
            setEditConsumoAnual(null)
            $('#descricaoFrotaItem').each(function () {
                this.disabled = false
            })
            $('#identificadorItem').each(function () {
                this.disabled = false
            })
            $('#tipoFrotaSelect').each(function () {
                this.disabled = false
            })
            $('#anoFrotaSelect').each(function () {
                this.disabled = false
            })
            $('#periodoConsumoSelect').each(function () {
                this.disabled = false
            })
            $('#consumoItem').each(function () {
                this.disabled = false
            })
            $('.listElement').each(function () {
                this.disabled = false
            })
        }, 10)
    }

    const handleEdit = (index) => {

        const emissoes = calc(editTipoFrotaId, editAnoFrota, editConsumoAnual, states.fonteEmissao, fatoresEmissao, states.tipoCalculo)

        const newList = list

        newList[index].identificador = editIdentificador
        newList[index].descricaoFrota = editdescricaoFrota
        newList[index].tipoFrotaId = editTipoFrotaId
        newList[index].tipoFrotaName = editTipoFrotaName
        newList[index].unidade = editUnidade
        newList[index].anoFrota = editAnoFrota
        newList[index].periodoConsumo = editPeriodoConsumo
        newList[index].consumoAnual = editConsumoAnual
        newList[index].consumoJan = editConsumoJan
        newList[index].consumoFev = editConsumoFev
        newList[index].consumoMar = editConsumoMar
        newList[index].consumoAbr = editConsumoAbr
        newList[index].consumoMai = editConsumoMai
        newList[index].consumoJun = editConsumoJun
        newList[index].consumoJul = editConsumoJul
        newList[index].consumoAgo = editConsumoAgo
        newList[index].consumoSet = editConsumoSet
        newList[index].consumoOut = editConsumoOut
        newList[index].consumoNov = editConsumoNov
        newList[index].consumoDez = editConsumoDez
        newList[index].emissoesCO2_F = emissoes.emissoesCO2_F
        newList[index].emissoesCH4_F = emissoes.emissoesCH4_F
        newList[index].emissoesN2O_F = emissoes.emissoesN2O_F
        newList[index].emissoesCO2_B = emissoes.emissoesCO2_B
        newList[index].emissoesCH4_B = emissoes.emissoesCH4_B
        newList[index].emissoesN2O_B = emissoes.emissoesN2O_B
        newList[index].emissoesTotais = emissoes.emissoesTotais
        newList[index].emissoesBiogenicas = emissoes.emissoesBiogenicas

        dispatch(update(newList))
        cancel()
    }

    const handlePeriodoConsumo = (value) => {
        setPeriodoConsumo(value)
        setConsumoAnual(null)
        setConsumoJan(null)
        setConsumoFev(null)
        setConsumoMar(null)
        setConsumoAbr(null)
        setConsumoMai(null)
        setConsumoJun(null)
        setConsumoJul(null)
        setConsumoAgo(null)
        setConsumoSet(null)
        setConsumoOut(null)
        setConsumoNov(null)
        setConsumoDez(null)

        if (value === "anual") {
            $('#consumoItem').each(function () {
                this.disabled = false
            })
        } else if (value === "mensal") {
            $('#consumoItem').each(function () {
                this.disabled = true
            })
        } else {
            $('#consumoItem').each(function () {
                this.disabled = true
            })
        }
    }

    const handleDeleteMany = (checked) => {
        let boxes = document.getElementsByClassName('listElement')
        const deleteArray = []
        if (checked) {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].checked = true
                deleteArray.push(boxes[i].value)
                setDeleteManyArray(deleteArray)
            }
        } else {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].checked = false
                setDeleteManyArray([])
            }
        }
    }

    const deleteItemSelect = (checked, code) => {
        const deleteArray = deleteManyArray
        if (checked) {
            setDeleteManyArray(deleteArray.concat([code]))
        } else {
            setDeleteManyArray(deleteArray.filter(elem => elem !== code))
        }
    }

    const handleDeleteManyModal = () => {
        dispatch(removeMany(list, deleteManyArray))
        let boxes = document.getElementsByClassName('listElement')
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].checked = false
            setDeleteManyArray([])
        }
    }


    return (
        <div>

            <div className="d-inline-flex mb-2 mt-3">
                <div className="col">
                    <p className='akvo_form_label passo4Text'>Insira os dados na tabela</p>
                </div>
            </div>
        
            <small>
                <table className="table table-striped table-hover table-sm fadeItem">
                    <thead>
                        <tr className="py-2">
                            <th scope="col">
                                <div className="form-check pb-0 mb-0">
                                    <input type="checkbox" className="form-check-input listElement" id="customCheck1" value='' onChange={e => handleDeleteMany(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="customCheck1"></label>
                                    {deleteManyArray.length > 0 && (
                                        <span
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-toggle-tooltip="true"
                                        data-bs-target="#deleteManyModal">
                                            <FontAwesomeIcon icon={faTrashAlt} className="text-danger" />
                                        </span>
                                    )}

                                </div>
                            </th>
                            <th className="text-center akvo-text-escopo1">Identificador</th>
                            <th className="text-center akvo-text-escopo1">Descrição da frota</th>
                            <th className="text-center akvo-text-escopo1">Tipo de combustível</th>
                            <th className="text-center akvo-text-escopo1">Período de consumo</th>
                            <th className="text-center akvo-text-escopo1 fadeItem">Consumo anual</th>
                            <th className="text-center akvo-text-escopo1"></th>
                        </tr>
                    </thead>
                    <tbody className="escopo1_bg">
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                    id="identificadorItem"
                                    value={identificador}
                                    onChange={e => setIdentificador(e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                    id="descricaoFrotaItem"
                                    value={descricaoFrota}
                                    onChange={e => setDescricaoFrota(e.target.value)} />
                            </td>
                            <td>
                                <select name="combustivel" id="tipoFrotaSelect"
                                    className="custom-select custom-select-sm"
                                    onChange={e => multiplosValores(e.target.value)}>
                                    <FrotaList />
                                </select>
                            </td>
                            <td>
                                <select name="combustivel" id="anoFrotaSelect"
                                    className="custom-select custom-select-sm"
                                    onChange={e => setAnoFrota(e.target.value)}>
                                    <AnoOptions />
                                </select>
                            </td>
                            <td>
                                <select name="combustivel" id="periodoConsumoSelect"
                                    className="custom-select custom-select-sm"
                                    onChange={e => {
                                        handlePeriodoConsumo(e.target.value)
                                    }}>
                                    <option value="" disabled selected>Escolha</option>
                                    <option value="anual">Anual</option>
                                    <option value="mensal">Mensal</option>
                                </select>
                            </td>
                            <td className="fadeItem">
                                <div className="input-group input-group-sm">
                                    <input type="number" className="form-control form-control-sm" id="consumoItem"
                                        value={consumoAnual}
                                        disabled
                                        onChange={e => setConsumoAnual(parseFloat(e.target.value))} />
                                    <span className="input-group-text" id='unidadeItem'>{unidade}</span>
                                </div>
                            </td>
                            <td>
                                <button type="submit" className="btn btn-outline-light btn-sm" onClick={() => handleSubmit()}>Ok</button>
                            </td>
                        </tr>
                        {periodoConsumo === "mensal" && (
                            <tr className="fadeItem">
                                <td colSpan="9">
                                    <ConsumoMensalList onChange={(
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
                                        setConsumoJan(consumoJan)
                                        setConsumoFev(consumoFev)
                                        setConsumoMar(consumoMar)
                                        setConsumoAbr(consumoAbr)
                                        setConsumoMai(consumoMai)
                                        setConsumoJun(consumoJun)
                                        setConsumoJul(consumoJul)
                                        setConsumoAgo(consumoAgo)
                                        setConsumoSet(consumoSet)
                                        setConsumoOut(consumoOut)
                                        setConsumoNov(consumoNov)
                                        setConsumoDez(consumoDez)
                                        setConsumoAnual(soma)
                                    }} />
                                </td>
                            </tr>
                        )}
                    </tbody>

                    <tbody>
                        {list.map((elem, index) => {

                            // $(function () {
                            //     $('[data-toggle="popover"]').popover({
                            //         container: 'body',
                            //         html: true,
                            //         placement: 'bottom',
                            //         sanitize: false,
                            //         content: function () {
                            //             return $('#PopoverContent').html()
                            //         }
                            //     })
                            // })

                            if (elem.fonteEmissao === "Transportes" &&
                                elem.transporte === "Transporte rodoviário" &&
                                elem.tipoCalculo === "Por distancia" &&
                                elem.anoInventario === states.anoInventario &&
                                elem.unid_id === states.unid_id) {
                                return (
                                    <>
                                        {editElementIndex === index ?
                                            <>
                                                <tr key={`edit${index}`}>
                                                    <td scopo="row"></td>
                                                    <td scopo="row">
                                                        <input className="form-control form-control-sm" type="text" value={editIdentificador} onChange={e => setEditIdentificador(e.target.value)} />
                                                    </td>
                                                    <td scopo="row">
                                                        <input className="form-control form-control-sm" type="text" value={editdescricaoFrota} onChange={e => setEditdescricaoFrota(e.target.value)} />
                                                    </td>
                                                    <td scopo="row">
                                                        <select className="custom-select custom-select-sm"
                                                            value={`${editTipoFrotaId},${editTipoFrotaName},${editUnidade}`}
                                                            onChange={e => {
                                                                multiplosValoresEdit(e.target.value)
                                                            }}>
                                                            <FrotaList />
                                                        </select>
                                                    </td>
                                                    <td scopo="row">
                                                        <select className="custom-select custom-select-sm"
                                                            value={editAnoFrota}
                                                            onChange={e => {
                                                                setEditAnoFrota(e.target.value)
                                                            }}>
                                                            <AnoOptions />
                                                        </select>
                                                    </td>
                                                    <td scopo="row">
                                                        {editPeriodoConsumo.charAt(0).toUpperCase() + editPeriodoConsumo.slice(1)}
                                                    </td>
                                                    <td>
                                                        <div className="input-group input-group-sm">
                                                            <input className="form-control form-control-sm" id="editConsumoItem"
                                                                type="number"
                                                                value={editConsumoAnual}
                                                                placeholder="0"
                                                                onChange={e => setEditConsumoAnual(e.target.value)} />
                                                            <span className="input-group-text">{editUnidade}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group btn-group-sm fadeItem" role="group">
                                                            <button type="button"
                                                                className="btn btn-outline-success"
                                                                data-toggle-tooltip="true" data-placement="bottom" title="Confirmar"
                                                                onClick={() => {
                                                                    setTimeout(() => {
                                                                        handleEdit(index)
                                                                    }, 10)
                                                                }}>
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </button>
                                                            <button type="button"
                                                                className="btn btn-outline-danger"
                                                                data-toggle-tooltip="true" data-placement="bottom" title="Cancelar"
                                                                onClick={() => cancel()}>
                                                                <i className="fa fa-times"></i>
                                                            </button>

                                                        </div>
                                                    </td>
                                                </tr>
                                                {editPeriodoConsumo === "mensal" && (
                                                    <tr className="fadeItem">
                                                        <td colSpan="9">
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
                                                                setEditConsumoJan(consumoJan)
                                                                setEditConsumoFev(consumoFev)
                                                                setEditConsumoMar(consumoMar)
                                                                setEditConsumoAbr(consumoAbr)
                                                                setEditConsumoMai(consumoMai)
                                                                setEditConsumoJun(consumoJun)
                                                                setEditConsumoJul(consumoJul)
                                                                setEditConsumoAgo(consumoAgo)
                                                                setEditConsumoSet(consumoSet)
                                                                setEditConsumoOut(consumoOut)
                                                                setEditConsumoNov(consumoNov)
                                                                setEditConsumoDez(consumoDez)
                                                                setEditConsumoAnual(soma)
                                                            }}
                                                                data={
                                                                    {
                                                                        editConsumoJan,
                                                                        editConsumoFev,
                                                                        editConsumoMar,
                                                                        editConsumoAbr,
                                                                        editConsumoMai,
                                                                        editConsumoJun,
                                                                        editConsumoJul,
                                                                        editConsumoAgo,
                                                                        editConsumoSet,
                                                                        editConsumoOut,
                                                                        editConsumoNov,
                                                                        editConsumoDez,
                                                                        editConsumoAnual
                                                                    }
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )}
                                            </>

                                            :
                                            <tr className="fadeItem" key={`view${index}`}>
                                                <td scopo="row">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input listElement" id={elem.code} value={elem.code} onChange={e => deleteItemSelect(e.target.checked, e.target.value)} />
                                                        <label class="custom-control-label" for={elem.code}></label>
                                                    </div>
                                                </td>
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
                                                    {elem.consumoAnual} {elem.unidade}
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm" role="group">
                                                        <span type="button" className="mx-2"
                                                            data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                            title="Editar" onClick={() => edit(elem, index)}>
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                        <span type="button" className="mx-2"
                                                            data-bs-toggle="modal" data-bs-placement="bottom"
                                                            title="Excluir" data-toggle-tooltip="true" data-bs-target="#deleteModal"
                                                            onClick={() => {
                                                                setDeleteElemCode(elem.code)
                                                            }}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </span>
                                                        <span type="button" className="mx-2 position-relative"
                                                            data-bs-toggle="modal" data-bs-placement="bottom" data-bs-target="#commentModal"
                                                            title="Comentar"
                                                            onClick={() => {
                                                                setEditComentario(elem.comentario)
                                                                setCommentElemCode(elem.code)
                                                                setCommentElemIndex(index)
                                                            }}>
                                                            <FontAwesomeIcon icon={faComment} />
                                                            {elem.comentario && (
                                                                <span className="notificationSign fadeItem">
                                                                    <span className="visually-hidden">New alerts</span>
                                                                </span>
                                                            )}
                                                        </span>

                                                        <div className="modal fade" id="commentModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                    <h5 className="h5_modal" id="exampleModalLabel">Comentar o registro &#34;{commentElemCode}&#34; </h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditComentario(null)}>
                                                                    </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <textarea rows="3" type="text" className="form-control"
                                                                            value={editComentario}
                                                                            onChange={e => setEditComentario(e.target.value)} />
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button   button type="button" className="btn btn-outline-success" onClick={() => handleComentario(commentElemIndex)} data-bs-dismiss="modal">
                                                                            <FontAwesomeIcon icon={faSave} />
                                                                        </button>
                                                                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => setEditComentario(null)}>
                                                                            <FontAwesomeIcon icon={faTimes} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>

                                            </tr>
                                        }
                                    </>
                                )
                            } else {
                                return
                            }
                        })}
                    </tbody>
                </table >
            </small>


            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="h5_modal">Excluir registro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="p">
                                Tem certeza que deseja excluir o registro {deleteElemCode}?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                            <button type="buttom" className="btn btn-danger btn-sm" data-bs-dismiss="modal"
                                onClick={() => dispatch(remove(list, deleteElemCode))}
                            >Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteManyModal" tabIndex="-1" aria-labelledby="deleteManyModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="h5_modal">Excluir registro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="p">
                                Tem certeza que deseja excluir os registros:
                                {deleteManyArray.map((elem, index) => <div key={index}>{elem}</div>)}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                            <button type="buttom" className="btn btn-danger btn-sm" data-bs-dismiss="modal"
                                onClick={() => handleDeleteManyModal()}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}