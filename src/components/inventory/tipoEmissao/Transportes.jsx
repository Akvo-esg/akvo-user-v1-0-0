import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { tipoCalculoStore } from "../../../../store/InventoryStates/InventoryStates.actions";

export default function Transporte() {
    
    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)


    useEffect(() => {
        activeButtons()

    }, [states.tipoEmissao,])

    const activeButtons = () => {
        const elements = document.getElementsByClassName("transportes")

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                elements[i].classList.remove("active")
            }
        }

        if (states.tipoEmissao === "Transporte Rodoviário" ||
            states.tipoEmissao === "Transporte Ferroviário" ||
            states.tipoEmissao === "Transporte Hidroviário" ||
            states.tipoEmissao === "Transporte Aéreo") {

            document.getElementById(`${states.tipoEmissao}`).classList.add("active")
        } else {

            return
        }
    }

    const showQtd = (value) => {

        let transporteQtd = list.filter(elem => elem.tipoEmissao === value)
            .filter(elem => elem.unid_id === states.unid_id)
            .filter(elem => elem.anoInventario === states.anoInventario)
            .filter(elem => elem.fonteEmissao === states.fonteEmissao)

        return transporteQtd.length > 0 ? transporteQtd.length : ''

    }

    return (
        <div className="col-12 fadeItem mt-3">
            <div className="d-inline-flex mb-2">
                <div className="col">
                    <p className='akvo_form_label passo4Text'>Escolha o tipo de transporte</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-8 d-flex">
                    <div className="btn-group btn-group-sm fadeItem" role="group" >

                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Rodoviário"
                            value="Transporte Rodoviário"
                            onClick={e => { dispatch(tipoCalculoStore(e.target.value)) }}>
                            Transporte Rodoviário <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Rodoviário")}</span>
                        </button>
                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Ferroviário"
                            value="Transporte Ferroviário"
                            onClick={e => { dispatch(tipoCalculoStore(e.target.value)) }}>
                            Transporte Ferroviário <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Ferroviário")}</span>
                        </button>
                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Hidroviário"
                            value="Transporte Hidroviário"
                            onClick={e => { dispatch(tipoCalculoStore(e.target.value)) }}>
                            Transporte Hidroviário <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Hidroviário")}</span>
                        </button>
                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Aéreo"
                            value="Transporte Aéreo"
                            onClick={e => { dispatch(tipoCalculoStore(e.target.value)) }}>
                            Transporte Aéreo <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Aéreo")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}