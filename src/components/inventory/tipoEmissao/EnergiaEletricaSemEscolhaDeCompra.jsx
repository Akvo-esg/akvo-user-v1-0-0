import { useEffect } from "react"
import { useSelector } from "react-redux";

export default function EnergiaEletricaSemEscolhaDeCompra(props) {

    const list = useSelector(state => state.inventoryList)

    useEffect(() => {
        activeButtons()

    }, [props.tipoEmissao])

    const activeButtons = () => {
        const elements = document.getElementsByClassName("energiaEletrica")

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                elements[i].classList.remove("active")
            }
        }

        if (props.tipoEmissao === "Sistema Interligado Nacional (SIN)" || props.tipoEmissao === "Sistema Isolado do Amazonas") {

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
            <div className="d-inline-flex mb-3">
                <div className="col">
                    <p className='akvo_form_label passo4Text'>Escolha o sistema de emissão</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-8 d-flex">
                    <div className="btn-group btn-group-sm fadeItem" role="group" >
                        <button type="button"
                            className="energiaEletrica btn btn-outline-escopo2 invetoryBtnFont"
                            id="Sistema Interligado Nacional (SIN)"
                            value="Sistema Interligado Nacional (SIN)"
                            onClick={e => { props.setTipoEmissao(e.target.value)}}>
                            Sistema Interligado Nacional (SIN) <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Sistema Interligado Nacional (SIN)")}</span>
                        </button>
                        <button type="button"
                            className="energiaEletrica btn btn-outline-escopo2 invetoryBtnFont"
                            id="Sistema Isolado do Amazonas"
                            value="Sistema Isolado do Amazonas"
                            onClick={e => { props.setTipoEmissao(e.target.value)}}>
                            Sistema Isolado do Amazonas <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Sistema Isolado do Amazonas")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}