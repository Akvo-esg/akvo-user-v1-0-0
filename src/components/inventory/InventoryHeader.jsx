import scrollDown from "../../../utils/scrollDown"
import { useSelector, useDispatch } from "react-redux";
import { unid_idStore, unidNameStore, setorPrimarioStore, anoInventarioStore, escopoStore, fonteEmissaoStore } from "../../../store/InventoryStates/InventoryStates.actions"

export default function InventoryHeader(props) {

    const states = useSelector(state => state.inventoryStates)
    const dispatch = useDispatch()

    const showElement = (unid_id, unidName, setorPrimario, anoInventario, escopo, fonteEmissao) => {
        dispatch(unid_idStore(unid_id))
        dispatch(unidNameStore(unidName))
        dispatch(setorPrimarioStore(setorPrimario))
        dispatch(anoInventarioStore(anoInventario))
        dispatch(escopoStore(escopo))
        dispatch(fonteEmissaoStore(fonteEmissao))
    }

    return (
        <>
            {states.unid_id && (

                <div className="inventoryHeader_content fadeItem shadow" style={{"zIndex": "1001"}}>
                    <div className="row align-items-center">
                        <div className="col-12 d-flex justify-content-center">
                            {states.unidName && (
                                <>
                                    <p className="p text-light mx-2 fadeItem"></p>
                                    <a type="button"
                                        className="p text-light mx-2 fadeItem inventoryHeaderTopics"
                                        onClick={() => { showElement(states.unid_id, states.unidName, states.setorPrimario, '', '', ''), scrollDown("passo1") }}
                                    >{states.unidName}</a>
                                </>
                            )}

                            {states.anoInventario && (
                                <>
                                    <p className="p text-light mx-2 fadeItem">/</p>
                                    <a type="button"
                                        className="p text-light mx-2 fadeItem inventoryHeaderTopics"
                                        onClick={() => { showElement(states.unid_id, states.unidName, states.setorPrimario, states.anoInventario, '', ''), scrollDown("passo1") }}
                                    >{states.anoInventario}</a>
                                </>
                            )}

                            {states.unidName && states.escopo && (
                                <>
                                    <p className="p text-light mx-2 fadeItem">/</p>
                                    <a type="button"
                                        className="p text-light mx-2 fadeItem inventoryHeaderTopics"
                                        onClick={() => { showElement(states.unid_id, states.unidName, states.setorPrimario, states.anoInventario, states.escopo, ''), scrollDown("passo2") }}
                                    >
                                        {states.escopo === "escopo1" ? "Escopo 1" : states.escopo === "escopo2" ? "Escopo 2" : "Escopo 3"}
                                    </a>
                                </>
                            )}

                            {states.unidName && states.escopo && states.fonteEmissao && (
                                <>
                                    <p className="p text-light mx-2 fadeItem">/</p>
                                    <a type="button"
                                        className="p text-light mx-2 fadeItem inventoryHeaderTopics"
                                        onClick={() => { showElement(states.unid_id, states.unidName, states.setorPrimario, states.anoInventario, states.escopo, states.fonteEmissao), scrollDown("passo3") }}
                                    >{states.fonteEmissao}</a>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}