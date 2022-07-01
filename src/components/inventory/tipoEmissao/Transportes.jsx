import { useEffect } from "react"
import { useSelector } from "react-redux";

export default function TransporteTranspDist(props) {

    const list = useSelector(state => state.inventoryList)

    useEffect(() => {
        activeButtons()

    }, [props.tipoEmissao,])

    const activeButtons = () => {
        const elements = document.getElementsByClassName("transportes")

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                elements[i].classList.remove("active")
            }
        }

        if (props.tipoEmissao === "Transporte Rodoviário" ||
            props.tipoEmissao === "Transporte Ferroviário" ||
            props.tipoEmissao === "Transporte Hidroviário" ||
            props.tipoEmissao === "Transporte Aéreo") {
            // console.log("tipoEmissao", props.tipoEmissao)

            document.getElementById(`${props.tipoEmissao}`).classList.add("active")
        } else {

            return
        }
    }

    const showQtd = (value) => {

        let transporteQtd = list.filter(elem => elem.tipoEmissao === value)
            .filter(elem => elem.unid_id === props.unid_id)
            .filter(elem => elem.anoInventario === props.anoInventario)
            .filter(elem => elem.fonteEmissao === props.fonteEmissao)

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
                            onClick={e => { props.setTipoEmissao(e.target.value) }}>
                            Transporte Rodoviário <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Rodoviário")}</span>
                        </button>
                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Ferroviário"
                            value="Transporte Ferroviário"
                            onClick={e => { props.setTipoEmissao(e.target.value) }}>
                            Transporte Ferroviário <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Ferroviário")}</span>
                        </button>
                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Hidroviário"
                            value="Transporte Hidroviário"
                            onClick={e => { props.setTipoEmissao(e.target.value) }}>
                            Transporte Hidroviário <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Hidroviário")}</span>
                        </button>
                        <button type="button"
                            className="transportes btn btn-outline-escopo1 invetoryBtnFont"
                            id="Transporte Aéreo"
                            value="Transporte Aéreo"
                            onClick={e => { props.setTipoEmissao(e.target.value) }}>
                            Transporte Aéreo <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Transporte Aéreo")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}