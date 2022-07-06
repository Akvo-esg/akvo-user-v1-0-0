import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function TransporteRodoviarioTranspDist(props) {

    const dispatch = useDispatch()
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const inventory = useSelector(state => state.inventoryDB)
    const fatoresEmissao = useSelector(state => state.fatoresEmissao)
    const token = jwt.decode(Cookie.get('auth'))

    useEffect(() => {
        activeButtons()

    }, [props.tipoCalculo])

    const activeButtons = () => {
        const elements = document.getElementsByClassName("transporteRodoviarioTranspDist")

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                elements[i].classList.remove("active")
            }
        }

        if (props.tipoCalculo === "Por tipo e ano de fabricacao" ||
            props.tipoCalculo === "Por tipo de combustivel" ||
            props.tipoCalculo === "Por distancia e peso da carga" ||
            props.tipoCalculo === "Por distancia e idade da frota") {

            document.getElementById(`${props.tipoCalculo}`).classList.add("active")
        } else {

            return
        }
    }

    const showQtd = (value) => {

        let transporteQtd = list.filter(elem => elem.tipoCalculo === value)
            .filter(elem => elem.tipoEmissao === props.tipoEmissao)
            .filter(elem => elem.unid_id === props.unid_id)
            .filter(elem => elem.anoInventario === props.anoInventario)
            .filter(elem => elem.fonteEmissao === props.fonteEmissao)

        return transporteQtd.length > 0 ? transporteQtd.length : ''
    }



    return (

        <div className="col-12 fadeItem mt-3">
            <div className="d-inline-flex mb-2">
                <div className="col">
                    <p className='akvo_form_label passo4Text'>Escolha o tipo de cálculo</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 d-flex">
                    <div className="btn-group btn-group-sm fadeItem" role="group" >
                        <button type="button"
                            className="transporteRodoviarioTranspDist btn btn-outline-escopo3 invetoryBtnFont"
                            id="Por tipo e ano de fabricacao"
                            value="Por tipo e ano de fabricacao"
                            onClick={e => { props.setTipoCalculo(e.target.value) }}>
                            Cálculo de emissões por tipo e ano de fabricação da frota de veículos no ano de {props.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por tipo e ano de fabricacao")}</span>
                        </button>
                        <button type="button"
                            className="transporteRodoviarioTranspDist btn btn-outline-escopo3 invetoryBtnFont"
                            id="Por tipo de combustivel"
                            value="Por tipo de combustivel"
                            onClick={e => { props.setTipoCalculo(e.target.value) }}>
                            Cálculo de emissões por tipo de combustível no ano de {props.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por tipo de combustivel")}</span>
                        </button>
                        <button type="button"
                            className="transporteRodoviarioTranspDist btn btn-outline-escopo3 invetoryBtnFont"
                            id="Por distancia e peso da carga"
                            value="Por distancia e peso da carga"
                            onClick={e => { props.setTipoCalculo(e.target.value) }}>
                            Cálculo de emissões por distância percorrida e peso da carga fracionada transportada (caminhões e veículos de carga) no ano de {props.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por distancia e peso da carga")}</span>
                        </button>
                        <button type="button"
                            className="transporteRodoviarioTranspDist btn btn-outline-escopo3 invetoryBtnFont"
                            id="Por distancia e idade da frota"
                            value="Por distancia e idade da frota"
                            onClick={e => { props.setTipoCalculo(e.target.value) }}>
                            Cálculo de emissões por distância percorrida e idade da frota no ano de {props.anoInventario} <span className="badge akvo-bg-primary  badge-light fadeItem">{showQtd("Por distancia e idade da frota")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}