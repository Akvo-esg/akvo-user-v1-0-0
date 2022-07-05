import Title from '../src/components/title/Title'
import { useEffect, useState } from 'react'
import sidebarHide from "../utils/sidebarHide";
import { useSelector, useDispatch } from "react-redux";
import { reset, update } from '../store/InventoryList/InventoryList.actions'
import { initialValues } from '../store/InventoryStates/InventoryStates.actions';
import { getInventory } from '../store/InventoryDB/InventoryDB.actions';
import baseUrl from '../utils/baseUrl'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { userRestriction } from '../utils/permission';
import axios from 'axios';
import UnitsList from '../src/components/inventory/UnitsList';
import ShoppingCart from '../src/components/inventory/ShoppingCart';
import Escopo from '../src/components/inventory/Escopo';
import InventoryCards from '../src/components/inventory/InventoryCards';
import FontesEmissoes from '../src/components/inventory/FontesEmissoes';
import scrollDown from '../utils/scrollDown';
import InventoryHeader from '../src/components/inventory/InventoryHeader';
import FontesEstacionariasDeCombustao from '../src/components/inventory/fontesEmissao/FontesEstacionariasDeCombustao';
import FontesEstacionariasDeCombustaoTable from '../src/components/inventory/inventoryTables/FontesEstacionariasDeCombustaoTable';
import AddCompanyUnid from '../src/components/redirctPages/AddCompanyUnid';
import EnergiaEletricaSemEscolhaDeCompra from '../src/components/inventory/tipoEmissao/EnergiaEletricaSemEscolhaDeCompra';
import EnergiaEletricaSIN from '../src/components/inventory/fontesEmissao/EnergiaEletricaSIN';
import EnergiaEletricaSINTable from '../src/components/inventory/inventoryTables/EnergiaEletricaSINTable';
import TransportesTranspDist from '../src/components/inventory/tipoEmissao/TransportesTranspDist'
import TransporteRodoviarioTranspDist from '../src/components/inventory/tipoCalculo/TipoCalcTransporteRodoviarioTranspDist';
import TransporteRodoviarioTranspDistPorTipoAnoFab from "../src/components/inventory/fontesEmissao/TransporteRodoviarioTranspDistPorTipoAnoFab"
import TransporteRodoviarioTranspDistPorTipoAnoFabTable from '../src/components/inventory/inventoryTables/TransporteRodoviarioTranspDistPorTipoAnoFabTable'
import Transportes from '../src/components/inventory/tipoEmissao/Transportes'
import TipoCalcTransporteRodoviario from '../src/components/inventory/tipoCalculo/TipoCalcTransporteRodoviario'
import RodoviarioPorTipo from '../src/components/inventory/fontesEmissao/RodoviarioPorTipo';
import RodoviarioPorTipoTable from '../src/components/inventory/inventoryTables/RodoviarioPorTipoTable';
import RodoviarioPorCombustivel from '../src/components/inventory/fontesEmissao/RodoviarioPorCombustivel';
import RodoviarioPorCombustivelTable from '../src/components/inventory/inventoryTables/RodoviarioPorCombustivelTable';
import TransporteFerroviario from '../src/components/inventory/fontesEmissao/TransporteFerroviario';
import FerroviarioTable from '../src/components/inventory/inventoryTables/FerroviarioTable';
import TransporteHidroviario from '../src/components/inventory/fontesEmissao/TransporteHidroviario';
import HidroviarioTable from '../src/components/inventory/inventoryTables/HidroviarioTable';
import { getValues } from '../store/FatoresEmissao/FatoresEmissao.actions';

export default function Inventory() {

    // Redux variables // inventory list
    //TODO: Fix list, não ta chamando a função expecífica da lista.
    const list = useSelector(state => state.inventoryList)
    const states = useSelector(state => state.inventoryStates)
    const dispatch = useDispatch()

    //Set User Info
    const [token, setToken] = useState(null)
    const [user_id, setUser_id] = useState(null)
    const [company_id, setCompany_id] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userProfilePic, setUserProfilePic] = useState(null)
    const [userLastName, setUserLastName] = useState(null)
    const [permissions, setPermissions] = useState([])
    const [userStatus, setUserStatus] = useState('')


    //Set Variables
    const [unidList, setUnidList] = useState([])
    const [inventario, setInventario] = useState([])
    const [userConfig, setUserConfig] = useState('')
    const [unid_id, setUnid_id] = useState(null)
    const [unidSetorPrimario, setUnidSetorPrimario] = useState(null)
    const [unidName, setUnidName] = useState(null)
    const [anoInventario, setAnoInventario] = useState(null)
    const [escopo, setEscopo] = useState(null)
    const [fonteEmissao, setFonteEmissao] = useState(null)
    const [fatoresEmissao, setFatoresEmissao] = useState([])

    //Transportes Variables
    const [transporte, setTransporte] = useState(null)
    const [tipoCalculo, setTipoCalculo] = useState(null)

    //Emissões Fugitivas Variables
    const [tipoEmissao, setTipoEmissao] = useState('')

    //Updating render array elements
    const [forceUpdate, setForceUpdate] = useState(0)
    const [addCompany, setAddCompany] = useState(false)
    const [addUnid, setAddUnid] = useState(false)

    //Loading components
    const [loading, setLoading] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)


    useEffect(() => {
        sidebarHide()
        setToken(Cookie.get('auth'))
        // dispatch(initialValues())
    }, [])

    // handle auth of user
    useEffect(() => {
        if (token) {
            const data = jwt.decode(token)
            userRestriction(['auditor'], data.userStatus, true)

            setUser_id(data.sub)
            if (data.company_id) {
                setUser_id(data.sub)
                setUserName(data.firstName)
                setUserLastName(data.lastName)
                setUserProfilePic(data.profilePicture)
                setCompany_id(data.company_id)
                setPermissions(data.permissions)
                setUserStatus(data.userStatus)
                dataFunction(data.company_id)
            } else {
                setLoading(false)
            }
        } else {
            return
        }
    }, [token])

    // force component to update
    useEffect(() => {
        setForceUpdate(forceUpdate + 1)
    }, [list])

    useEffect(() => {
        setTransporte('')
        setTipoCalculo('')
        setTipoEmissao('')
    }, [fonteEmissao])

    //Getting data from the company inventory
    const dataFunction = async (company_id) => {
        await axios.get(`${baseUrl()}/api/company`, {
            params: {
                company_id: company_id
            }
        })
            .then(res => {
                setUserConfig(res.data.userConfig)
                const list = []
                if (res.data.unidades.length === 0) {
                    setAddUnid(true)
                }
                res.data.unidades.map(unid => {
                    list.push({
                        "_id": unid._id,
                        "unidName": unid.unidName,
                        "setorPrimario": unid.setorPrimario
                    })
                })
                setUnidList(list)
                dispatch(getInventory(res.data.inventory))
                setLoading(false)

            })
            .catch(err => setAddCompany(true))

        await axios.get(`${baseUrl()}/api/fatoresDeEmissao`)
            .then(res => dispatch(getValues(res.data)))
            .catch(err => console.log(err))

    }

    //Save data
    const save = async (list, company_id) => {

        setSaveLoading(true)

        list.map(elem => {
            elem.userName = `${userName} ${userLastName}`,
                elem.user_id = user_id,
                elem.dateAdded = new Date(),
                elem.dateUpdated = ''
        })

        const data = {
            list,
            company_id
        }

        await axios.patch(`${baseUrl()}/api/inventory`, data)
            .then(res => {
                dispatch(reset([]))
                dataFunction(company_id)
                setSaveLoading(false)
                return true
            }).catch(e => {
                setSaveLoading(false)
            })
    }

    const handleList = (data) => {
        const oldList = list

        oldList.unshift(data)

        dispatch(update(oldList))
    }

    return (
        <body className='fadeItem'>
            <Title title={`Inventário`} subtitle={'Siga os passos para fazer seu inventário'} />
            {loading ?
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <>
                    {addCompany ?
                        <AddCompanyUnid
                            title={"Cadastre sua instituição"}
                            text={"Para gerenciar suas unidades é necessário fazer o cadastro da sua empresa."}
                            link={"/companyEdit"} button={"Cadastrar instituição"} />
                        :
                        <>
                            {addUnid ?
                                <AddCompanyUnid title={"Cadastre unidade"}
                                    text={"Para gerenciar suas unidades é necessário adicionar sua primeira unidade."}
                                    link={"/unityAdd"} button={"Adicionar unidade"} />
                                :
                                <div id='body'>
                                    <InventoryHeader />

                                    <InventoryCards>
                                        <h5 className='h5_title mb-0' id="passo1">Passo 1</h5>
                                        <p className='akvo_form_label mb-3'>Selecione a unidade e o ano base</p>
                                        <UnitsList unidList={unidList} yearSelect />
                                    </InventoryCards>

                                    <ShoppingCart save={() => save(list, company_id)} saveLoading={saveLoading}/>

                                    {states.unid_id && states.anoInventario && (
                                        <InventoryCards>
                                            <h5 className='h5_title mb-0' id='passo2'>Passo 2</h5>
                                            <p className='akvo_form_label mb-3'>Selecione um Escopo de Emissões</p>
                                            <Escopo />
                                        </InventoryCards>
                                    )}

                                    {states.unid_id && states.anoInventario && states.escopo && (
                                        <InventoryCards>
                                            <h5 className='h5_title mb-0' id='passo3'>Passo 3</h5>
                                            <p className='akvo_form_label mb-3'>Selecione um Escopo de Emissões</p>
                                            <FontesEmissoes />
                                        </InventoryCards>
                                    )}





                                    {/* ESCOPO 1 */}

                                    {states.unid_id && states.anoInventario && states.escopo && states.fonteEmissao && (

                                        <>
                                            {states.fonteEmissao === "Fontes Estacionárias de Combustão" && (
                                                <>
                                                    <InventoryCards>
                                                        <h5 className='h5_title mb-0' id='passo4'>Passo 4</h5>
                                                        <FontesEstacionariasDeCombustao />
                                                    </InventoryCards>
                                                    <InventoryCards>
                                                        <FontesEstacionariasDeCombustaoTable data={{  userConfig }}
                                                            fatoresEmissao={fatoresEmissao} inventario={inventario} title
                                                            save={() => save(list, company_id)}
                                                            forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                            updateList={() => dataFunction(company_id)} />
                                                    </InventoryCards>
                                                </>
                                            )}

                                            {states.fonteEmissao === "Transportes" && (
                                                <>
                                                    <InventoryCards>
                                                        <h5 className='h5_title mb-0' id='passo4'>Passo 4</h5>
                                                        <Transportes />
                                                        {states.tipoEmissao === "Transporte Rodoviário" && (
                                                            <TipoCalcTransporteRodoviario data={{ userConfig }}
                                                                setTipoCalculo={(value) => { setTipoCalculo(value) }}/>

                                                        )}
                                                    </InventoryCards>

                                                    {states.tipoEmissao === "Transporte Ferroviário" && (
                                                        <>
                                                            <InventoryCards>
                                                                <h5 className='h5_title mb-0' id='passo5'>Passo 5</h5>
                                                                <TransporteFerroviario data={{ userConfig }}
                                                                    onChange={data => handleList(data)}
                                                                    edit={newList => setList(newList)}
                                                                    forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                    save={() => save(list, company_id)}
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                            <InventoryCards>
                                                                <FerroviarioTable data={{ userConfig }}
                                                                    save={() => save(list, company_id)} title
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                        </>
                                                    )}

                                                    {states.tipoEmissao === "Transporte Hidroviário" && (
                                                        <>
                                                            <InventoryCards>
                                                                <h5 className='h5_title mb-0' id='passo5'>Passo 5</h5>
                                                                <TransporteHidroviario data={{ userConfig }}
                                                                    onChange={data => handleList(data)}
                                                                    edit={newList => setList(newList)}
                                                                    forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                    save={() => save(list, company_id)}
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                            <InventoryCards>
                                                                <HidroviarioTable data={{ userConfig }}
                                                                    save={() => save(list, company_id)} title
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                        </>
                                                    )}
                                                    {states.stipoCalculo === "Por tipo e ano de fabricacao" && (
                                                        <>
                                                            <InventoryCards>
                                                                <h5 className='h5_title mb-0' id='passo5'>Passo 5</h5>
                                                                <RodoviarioPorTipo data={{ unid_id, unidSetorPrimario, unidName, anoInventario, escopo, fonteEmissao, company_id, user_id, userName, userLastName }}
                                                                    fatoresEmissao={fatoresEmissao}
                                                                    tipoEmissao={tipoEmissao}
                                                                    tipoCalculo={tipoCalculo}
                                                                    list={list} inventario={inventario}
                                                                    onChange={data => handleList(data)}
                                                                    edit={newList => setList(newList)}
                                                                    forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                    save={() => save(list, company_id)}
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                            <InventoryCards>
                                                                <RodoviarioPorTipoTable data={{ unid_id, unidSetorPrimario, unidName, anoInventario, escopo, fonteEmissao, company_id, user_id, userName, userLastName }}
                                                                    fatoresEmissao={fatoresEmissao} inventario={inventario}
                                                                    tipoEmissao={tipoEmissao} tipoCalculo={tipoCalculo}
                                                                    save={() => save(list, company_id)} title
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                        </>
                                                    )}
                                                    {states.tipoCalculo === "Por tipo de combustivel" && (
                                                        <>
                                                            <InventoryCards>
                                                                <h5 className='h5_title mb-0' id='passo5'>Passo 5</h5>
                                                                <RodoviarioPorCombustivel data={{ userConfig }}
                                                                    onChange={data => handleList(data)}
                                                                    edit={newList => setList(newList)}
                                                                    forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                    save={() => save(list, company_id)}
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                            <InventoryCards>
                                                                <RodoviarioPorCombustivelTable data={{ userConfig }}
                                                                    save={() => save(list, company_id)} title
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                        </>
                                                    )}


                                                </>
                                            )}






                                            {/* ESCOPO 2 */}

                                            {fonteEmissao === "Energia elétrica - Sem escolha de compra" && (
                                                <>

                                                    <InventoryCards>
                                                        <h5 className='h5_title mb-0' id='passo4'>Passo 4</h5>

                                                        <EnergiaEletricaSemEscolhaDeCompra
                                                            setTipoEmissao={(value) => { setTipoEmissao(value) }}
                                                            tipoEmissao={tipoEmissao} unid_id={unid_id}
                                                            fonteEmissao={fonteEmissao}
                                                            anoInventario={anoInventario} />

                                                        {tipoEmissao === "Sistema Interligado Nacional (SIN)" && (
                                                            <>
                                                                <EnergiaEletricaSIN data={{ unid_id, unidSetorPrimario, unidName, anoInventario, escopo, fonteEmissao, company_id, user_id, userName, userLastName, userConfig, userStatus }}
                                                                    fatoresEmissao={fatoresEmissao} tipoEmissao={tipoEmissao} inventario={inventario} title
                                                                    onChange={data => handleList(data)}
                                                                    forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </>
                                                        )}
                                                    </InventoryCards>
                                                    {tipoEmissao === "Sistema Interligado Nacional (SIN)" && (
                                                        <>
                                                            <InventoryCards>
                                                                <EnergiaEletricaSINTable data={{ unid_id, unidSetorPrimario, unidName, anoInventario, escopo, fonteEmissao, company_id, user_id, userName, userLastName, userConfig, userStatus }}
                                                                    fatoresEmissao={fatoresEmissao} inventario={inventario} title tipoEmissao={tipoEmissao}
                                                                    save={() => save(list, company_id)}
                                                                    forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                    updateList={() => dataFunction(company_id)} />
                                                            </InventoryCards>
                                                        </>
                                                    )}
                                                </>
                                            )}









                                            {/* ESCOPO 3 */}

                                            {fonteEmissao === "Transporte e Distribuição" && (
                                                <>
                                                    <InventoryCards>
                                                        <h5 className='h5_title mb-0' id='passo4'>Passo 4</h5>

                                                        <TransportesTranspDist
                                                            setTipoEmissao={(value) => { setTipoEmissao(value) }}
                                                            tipoEmissao={tipoEmissao} unid_id={unid_id}
                                                            fonteEmissao={fonteEmissao}
                                                            anoInventario={anoInventario} />

                                                        {tipoEmissao === "Transporte Rodoviário" && (
                                                            <>
                                                                <TransporteRodoviarioTranspDist
                                                                    setTipoCalculo={(value) => { setTipoCalculo(value) }}
                                                                    tipoEmissao={tipoEmissao} tipoCalculo={tipoCalculo}
                                                                    unid_id={unid_id}
                                                                    fonteEmissao={fonteEmissao}
                                                                    anoInventario={anoInventario} />
                                                                {tipoCalculo === "Por tipo e ano de fabricacao" && (
                                                                    <>
                                                                        <TransporteRodoviarioTranspDistPorTipoAnoFab data={{ unid_id, unidSetorPrimario, unidName, anoInventario, escopo, fonteEmissao, company_id, user_id, userName, userLastName }}
                                                                            fatoresEmissao={fatoresEmissao}
                                                                            tipoEmissao={tipoEmissao}
                                                                            tipoCalculo={tipoCalculo}
                                                                            list={list} inventario={inventario}
                                                                            onChange={data => handleList(data)}
                                                                            edit={newList => setList(newList)}
                                                                            forceUpdate={() => setForceUpdate(forceUpdate + 1)}
                                                                            save={() => save(list, company_id)}
                                                                            updateList={() => dataFunction(company_id)} />
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </InventoryCards>
                                                    {tipoCalculo === "Por tipo e ano de fabricacao" && (
                                                        <InventoryCards>
                                                            <TransporteRodoviarioTranspDistPorTipoAnoFabTable data={{ unid_id, unidSetorPrimario, unidName, anoInventario, escopo, fonteEmissao, company_id, user_id, userName, userLastName }}
                                                                fatoresEmissao={fatoresEmissao} inventario={inventario}
                                                                tipoEmissao={tipoEmissao} tipoCalculo={tipoCalculo}
                                                                save={() => save(list, company_id)} title
                                                                updateList={() => dataFunction(company_id)}
                                                            />
                                                        </InventoryCards>
                                                    )}
                                                </>
                                            )}
                                        </>)
                                    }

                                    <div id="pageBottom"></div>
                                </div>
                            }
                        </>

                    }
                </>
            }
        </body>
    )
}