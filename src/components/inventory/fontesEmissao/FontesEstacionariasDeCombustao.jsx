import { useEffect, useState } from "react"
import $ from "jquery"
import { calc } from '../../../../utils/equations/fontesEstacionariasDeCombustao'
import CombustiveisList from "../combustiveis/CombustiveisFontesEstacionarias"
import XLSX from 'xlsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faComment,
    faDownload,
    faEraser,
    faPenToSquare,
    faSave,
    faTimes,
    faTrashAlt,
    faUpload,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { add, addMany, update, remove, removeMany } from '../../../../store/InventoryList/InventoryList.actions'
import inventoryCode from "../../../../utils/inventoryCode"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function FontesEstacionariasDeCombustao(props) {

    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

    //List Items
    const [identificador, setIdentificador] = useState('')
    const [descricaoFonte, setDescricaoFonte] = useState('')
    const [qtd, setQtd] = useState('')
    const [code, setCode] = useState('')

    //Combustivel items
    const [combustivel, setCombustivel] = useState('')
    const [unidade, setUnidade] = useState('')
    const [combustivelName, setCombustivelName] = useState('')

    //Edit items
    const [editElement, setEditElement] = useState(false)
    const [editDescricaoFonte, setEditDescricaoFonte] = useState('')
    const [editIdentificador, setEditIdentificador] = useState('')
    const [editCombustivel, setEditCombustivel] = useState('')
    const [editCombustivelName, setEditCombustivelName] = useState('')
    const [editQtd, setEditQtd] = useState('')
    const [editUnidade, setEditUnidade] = useState('')
    const [deleteElemCode, setDeleteElemCode] = useState('')
    const [commentElemCode, setCommentElemCode] = useState('')
    const [commentElemIndex, setCommentElemIndex] = useState('')
    const [editComentario, setEditComentario] = useState('')
    const [deleteManyArray, setDeleteManyArray] = useState([])

    //Error items
    const [excelError, setExcelError] = useState('')

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


    const handleCode = (oldCode) => {
        const code = inventoryCode(list, inventory, states.fonteEmissao, "FEC", oldCode)
        setCode(code)
        return code
    }

    const multiplosValores = (elem) => {
        const array = elem.split(",")
        setCombustivel(array[0])
        setUnidade(array[1])
        setCombustivelName(array[2])
    }

    const handleSubmit = () => {

        const isValid = validate()

        if (isValid) {
            const emissoes = calc(combustivel, qtd, states.unidSetorPrimario, states.fonteEmissao, fatoresEmissao)

            const data = {
                company_id: token.company_id,
                unid_id: states.unid_id,
                unidSetorPrimario: states.unidSetorPrimario,
                unidName: states.unidName,
                anoInventario: states.anoInventario,
                escopo: states.escopo,
                fonteEmissao: states.fonteEmissao,
                comentario: '',
                code,
                identificador,
                descricaoFonte,
                qtd,
                combustivel,
                unidade,
                combustivelName,
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
            setCombustivel('')
            setCombustivelName('')
            setQtd('')
            setUnidade('')
            $('#combustivelSelect').each(function () {
                this.value = ''
            })
            handleCode(data.code)
        } else {
            return
        }

    }

    const validate = () => {
        if (descricaoFonte && combustivel && qtd > 0) {
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
        setEditElement(index)
        setEditIdentificador(elem.identificador)
        setEditDescricaoFonte(elem.descricaoFonte)
        setEditCombustivel(elem.combustivel)
        setEditCombustivelName(elem.combustivelName)
        setEditQtd(elem.qtd)
        setEditUnidade(elem.unidade)
        $('#combustivelSelect').each(function () {
            this.value = `${elem.combustivelName},${elem.unidade},${elem.combustivelName}`
            this.disabled = true
        })
        $('#descricaoFonteItem').each(function () {
            this.disabled = true
        })
        $('#identificadorItem').each(function () {
            this.disabled = true
        })
        $('#qtdItem').each(function () {
            this.disabled = true
        })
        $('#unidadeItem').each(function () {
            this.innerHTML = '-'
        })
        $('.listElement').each(function () {
            this.disabled = true
        })
    }

    const cancel = () => {
        setTimeout(() => {
            setEditElement(false)
            setEditIdentificador('')
            setEditDescricaoFonte('')
            setEditCombustivel('')
            setEditCombustivelName('')
            setEditUnidade('')
            setEditQtd('')
            $('#identificadorItem').each(function () {
                this.disabled = false
            })
            $('#descricaoFonteItem').each(function () {
                this.disabled = false
            })
            $('#combustivelSelect').each(function () {
                this.disabled = false
            })
            $('#qtdItem').each(function () {
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

            const emissoes = calc(editCombustivel, editQtd, states.unidSetorPrimario, states.fonteEmissao, fatoresEmissao)

            const newList = list

            newList[index].identificador = editIdentificador
            newList[index].descricaoFonte = editDescricaoFonte
            newList[index].combustivel = editCombustivel
            newList[index].combustivelName = editCombustivelName
            newList[index].qtd = editQtd
            newList[index].unidade = editUnidade
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

    const multiplosValoresEdit = (elem) => {
        const array = elem.split(",")
        setEditCombustivel(array[0])
        setEditUnidade(array[1])
        setEditCombustivelName(array[2])
    }

    const validateEdit = () => {
        if (editDescricaoFonte && editCombustivel && editQtd > 0) {
            return true
        } else {
            return false
        }
    }

    const importFile = (e) => {

        setExcelError('')

        var reader = new FileReader()

        reader.readAsArrayBuffer(e.target.files[0])

        reader.onload = function (e) {
            var excelData = new Uint8Array(reader.result)
            var wb = XLSX.read(excelData, { type: 'array' })

            let newList = []
            let newCode = code

            if (wb.Sheets.FEC) {

                for (let i = 4; i < 1000; i++) {

                    const descricaoItem = `B${i}` in wb.Sheets.FEC ? eval(`wb.Sheets.FEC.B${i}.v`) : ''

                    if (descricaoItem) {

                        const qtdItemExists = `D${i}` in wb.Sheets.FEC
                        const combustivelItemExists = `F${i}` in wb.Sheets.FEC

                        if (qtdItemExists && combustivelItemExists) {

                            const identificadorItem = `A${i}` in wb.Sheets.FEC ? eval(`wb.Sheets.FEC.A${i}.v`) : ''
                            const qtdItem = `D${i}` in wb.Sheets.FEC ? eval(`wb.Sheets.FEC.D${i}.w`) : ''
                            const combustivelItem = `G${i}` in wb.Sheets.FEC ? multiplosValoresTable(eval(`wb.Sheets.FEC.G${i}.v`)) : ''
                            const comentarioItem = `F${i}` in wb.Sheets.FEC ? eval(`wb.Sheets.FEC.F${i}.v`) : ''

                            const emissoes = calc(combustivelItem[0], qtdItem, states.unidSetorPrimario, states.fonteEmissao, fatoresEmissao)

                            const data = {
                                company_id: token.company_id,
                                unid_id: states.unid_id,
                                unidSetorPrimario: states.unidSetorPrimario,
                                unidName: states.unidName,
                                anoInventario: states.anoInventario,
                                escopo: states.escopo,
                                fonteEmissao: states.fonteEmissao,
                                comentario: comentarioItem,
                                code: newCode,
                                identificador: identificadorItem,
                                descricaoFonte: descricaoItem,
                                qtd: qtdItem,
                                combustivel: combustivelItem[0],
                                unidade: combustivelItem[1],
                                combustivelName: combustivelItem[2],
                                emissoesCO2_F: emissoes.emissoesCO2_F,
                                emissoesCH4_F: emissoes.emissoesCH4_F,
                                emissoesN2O_F: emissoes.emissoesN2O_F,
                                emissoesCO2_B: emissoes.emissoesCO2_B,
                                emissoesCH4_B: emissoes.emissoesCH4_B,
                                emissoesN2O_B: emissoes.emissoesN2O_B,
                                emissoesTotais: emissoes.emissoesTotais,
                                emissoesBiogenicas: emissoes.emissoesBiogenicas
                            }
                            newList.unshift(data)
                            newCode = handleCode(newCode)
                        } else {
                            setExcelError(`Item "${descricaoItem}" preenchido incorretamente (linha ${i})`)

                            document.getElementById("inputExcel").value = null
                            newList = []
                            return
                        }
                    }
                }
                dispatch(addMany(list, newList))

                document.getElementById("inputExcel").value = null
            } else {
                setExcelError('Planilha não compatível')
                return
            }
        }
    }

    const multiplosValoresTable = (elem) => {
        const array = elem.split(",")
        return array
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
        <div >
            <div className="d-inline-flex mb-3">
                <div className="col">
                    <p className='akvo_form_label mb-3 passo4Text'>Adicione os dados referentes à fonte de emissão. Os dados podem ser adicionados de duas maneiras: utilizando a tabela abaixo ou importando um arquivo previamente preenchido.
                        É importante que o arquivo a ser importado siga os critérios estabelecidos na plataforma. Por isso, caso seja essa a sua opção, faça download do arquivo utilizando o botão ao lado.
                        Faça o preenchimento dos dados e depois retorne à plataforma para fazer a importação.</p>
                </div>
                <div className="downloadTable mb-3 ms-3">
                    <div className="container">
                        <div className="row">
                            <div className="d-flex">
                                <div className="col text-center">
                                    <a type="button" href='FONTES_ESTACIONARIAS_DE_COMBUSTAO.xlsx'>
                                        <FontAwesomeIcon icon={faDownload} className="akvo_form_label fs-3" /><br />
                                        <p className="akvo_form_label">Baixar tabela</p>
                                    </a>
                                </div>
                                <div className="col text-center">
                                    <input type="file" className="custom-file-input" id="inputExcel" hidden onChange={(e) => importFile(e)} />
                                    <span type="button" id="importButton" onClick={() => document.getElementById('inputExcel').click()}>
                                        <FontAwesomeIcon icon={faUpload} className="akvo_form_label fs-3" /><br />
                                        <p className="akvo_form_label">Importar tabela</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <small className="text-danger">{excelError}</small>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <small>

                <table className="table table-striped table-sm fadeItem">
                    <thead>
                        <tr className="py-2">
                            <th scope="col">
                                <div className="form-check pb-0 mb-0">
                                    <input type="checkbox" className="form-check-input listElement" id="customCheck1" value='' onChange={e => handleDeleteMany(e.target.checked)} />
                                    <label className="form-check-label"></label>
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
                            <th className="text-center akvo-text-escopo1">Código</th>
                            <th className="text-center akvo-text-escopo1">Identificador</th>
                            <th className="text-center akvo-text-escopo1">Descrição da fonte</th>
                            <th className="text-center akvo-text-escopo1">Combustível</th>
                            <th className="text-center akvo-text-escopo1">Quantidade</th>
                            <th className="text-center akvo-text-escopo1"></th>
                        </tr>
                    </thead>
                    <tbody className="escopo1_bg">
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
                                <select name="combustivel" id="combustivelSelect"
                                    className="form-select form-select-sm"
                                    onChange={e => multiplosValores(e.target.value)}>
                                    <CombustiveisList />
                                </select>
                            </td>
                            <td>
                                <div className="input-group input-group-sm">
                                    <input type="number" className="form-control form-control-sm" id="qtdItem"
                                        value={qtd}
                                        placeholder="0"
                                        onChange={e => setQtd(e.target.value)} />
                                    <span className="input-group-text" id='unidadeItem'>{unidade ? unidade : "-"}</span>
                                </div>
                            </td>
                            <td className="text-center">
                                <button type="submit" className="btn btn-outline-light btn-sm" onClick={() => handleSubmit()}>Ok</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        {list.map((elem, index) => {
                            if (elem.fonteEmissao === "Fontes Estacionárias de Combustão" &&
                                elem.anoInventario === states.anoInventario &&
                                elem.unid_id === states.unid_id) {
                                return (
                                    <>
                                        {editElement === index ?
                                            <tr key={`edit${index}`}>
                                                <td scopo="row"></td>
                                                <td scopo="row" className="mt-1">
                                                    {elem.code}
                                                </td>
                                                <td scopo="row">
                                                    <input className="form-control form-control-sm" type="text" value={editIdentificador} onChange={e => setEditIdentificador(e.target.value)} />
                                                </td>
                                                <td scopo="row">
                                                    <input className="form-control form-control-sm" type="text" value={editDescricaoFonte} onChange={e => setEditDescricaoFonte(e.target.value)} />
                                                </td>
                                                <td scopo="row">
                                                    <select className="form-select form-select-sm"
                                                        value={`${editCombustivel},${editUnidade},${editCombustivelName}`}
                                                        onChange={e => {
                                                            multiplosValoresEdit(e.target.value)
                                                        }}>
                                                        <CombustiveisList />
                                                    </select>
                                                </td>
                                                <td>
                                                    <div className="input-group input-group-sm">
                                                        <input className="form-control form-control-sm"
                                                            type="number"
                                                            value={editQtd}
                                                            placeholder="0"
                                                            onChange={e => setEditQtd(e.target.value)} />
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
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
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
                                                    {elem.combustivelName}
                                                </td>
                                                <td>
                                                    {elem.qtd} {elem.unidade}
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
                                                                        <button type="button" className="btn btn-outline-warning" onClick={() => setEditComentario('')}>
                                                                            Limpar <FontAwesomeIcon icon={faEraser} />
                                                                        </button>
                                                                        <button type="button" className="btn btn-outline-success" onClick={() => handleComentario(commentElemIndex)} data-bs-dismiss="modal">
                                                                            Salvar <FontAwesomeIcon icon={faSave} />
                                                                        </button>
                                                                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => setEditComentario(null)}>
                                                                            Cancelar <FontAwesomeIcon icon={faTimes} />
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