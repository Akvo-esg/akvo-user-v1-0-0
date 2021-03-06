import { useEffect, useState } from "react"
import $ from "jquery"
import { calc } from '../../../../utils/equations/energiaEletricaSIN'
import ConsumoMensalList from "../../formComponets/ConsumoMensalList"
import ConsumoMensalListEdit from "../../formComponets/ConsumoMensalListEdit"
import { useSelector, useDispatch } from "react-redux";
import { add, update, remove, removeMany } from '../../../../store/InventoryList/InventoryList.actions'
import inventoryCode from "../../../../utils/inventoryCode"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faComment,
    faDownload,
    faPenToSquare,
    faSave,
    faTimes,
    faTrashAlt,
    faUpload,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}


export default function EnergiaEletricaSIN(props) {

    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)

    //List Items
    const [code, setCode] = useState('')
    const [identificador, setIdentificador] = useState('')
    const [descricaoFonte, setDescricaoFonte] = useState('')
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
    const [editdescricaoFonte, setEditDescricaoFonte] = useState(null)
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

    const handleSubmit = () => {

        const isValid = validate()

        if (isValid) {

            const emissoes = calc(
                props.fatoresEmissao,
                props.data.anoInventario,
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
                consumoDez
            )

            const data = {
                company_id: props.data.company_id,
                unid_id: props.data.unid_id,
                unidSetorPrimario: props.data.unidSetorPrimario,
                unidName: props.data.unidName,
                anoInventario: props.data.anoInventario,
                escopo: props.data.escopo,
                fonteEmissao: props.data.fonteEmissao,
                tipoEmissao: props.tipoEmissao,
                comentario: '',
                code,
                identificador,
                descricaoFonte,
                periodoConsumo,
                consumoAnual: consumoAnual ? consumoAnual : 0,
                consumoJan: consumoJan ? consumoJan : 0,
                consumoFev: consumoFev ? consumoFev : 0,
                consumoMar: consumoMar ? consumoMar : 0,
                consumoAbr: consumoAbr ? consumoAbr : 0,
                consumoMai: consumoMai ? consumoMai : 0,
                consumoJun: consumoJun ? consumoJun : 0,
                consumoJul: consumoJul ? consumoJul : 0,
                consumoAgo: consumoAgo ? consumoAgo : 0,
                consumoSet: consumoSet ? consumoSet : 0,
                consumoOut: consumoOut ? consumoOut : 0,
                consumoNov: consumoNov ? consumoNov : 0,
                consumoDez: consumoDez ? consumoDez : 0,
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
            setDescricaoFonte('')
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
            $('#combustivelSelect').each(function () {
                this.value = ''
            })
            $('#periodoConsumoSelect').each(function () {
                this.value = ''
            })
        } else {
            return
        }
    }

    const validate = () => {
        if (descricaoFonte && periodoConsumo && consumoAnual > 0) {
            return true
        } else {
            return false
        }
    }

    const validateEdit = () => {
        if (editdescricaoFonte && editPeriodoConsumo && editConsumoAnual > 0) {
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
        setEditDescricaoFonte(elem.descricaoFonte)
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
        $('#combustivelSelect').each(function () {
            this.disabled = true
        })
        $('#identificadorItem').each(function () {
            this.disabled = true
        })
        $('#descricaoFonteItem').each(function () {
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
            setEditDescricaoFonte('')
            setEditConsumoAnual(null)
            $('#descricaoFonteItem').each(function () {
                this.disabled = false
            })
            $('#identificadorItem').each(function () {
                this.disabled = false
            })
            $('#combustivelSelect').each(function () {
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

        const isValid = validateEdit()

        if (isValid) {

            const emissoes = calc(
                props.fatoresEmissao,
                props.data.anoInventario,
                editPeriodoConsumo,
                editConsumoAnual,
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
                editConsumoDez
            )

            const newList = list

            newList[index].identificador = editIdentificador
            newList[index].descricaoFonte = editdescricaoFonte
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

        } else {
            return
        }
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
        props.forceUpdate()
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

                <table className="table table-striped  table-sm fadeItem">
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
                            <th className="text-center akvo-text-escopo2">C??digo</th>
                            <th className="text-center akvo-text-escopo2">Identificador</th>
                            <th className="text-center akvo-text-escopo2">Descri????o da fonte</th>
                            <th className="text-center akvo-text-escopo2">Per??odo de consumo</th>
                            <th className="text-center akvo-text-escopo2 fadeItem">Consumo anual</th>
                            <th className="text-center akvo-text-escopo2"></th>
                        </tr>
                    </thead>
                    <tbody className="escopo2_bg">
                        <tr>
                            <td></td>
                            <td className="text-center text-light ">
                                {code}
                            </td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                    id="identificadorItem"
                                    value={identificador}
                                    onChange={e => setIdentificador(e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="form-control form-control-sm"
                                    id="descricaoFonteItem"
                                    value={descricaoFonte}
                                    onChange={e => setDescricaoFonte(e.target.value)} />
                            </td>
                            <td>
                                <select name="periodoConsumo" id="periodoConsumoSelect"
                                    className="form-select form-select-sm"
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
                                    <span className="input-group-text" id='unidadeItem'>MWh</span>
                                </div>
                            </td>
                            <td className="text-center">
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

                            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
                            var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                                return new bootstrap.Popover(popoverTriggerEl)
                            })

                            if (elem.fonteEmissao === "Energia el??trica - Sem escolha de compra" &&
                                elem.tipoEmissao === "Sistema Interligado Nacional (SIN)" &&
                                elem.anoInventario === props.data.anoInventario &&
                                elem.unid_id === props.data.unid_id) {
                                return (
                                    <>
                                        {editElementIndex === index ?
                                            <>
                                                <tr key={`edit${index}`}>
                                                    <td scopo="row"></td>
                                                    <td scopo="row" className="mt-1">
                                                        {elem.code}
                                                    </td>
                                                    <td scopo="row">
                                                        <input className="form-control form-control-sm" type="text" value={editIdentificador} onChange={e => setEditIdentificador(e.target.value)} />
                                                    </td>
                                                    <td scopo="row">
                                                        <input className="form-control form-control-sm" type="text" value={editdescricaoFonte} onChange={e => setEditDescricaoFonte(e.target.value)} />
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
                                                            <span className="input-group-text">MWh</span>
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
                                                                <FontAwesomeIcon icon={faXmark} />
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
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input listElement" id={elem.code} value={elem.code} onChange={e => deleteItemSelect(e.target.checked, e.target.value)} />
                                                        <label className="form-check-label"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <small>{elem.code}</small>
                                                </td>
                                                <td>
                                                    {elem.identificador}
                                                </td>
                                                <td>
                                                    {elem.descricaoFonte}
                                                </td>
                                                <td>
                                                    {elem.periodoConsumo.charAt(0).toUpperCase() + elem.periodoConsumo.slice(1)}
                                                </td>
                                                <td>
                                                    {elem.consumoAnual} MWh
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
                                                                        <h5 className="h5_modal" id="exampleModalLabel">Comentar o registro {commentElemCode} </h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditComentario(null)}>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <textarea rows="3" type="text" className="form-control"
                                                                            value={editComentario}
                                                                            onChange={e => setEditComentario(e.target.value)} />
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-outline-success" onClick={() => handleComentario(commentElemIndex)} data-bs-dismiss="modal">
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
        </div >
    )
}