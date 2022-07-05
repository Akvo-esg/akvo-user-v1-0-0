import { useEffect, useState } from "react"
import scrollDown from "../../../../utils/scrollDown"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
if (typeof window !== "undefined") {
    const bootstrap = require("bootstrap");
}
import { useSelector, useDispatch } from "react-redux";
import { add, addMany, update, remove, removeMany } from '../../../../store/InventoryList/InventoryList.actions'
import inventoryCode from "../../../../utils/inventoryCode"
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'


export default function TransporteRodoviario(props) {

    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

    //List items
    const [code, setCode] = useState('')

    //Error elements
    const [excelError, setExcelError] = useState('')

    useEffect(() => {
        handleCode()
    }, [, list, states.inventario])

    useEffect(() => {
        activeButtons()
    }, [states.transporte])
    useEffect(() => {

        activeTipoButtons()

    }, [states.tipoCalculo])

    const activeButtons = () => {

        const elements = document.getElementsByClassName("transporteRodoviario")

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                elements[i].classList.remove("active")
            }
        }

        if (states.tipoEmissao) {
            document.getElementById(`${states.tipoEmissao}`).classList.add("active")
        } else {
            return
        }
    }
    const activeTipoButtons = () => {

        const tipoCalculoElem = document.getElementsByClassName("transporteRodoviario")


        for (let i = 0; i < tipoCalculoElem.length; i++) {
            if (tipoCalculoElem[i].classList.contains("active")) {
                tipoCalculoElem[i].classList.remove("active")
            }
        }

        if (states.tipoCalculo === "Por tipo e ano de fabricacao" ||
            states.tipoCalculo === "Por tipo de combustivel" ||
            states.tipoCalculo === "Por distancia") {
            document.getElementById(`${states.tipoCalculo}`).classList.add("active")
        } else {
            return
        }
    }

    const showQtd = (value) => {

        let transporteQtd = []

        transporteQtd = list.filter(elem => elem.tipoCalculo === value && elem.fonteEmissao === "Transportes")

        transporteQtd = transporteQtd.filter(elem => elem.anoInventario === states.anoInventario)

        transporteQtd = transporteQtd.filter(elem => elem.unid_id === states.unid_id)

        return transporteQtd.length > 0 ? transporteQtd.length : ''
    }

    const showTipoCalculoQtd = (value) => {

        let transporteQtd = []

        transporteQtd = list.filter(elem => elem.transporte === 'Transporte rodoviário')

        transporteQtd = transporteQtd.filter(elem => elem.anoInventario === states.anoInventario)

        transporteQtd = transporteQtd.filter(elem => elem.unid_id === states.unid_id)

        transporteQtd = transporteQtd.filter(elem => elem.tipoCalculo === value)

        return transporteQtd.length > 0 ? transporteQtd.length : ''
    }


    const handleCode = (oldCode) => {
        const code = inventoryCode(list, states.inventario, states.fonteEmissao, "TRN", oldCode)
        setCode(code)
        return code
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

            if (wb.Sheets.porTipo) {

                for (let i = 7; i < 1000; i++) {

                    const descricaoItem = `B${i}` in wb.Sheets.porTipo ? eval(`wb.Sheets.porTipo.B${i}.v`) : ''

                    if (descricaoItem) {

                        const qtdItemExists = `E${i}` || `F${i}` || `G${i}` || `H${i}` || `I${i}` || `J${i}` || `K${i}` || `L${i}` || `M${i}` || `N${i}` || `O${i}` || `P${i}` || `Q${i}` in wb.Sheets.porTipo
                        const tipoFrotaExists = `S${i}` in wb.Sheets.porTipo

                        if (qtdItemExists && tipoFrotaExists) {

                            const qtdJan = `G${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.G${i}.w`)) : 0
                            const qtdFev = `E${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.E${i}.w`)) : 0
                            const qtdMar = `F${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.F${i}.w`)) : 0
                            const qtdAbr = `H${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.H${i}.w`)) : 0
                            const qtdMai = `I${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.I${i}.w`)) : 0
                            const qtdJun = `J${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.J${i}.w`)) : 0
                            const qtdJul = `K${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.K${i}.w`)) : 0
                            const qtdAgo = `L${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.L${i}.w`)) : 0
                            const qtdSet = `M${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.M${i}.w`)) : 0
                            const qtdOut = `N${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.N${i}.w`)) : 0
                            const qtdNov = `O${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.O${i}.w`)) : 0
                            const qtdDez = `P${i}` in wb.Sheets.porTipo ? Number(eval(`wb.Sheets.porTipo.P${i}.w`)) : 0

                            const identificadorItem = `A${i}` in wb.Sheets.porTipo ? eval(`wb.Sheets.porTipo.A${i}.v`) : ''
                            const qtdItem = `Q${i}` in wb.Sheets.porTipo ? eval(`wb.Sheets.porTipo.Q${i}.w`) : (qtdJan + qtdFev + qtdMar + qtdAbr + qtdMai + qtdJun + qtdJul + qtdAgo + qtdSet + qtdOut + qtdNov + qtdDez)
                            const frotaItem = `S${i}` in wb.Sheets.porTipo ? multiplosValoresTable(eval(`wb.Sheets.porTipo.S${i}.v`)) : ''
                            const anoFrotaItem = `D${i}` in wb.Sheets.porTipo ? eval(`wb.Sheets.porTipo.D${i}.v`) : ''
                            const comentarioItem = `R${i}` in wb.Sheets.porTipo ? eval(`wb.Sheets.porTipo.R${i}.v`) : ''

                            const emissoes = calcPorTipo(frotaItem[0], anoFrotaItem, qtdItem, states.fonteEmissao, fatoresEmissao, 'Por tipo e ano de fabricacao')

                            const data = {
                                company_id: token.company_id,
                                unid_id: states.unid_id,
                                unidSetorPrimario: states.unidSetorPrimario,
                                unidName: states.unidName,
                                anoInventario: states.anoInventario,
                                escopo: states.escopo,
                                fonteEmissao: states.fonteEmissao,
                                transporte: states.transporte,
                                tipoCalculo: "Por tipo e ano de fabricacao",
                                comentario: comentarioItem,
                                code: newCode,
                                identificador: identificadorItem,
                                descricaoFrota: descricaoItem,
                                tipoFrotaId: frotaItem[0],
                                tipoFrotaName: frotaItem[1],
                                unidade: frotaItem[2],
                                anoFrota: anoFrotaItem,
                                periodoConsumo: `Q${i}` in wb.Sheets.porTipo ? 'anual' : 'mensal',
                                consumoAnual: qtdItem,
                                consumoMar: qtdJan,
                                consumoJan: qtdFev,
                                consumoFev: qtdMar,
                                consumoAbr: qtdAbr,
                                consumoMai: qtdMai,
                                consumoJun: qtdJun,
                                consumoJul: qtdJul,
                                consumoAgo: qtdAgo,
                                consumoSet: qtdSet,
                                consumoOut: qtdOut,
                                consumoNov: qtdNov,
                                consumoDez: qtdDez,
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
                            newCode = handleCode(data.code)
                        } else {
                            setExcelError(`Item "${descricaoItem}" preenchido incorretamente`)
                            document.getElementById("inputExcel").value = null
                            newList = []
                            return
                        }
                    }
                }
            }
            if (wb.Sheets.porCombustivel) {


                for (let i = 7; i < 1000; i++) {

                    const descricaoItem = `B${i}` in wb.Sheets.porCombustivel ? eval(`wb.Sheets.porCombustivel.B${i}.v`) : ''

                    if (descricaoItem) {

                        const qtdItemExists = `D${i}` || `E${i}` || `F${i}` || `G${i}` || `H${i}` || `I${i}` || `J${i}` || `K${i}` || `L${i}` || `M${i}` || `N${i}` || `O${i}` || `P${i}` in wb.Sheets.porCombustivel
                        const tipoCombustivelExists = `R${i}` in wb.Sheets.porCombustivel

                        if (qtdItemExists && tipoCombustivelExists) {

                            const qtdJan2 = `D${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.D${i}.w`)) : 0
                            const qtdFev2 = `E${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.E${i}.w`)) : 0
                            const qtdMar2 = `F${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.F${i}.w`)) : 0
                            const qtdAbr2 = `G${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.G${i}.w`)) : 0
                            const qtdMai2 = `H${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.H${i}.w`)) : 0
                            const qtdJun2 = `I${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.I${i}.w`)) : 0
                            const qtdJul2 = `J${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.J${i}.w`)) : 0
                            const qtdAgo2 = `K${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.K${i}.w`)) : 0
                            const qtdSet2 = `L${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.L${i}.w`)) : 0
                            const qtdOut2 = `M${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.M${i}.w`)) : 0
                            const qtdNov2 = `N${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.N${i}.w`)) : 0
                            const qtdDez2 = `O${i}` in wb.Sheets.porCombustivel ? Number(eval(`wb.Sheets.porCombustivel.O${i}.w`)) : 0

                            const identificadorItem = `A${i}` in wb.Sheets.porCombustivel ? eval(`wb.Sheets.porCombustivel.A${i}.v`) : ''
                            const qtdItem2 = `P${i}` in wb.Sheets.porCombustivel ? eval(`wb.Sheets.porCombustivel.P${i}.w`) : (qtdJan2 + qtdFev2 + qtdMar2 + qtdAbr2 + qtdMai2 + qtdJun2 + qtdJul2 + qtdAgo2 + qtdSet2 + qtdOut2 + qtdNov2 + qtdDez2)
                            const combustivelItem = `R${i}` in wb.Sheets.porCombustivel ? multiplosValoresTable(eval(`wb.Sheets.porCombustivel.R${i}.v`)) : ''
                            const comentarioItem = `Q${i}` in wb.Sheets.porCombustivel ? eval(`wb.Sheets.porCombustivel.Q${i}.v`) : ''

                            const emissoes = calcPorCombustivel(combustivelItem[0], qtdItem2, states.fonteEmissao, states.fatoresEmissao, 'Por tipo de combustivel')

                            const data = {
                                company_id: token.company_id,
                                unid_id: states.unid_id,
                                unidSetorPrimario: states.unidSetorPrimario,
                                unidName: states.unidName,
                                anoInventario: states.anoInventario,
                                escopo: states.escopo,
                                fonteEmissao: states.fonteEmissao,
                                transporte: states.transporte,
                                tipoCalculo: 'Por tipo de combustivel',
                                comentario: comentarioItem,
                                code: newCode,
                                identificador: identificadorItem,
                                descricaoFrota: descricaoItem,
                                combustivelId: combustivelItem[0],
                                combustivelName: combustivelItem[1],
                                unidade: combustivelItem[2],
                                periodoConsumo: `P${i}` in wb.Sheets.porCombustivel ? 'anual' : 'mensal',
                                consumoAnual: qtdItem2,
                                consumoJan: qtdJan2,
                                consumoFev: qtdFev2,
                                consumoMar: qtdMar2,
                                consumoAbr: qtdAbr2,
                                consumoMai: qtdMai2,
                                consumoJun: qtdJun2,
                                consumoJul: qtdJul2,
                                consumoAgo: qtdAgo2,
                                consumoSet: qtdSet2,
                                consumoOut: qtdOut2,
                                consumoNov: qtdNov2,
                                consumoDez: qtdDez2,
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
                            newCode = handleCode(data.code)
                        } else {
                            setExcelError(`Item "${descricaoItem}" preenchido incorretamente`)
                            document.getElementById("inputExcel").value = null
                            newList = []
                            return
                        }
                    }
                }
            }

            if (wb.Sheets.porDistancia) {

                for (let i = 7; i < 1000; i++) {

                    const descricaoItem = `B${i}` in wb.Sheets.porDistancia ? eval(`wb.Sheets.porDistancia.B${i}.v`) : ''

                    if (descricaoItem) {

                        const qtdItemExists = `E${i}` || `F${i}` || `G${i}` || `H${i}` || `I${i}` || `J${i}` || `K${i}` || `L${i}` || `M${i}` || `N${i}` || `O${i}` || `P${i}` || `Q${i}` in wb.Sheets.porDistancia
                        const tipoCombustivelExists = `S${i}` in wb.Sheets.porDistancia

                        if (qtdItemExists && tipoCombustivelExists) {

                            const qtdJan3 = `E${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.E${i}.w`)) : 0
                            const qtdFev3 = `F${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.F${i}.w`)) : 0
                            const qtdMar3 = `G${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.G${i}.w`)) : 0
                            const qtdAbr3 = `H${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.H${i}.w`)) : 0
                            const qtdMai3 = `I${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.I${i}.w`)) : 0
                            const qtdJun3 = `J${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.J${i}.w`)) : 0
                            const qtdJul3 = `K${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.K${i}.w`)) : 0
                            const qtdAgo3 = `L${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.L${i}.w`)) : 0
                            const qtdSet3 = `M${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.M${i}.w`)) : 0
                            const qtdOut3 = `N${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.N${i}.w`)) : 0
                            const qtdNov3 = `O${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.O${i}.w`)) : 0
                            const qtdDez3 = `P${i}` in wb.Sheets.porDistancia ? Number(eval(`wb.Sheets.porDistancia.P${i}.w`)) : 0

                            const identificadorItem = `A${i}` in wb.Sheets.porDistancia ? eval(`wb.Sheets.porDistancia.A${i}.v`) : ''
                            const qtdItem3 = `Q${i}` in wb.Sheets.porDistancia ? eval(`wb.Sheets.porDistancia.Q${i}.w`) : (qtdJan3 + qtdFev3 + qtdMar3 + qtdAbr3 + qtdMai3 + qtdJun3 + qtdJul3 + qtdAgo3 + qtdSet3 + qtdOut3 + qtdNov3 + qtdDez3)
                            const tipoFrotaItem = `S${i}` in wb.Sheets.porDistancia ? multiplosValoresTable(eval(`wb.Sheets.porDistancia.S${i}.v`)) : ''
                            const anoFrotaItem = `D${i}` in wb.Sheets.porDistancia ? eval(`wb.Sheets.porDistancia.D${i}.w`) : ''
                            const comentarioItem = `R${i}` in wb.Sheets.porDistancia ? eval(`wb.Sheets.porDistancia.R${i}.v`) : ''

                            const emissoes = calcPorDistancia(tipoFrotaItem[0], anoFrotaItem, qtdItem3, states.fonteEmissao, fatoresEmissao, 'Por distancia')

                            const data = {
                                company_id: token.company_id,
                                unid_id: states.unid_id,
                                unidSetorPrimario: states.unidSetorPrimario,
                                unidName: states.unidName,
                                anoInventario: states.anoInventario,
                                escopo: states.escopo,
                                fonteEmissao: states.fonteEmissao,
                                transporte: states.transporte,
                                tipoCalculo: 'Por distancia',
                                comentario: comentarioItem,
                                code: newCode,
                                identificador: identificadorItem,
                                descricaoFrota: descricaoItem,
                                tipoFrotaId: tipoFrotaItem[0],
                                tipoFrotaName: tipoFrotaItem[1],
                                unidade: tipoFrotaItem[2],
                                anoFrota: anoFrotaItem,
                                periodoConsumo: `Q${i}` in wb.Sheets.porDistancia ? 'anual' : 'mensal',
                                consumoAnual: qtdItem3,
                                consumoJan: qtdJan3,
                                consumoFev: qtdFev3,
                                consumoMar: qtdMar3,
                                consumoAbr: qtdAbr3,
                                consumoMai: qtdMai3,
                                consumoJun: qtdJun3,
                                consumoJul: qtdJul3,
                                consumoAgo: qtdAgo3,
                                consumoSet: qtdSet3,
                                consumoOut: qtdOut3,
                                consumoNov: qtdNov3,
                                consumoDez: qtdDez3,
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
                            newCode = handleCode(data.code)
                        } else {
                            setExcelError(`Item "${descricaoItem}" preenchido incorretamente`)
                            document.getElementById("inputExcel").value = null
                            newList = []
                            return
                        }
                    }
                }
            }

            else {
                setExcelError(`Planilha não compatível.`)
                return
            }

            dispatch(addMany(list, newList))
            document.getElementById("inputExcel").value = null
        }
    }

    const multiplosValoresTable = (elem) => {
        const array = elem.split(",")
        return array
    }


    return (

        <div className="col-12 fadeItem mt-3">


            <div className="d-inline-flex mb-3">
                <div className="col">
                    <p className='akvo_form_label mb-3 passo4Text'>Adicione os dados referentes à fonte de emissão. Os dados podem ser adicionados de duas maneiras: utilizando os tipos de cálculos abaixo ou importando um arquivo previamente preenchido.
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
            <div className="row mb-3">
                <div className="d-inline-flex mb-2">
                    <div className="col">
                        <p className='akvo_form_label passo4Text'>Escolha o tipo de cálculo</p>
                    </div>
                </div>
                <div className="col-12 d-flex">
                    <div className="btn-group btn-group-sm fadeItem" role="group" >
                        <button type="button"
                            className="transporteRodoviario btn btn-outline-escopo1 invetoryBtnFont"
                            id="Por tipo e ano de fabricacao"
                            value="Por tipo e ano de fabricacao"
                            onClick={e => { props.setTipoCalculo(e.target.value); scrollDown("passo5") }}>
                            Cálculo de emissões por tipo e ano de fabricação da frota de veículos no ano de {states.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por tipo e ano de fabricacao")}</span>
                        </button>
                        <button type="button"
                            className="transporteRodoviario btn btn-outline-escopo1 invetoryBtnFont"
                            id="Por tipo de combustivel"
                            value="Por tipo de combustivel"
                            onClick={e => { props.setTipoCalculo(e.target.value); scrollDown("passo5") }}>
                            Cálculo de emissões por tipo de combustível no ano de {states.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por tipo de combustivel")}</span>
                        </button>
                        <button type="button"
                            className="transporteRodoviario btn btn-outline-escopo1 invetoryBtnFont"
                            id="Por distancia e peso da carga"
                            value="Por distancia e peso da carga"
                            onClick={e => { props.setTipoCalculo(e.target.value); scrollDown("passo5") }}>
                            Cálculo de emissões por distância percorrida no ano de {states.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por distancia")}</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}