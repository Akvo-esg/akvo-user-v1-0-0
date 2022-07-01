import { useEffect, useState } from "react"
import scrollDown from "../../../utils/scrollDown"
import { useSelector, useDispatch } from "react-redux";
import { fonteEmissaoStore } from "../../../store/InventoryStates/InventoryStates.actions";


export default function FontesEmissoes(props) {

    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const dispatch = useDispatch()

    useEffect(() => {

        const elements = document.getElementsByClassName("fonteEmissao")

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                elements[i].classList.remove("active")
            }
        }

        if (states.fonteEmissao) {
            document.getElementById(`${states.fonteEmissao}`).classList.add("active")
        } else {
            return
        }


    }, [states.fonteEmissao])


    const showQtd = (value) => {

        let fonteEmissaoQtd = []

        fonteEmissaoQtd = list.filter(elem => elem.fonteEmissao === value)

        fonteEmissaoQtd = fonteEmissaoQtd.filter(elem => elem.anoInventario === states.anoInventario)

        fonteEmissaoQtd = fonteEmissaoQtd.filter(elem => elem.unid_id === states.unid_id)

        return fonteEmissaoQtd.length > 0 ? fonteEmissaoQtd.length : ''
    }



    return (
        <>
            {states.escopo === "escopo1" && (
                <div className="btn-group btn-group-sm fadeItem" role="group" >
                    <button type="button"
                        className="fonteEmissao btn btn-outline-escopo1 invetoryBtnFont"
                        id="Fontes Estacionárias de Combustão"
                        value="Fontes Estacionárias de Combustão"
                        onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                        Fontes Estacionárias de Combustão <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Fontes Estacionárias de Combustão")}</span>
                    </button>
                    <button type="button"
                        className="fonteEmissao btn btn-outline-escopo1 invetoryBtnFont"
                        id="Transportes"
                        value="Transportes"
                        onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                        Transportes <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transportes")}</span>
                    </button>
                    <button type="button"
                        className="fonteEmissao btn btn-outline-escopo1 invetoryBtnFont"
                        id="Emissões Fugitivas"
                        value="Emissões Fugitivas"
                        onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                        Emissões Fugitivas <span className="badge akvo-bg-primary  badge-light fadeItem fadeItem">{showQtd("Emissões Fugitivas")}</span>
                    </button>
                    <button type="button"
                        className="fonteEmissao btn btn-outline-escopo1 invetoryBtnFont"
                        id="Processos de Transformação"
                        value="Processos de Transformação"
                        onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                        Processos de Transformação <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Processos de Transformação")}</span>
                    </button>
                    <button type="button"
                        className="fonteEmissao btn btn-outline-escopo1 invetoryBtnFont"
                        id="Tratamento de Resíduos e Efluentes"
                        value="Tratamento de Resíduos e Efluentes"
                        onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                        Tratamento de Resíduos e Efluentes <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Tratamento de Resíduos e Efluentes")}</span>
                    </button>
                </div>
            )
            }
            {
                states.escopo === "escopo2" && (
                    <div className="btn-group btn-group-sm fadeItem" role="group" >
                        <button type="button" className="fonteEmissao btn btn-outline-escopo2 invetoryBtnFont"
                            id="Energia elétrica - Sem escolha de compra"
                            value="Energia elétrica - Sem escolha de compra"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }} >
                            Energia elétrica - Sem escolha de compra <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Energia elétrica - Sem escolha de compra")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo2 invetoryBtnFont"
                            id="Perdas T&D - Sem escolha de compra"
                            value="Perdas T&D - Sem escolha de compra"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }} >
                            Perdas T&D - Sem escolha de compra <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Perdas T&D - Sem escolha de compra")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo2 invetoryBtnFont"
                            id="Compra de energia térmica"
                            value="Compra de energia térmica"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                            Compra de energia térmica <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Compra de energia térmica")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo2 invetoryBtnFont"
                            id="Energia elétrica - Com escolha de compra"
                            value="Energia elétrica - Com escolha de compra"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                            Energia elétrica - Com escolha de compra <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Energia elétrica - Com escolha de compra")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo2 invetoryBtnFont"
                            id="Perdas T&D - Com escolha de compra"
                            value="Perdas T&D - Com escolha de compra"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                            Perdas T&D - Com escolha de compra <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Perdas T&D - Com escolha de compra")}</span>
                        </button>
                    </div>
                )
            }
            {
                states.escopo === "escopo3" && (
                    <div className="btn-group btn-group-sm fadeItem" role="group" >
                        <button type="button" className="fonteEmissao btn btn-outline-escopo3 invetoryBtnFont"
                            id="Transporte e Distribuição"
                            value="Transporte e Distribuição"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }} >
                            Transporte e Distribuição <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte e Distribuição")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo3 invetoryBtnFont"
                            id="Tratamento de Resíduos e Efluentes - Escopo 3"
                            value="Tratamento de Resíduos e Efluentes - Escopo 3"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }} >
                            Tratamento de Resíduos e Efluentes <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Tratamento de Resíduos e Efluentes")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo3 invetoryBtnFont"
                            id="Viagens a Negócios"
                            value="Viagens a Negócios"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                            Viagens a Negócios <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Viagens a Negócios")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo3 invetoryBtnFont"
                            id="Deslocamento de Colaboradores"
                            value="Deslocamento de Colaboradores"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                            Deslocamento de Colaboradores <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Deslocamento de Colaboradores")}</span>
                        </button>
                        <button type="button" className="fonteEmissao btn btn-outline-escopo3 invetoryBtnFont"
                            id="Outras Emissões"
                            value="Outras Emissões"
                            onClick={e => { dispatch(fonteEmissaoStore(e.target.value)); scrollDown("passo4") }}>
                            Outras Emissões <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Outras Emissões")}</span>
                        </button>
                    </div>
                )
            }
        </>
    )
}