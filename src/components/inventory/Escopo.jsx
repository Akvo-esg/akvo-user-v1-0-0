
import { useEffect } from "react"
import scrollDown from "../../../utils/scrollDown"
import { useSelector, useDispatch } from "react-redux";
import { escopoStore } from "../../../store/InventoryStates/InventoryStates.actions";


export default function Escopo(props) {

    // Redux variables // inventory list
    const states = useSelector(state => state.inventoryStates)
    const dispatch = useDispatch()

    useEffect(() => {

        const escopo1Elem = document.getElementById('escopo1Card')
        const escopo2Elem = document.getElementById('escopo2Card')
        const escopo3Elem = document.getElementById('escopo3Card')

        if (escopo1Elem && escopo1Elem.classList.contains('cardSelected')) escopo1Elem.classList.remove('cardSelected')
        if (escopo2Elem && escopo2Elem.classList.contains('cardSelected')) escopo2Elem.classList.remove('cardSelected')
        if (escopo3Elem && escopo3Elem.classList.contains('cardSelected')) escopo3Elem.classList.remove('cardSelected')

        if (states.escopo) {
            const id = `${states.escopo}Card`
            var element = document.getElementById(id);
            element.classList.add("cardSelected");
        }


    }, [states.escopo])


    return (
        <div className="row">
            <div className="col-12 col-xxl-10">
                <div className="row">
                    <div className="col-12 col-xl-4 col-lg-6 my-2 px-3">
                        <div className=' cardAnimation' id='escopo1Card'>
                            <div className="card cardAnimation border-secondary shadow m-1" type="button" onClick={() => { dispatch(escopoStore("escopo1")); scrollDown("passo3") }}>
                                <div className="card-img-top border-secondary akvo_Escopo1_color d-flex align-items-center justify-content-center cards_headers py-2">
                                    Escopo 1
                                </div>
                                <div className="card-body px-2 py-2">
                                    <h5 className="h5_title">Emissões Diretas</h5>
                                    <p className='p'>Texto explicativo bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4 col-lg-6 my-2 px-3">
                        <div className='cardAnimation' id='escopo2Card'>
                            <div className="card cardAnimation border-secondary shadow m-1" type="button" onClick={() => { dispatch(escopoStore('escopo2')); scrollDown("passo3") }}>
                                <div className="card-img-top border-secondary akvo_Escopo2_color d-flex align-items-center justify-content-center cards_headers py-2">
                                    Escopo 2
                                </div>
                                <div className="card-body px-2 py-2">
                                    <h5 className="h5_title">Emissões Indiretas</h5>
                                    <p className='p'>Texto explicativo bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4 col-lg-6 my-2 px-3">
                        <div className=' cardAnimation' id='escopo3Card'>
                            <div className="card cardAnimation border-secondary shadow m-1" type="button" onClick={() => { dispatch(escopoStore('escopo3')); scrollDown("passo3") }}>
                                <div className="card-img-top border-secondary akvo_Escopo3_color d-flex align-items-center justify-content-center cards_headers py-2">
                                    Escopo 3
                                </div>
                                <div className="card-body px-2 py-2">
                                    <h5 className="h5_title">Emissões Indiretas</h5>
                                    <p className='p'>Texto explicativo bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}