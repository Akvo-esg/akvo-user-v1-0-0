import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars-2'
import scrollDown from "../../../utils/scrollDown"
import { anoInventarioStore, escopoStore, fonteEmissaoStore, unidNameStore, unid_idStore } from '../../../store/InventoryStates/InventoryStates.actions'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function ShoppingCart(props) {

    const list = useSelector(state => state.inventoryList)
    const token = jwt.decode(Cookie.get('auth'))
    const dispatch = useDispatch()

    const [inventarioList, setInventarioList] = useState([])

    useEffect(() => {
        if (list.length > 0) {
            handleRender(list)
        } else {
            setInventarioList([])
        }
    }, [list.length])

    const scrollToTable = (elem, item) => {

        dispatch(unid_idStore(elem.unid_id))
        dispatch(unidNameStore(elem.unidName))
        dispatch(anoInventarioStore(elem.anoInventario))
        dispatch(escopoStore(item.escopo))
        dispatch(fonteEmissaoStore(item.fonteEmissao))

        scrollDown("passo4")
    }

    const handleRender = (list) => {

        let newList = []

        if (list.length) {

            list.map(elem => {
                const itemIndexExists = newList.findIndex(item => item.unid_id === elem.unid_id && item?.anoInventario === elem.anoInventario)
                if (itemIndexExists === -1) {
                    newList.push({
                        unid_id: elem.unid_id,
                        anoInventario: elem.anoInventario,
                        unidName: elem.unidName,
                        setorPrimario: elem.setorPrimario,
                        fontesEmissao: [{
                            escopo: elem.escopo,
                            fonteEmissao: elem.fonteEmissao,
                            data: [{
                                code: elem.code,
                                descricaoFonte: elem.descricaoFonte,
                                combustive: elem.combustivel,
                                combustivelName: elem.combustivelName,
                                qtd: elem.qtd,
                                unidade: elem.unidade
                            }]
                        }]
                    })

                } else {
                    const fonteEmissaoIndexExists = newList[itemIndexExists].fontesEmissao.findIndex(item => item.fonteEmissao === elem.fonteEmissao)
                    if (fonteEmissaoIndexExists !== -1) {
                        newList[itemIndexExists].fontesEmissao[fonteEmissaoIndexExists].data.push({
                            code: elem.code,
                            descricaoFonte: elem.descricaoFonte,
                            combustive: elem.combustivel,
                            combustivelName: elem.combustivelName,
                            qtd: elem.qtd,
                            unidade: elem.unidade
                        })
                    } else {
                        newList[itemIndexExists].fontesEmissao.push({
                            escopo: elem.escopo,
                            fonteEmissao: elem.fonteEmissao,
                            data: [{
                                code: elem.code,
                                descricaoFonte: elem.descricaoFonte,
                                combustive: elem.combustivel,
                                combustivelName: elem.combustivelName,
                                qtd: elem.qtd,
                                unidade: elem.unidade
                            }]
                        })
                    }
                }
            })
        } else {
            return
        }
        setInventarioList(newList)

        const saveButton = document.getElementById('saveButton')
        saveButton.classList.add("growUpDown")
        setTimeout(() => {
            saveButton.classList.remove("growUpDown")
        }, 1000)


    }


    return (
        <aside className="shoppingCart_content shadow fadeItem">
            <h5 className="h5_title text-light text-center mb-4">Novos Registros</h5>

            <div className="inventoryList">
                <Scrollbars style={{ height: "100%" }} autoHide autoHideTimeout={1000} autoHideDuration={200}>


                    {inventarioList.map((elem, index) => {
                        return (
                            <div className="px-0 my-1 me-1 list-group fadeItem shoppingCart_card cardAnimation mb-2" key={`elem${index}`}>
                                <a className=" fadeItem list-group-item py-1  shoppingCart_topics shoppingCart_title" >
                                    <div className="row d-flex justify-content-center">
                                        {elem.unidName}
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        {elem.anoInventario}

                                    </div>
                                </a>
                                {elem.fontesEmissao.map((item, index) => {
                                    return (
                                        <a type="button" className="fadeItem list-group-item shoppingCart_topics d-flex align-items-center py-0 px-0"
                                            onClick={() => scrollToTable(elem, item)} key={`fonteEmissao${index}`}>
                                            <table>
                                                <tbody >
                                                    <tr >
                                                        <td>
                                                            <div className="shoppingCart_fontesEmissao ms-1">
                                                                {item.fonteEmissao}
                                                            </div>
                                                        </td>
                                                        <td>

                                                            <span className="me-1 badge akvo-bg-secondary">
                                                                {elem.fontesEmissao[index].data.length}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>


                                        </a>
                                    )
                                })}

                            </div>
                        )
                    })}
                </Scrollbars >


            </div>

            <div className="row " style={{ "height": "8vh" }}>
                <div className="col-12 d-flex align-items-end justify-content-center ms-5">
                    <div className="position-absolute">

                        {props.saveLoading ?


                            <button className="btn btn-sm btn-success font-weight-bold shoppingCart_button" disabled>
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </button>
                            :
                            <button className="btn btn-sm btn-success font-weight-bold sticky-bottom" id="saveButton" disabled={list.length === 0}
                                onClick={async () => props.save()}> SALVAR
                            </button>
                        }
                    </div>
                </div>
            </div>


        </aside>
    )
}