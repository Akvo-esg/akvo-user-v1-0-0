import { useEffect, useState } from "react"
import $ from 'jquery'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import scrollDown from "../../../utils/scrollDown"
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector, useDispatch } from "react-redux";
import { unid_idStore, unidNameStore, setorPrimarioStore, anoInventarioStore, escopoStore, fonteEmissaoStore, tipoEmissaoStore, tipoCalculoStore } from "../../../store/InventoryStates/InventoryStates.actions"


export default function UnitsList2(props) {

    const states = useSelector(state => state.inventoryStates)
    const token = jwt.decode(Cookie.get('auth'))
    const dispatch = useDispatch()

    //Search bar
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        shoppingCart(states.unid_id, states.anoInventario)

    }, [states.unid_id, states.anoInventario])


    useEffect(() => {
        changeUnity(states.unidName, states.unid_id, states.unidSetorPrimario, '')
    }, [searchTerm])

    //Puxar dados do ShoppingCart
    const shoppingCart = (id, anoInventario) => {

        $(':radio').each(function () {
            this.checked = false
        })

        $('.anoSelect').each(function () {
            this.disabled = true
            this.value = ''
        })
        setTimeout(() => {
            $(`#op${id}`).prop('value', anoInventario)
            $(`#id${id}`).prop('checked', true)
            $(`#op${id}`).prop('disabled', false)
        }, 1)

    }

    //Desabilitar linhas não selecionadas na tabela
    const changeUnity = (value, id, setorPrimario, anoInventario) => {

        console.log(value)

        dispatch(unid_idStore(id))
        dispatch(unidNameStore(value))
        dispatch(setorPrimarioStore(setorPrimario))
        dispatch(escopoStore(''))
        dispatch(fonteEmissaoStore(''))
        dispatch(tipoEmissaoStore(''))
        dispatch(tipoCalculoStore(''))

        $(':radio').each(function () {
            this.checked = false
        })

        $('.anoSelect').each(function () {
            this.disabled = true
            this.value = ''
            dispatch(anoInventarioStore(''))
        })
        dispatch(anoInventarioStore(anoInventario))

        setTimeout(() => {
            $(`#id${id}`).prop('checked', true)
            $(`#op${id}`).prop('disabled', false)
            $(`#op${id}`).prop('value', anoInventario)
        }, 1)
    }

    return (

        <div className="row">
            <div className="col-12 col-xxl-7">
                <small>
                    {/* <div className="tableWrapper"> */}

                    <Scrollbars style={{ height: "250px" }}>
                        <table className="table table-striped table-sm fadeItem scrollBarTable">
                            <thead>

                                <tr>
                                    <th></th>
                                    {/* <th className="col-2">#</th> */}
                                    <th>
                                        <div className="input-group">
                                            <div className="me-5">
                                                Nome da Unidade

                                            </div>
                                            <input type="text"
                                                className="form-control akvo_form_control_sm form"
                                                placeholder="Procurar" aria-label="User search" aria-describedby="user-search"
                                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                            <span className="akvo_btn btn-sm input-group-text" type="text"><FontAwesomeIcon icon={faSearch} /></span>
                                        </div>

                                    </th>
                                    {props.yearSelect && states.unid_id && (
                                        <th className="text-center fadeItem">Ano</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>



                                {props.unidList.filter(elem => {
                                    if (token.permissions) {
                                        if (token.permissions.includes(elem._id)) {
                                            return elem
                                        } else {
                                            return
                                        }
                                    } else {
                                        return elem
                                    }
                                }).filter(val => {
                                    if (searchTerm == '') {
                                        return val
                                    } else if (val.unidName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return val
                                    }
                                }).map((unid, index) => {
                                    return (
                                        <tr style={{ width: "100%" }} key={`unid${index}`}>
                                            <td scope="row">
                                                <div className="form-check">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        id={'id' + unid._id}
                                                        value={unid.unidName}
                                                        onChange={e => changeUnity(unid.unidName, unid._id, unid.setorPrimario)} />
                                                </div>
                                            </td>
                                            {/* <td>{index + 1}</td> */}
                                            <td>{unid.unidName} </td>
                                            {props.yearSelect && states.unid_id === unid._id && (
                                                <td style={{ width: "150px" }} className="fadeItem">
                                                    <select className="anoSelect form-select  akvo_form_control_sm" id={'op' + unid._id}
                                                        onChange={e => {
                                                            changeUnity(unid.unidName, unid._id, unid.setorPrimario, e.target.value);
                                                            scrollDown("passo2")
                                                        }}
                                                        disabled>
                                                        <option value='' disabled selected>Escolha</option>
                                                        <option value="2022">2022</option>
                                                        <option value="2021">2021</option>
                                                        <option value="2020">2020</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2018">2018</option>
                                                        <option value="2017">2017</option>
                                                        <option value="2016">2016</option>
                                                        <option value="2015">2015</option>
                                                        <option value="2014">2014</option>
                                                        <option value="2013">2013</option>
                                                        <option value="2012">2012</option>
                                                        <option value="2011">2011</option>
                                                        <option value="2010">2010</option>
                                                        <option value="2009">2009</option>
                                                        <option value="2008">2008</option>
                                                        <option value="2007">2007</option>
                                                        <option value="2006">2006</option>
                                                        <option value="2005">2005</option>
                                                        <option value="2004">2004</option>
                                                        <option value="2003">2003</option>
                                                    </select>
                                                </td>
                                            )}
                                            {props.yearSelect && states.unid_id !== unid._id && (
                                                <td></td>
                                            )}
                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                    </Scrollbars>
                    {/* </div> */}
                </small>
            </div>
        </div>
    )

}