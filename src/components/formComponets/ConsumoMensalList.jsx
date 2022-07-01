import { useEffect, useState } from "react"


export default function ConsumoMensalList(props) {

    const [consumoJan, setConsumoJan] = useState(null)
    const [consumoFev, setConsumoFev] = useState(null)
    const [consumoMar, setConsumoMar] = useState(null)
    const [consumoAbr, setConsumoAbr] = useState(null)
    const [consumoMai, setConsumoMai] = useState(null)
    const [consumoJun, setConsumoJun] = useState(null)
    const [consumoJul, setConsumoJul] = useState(null)
    const [consumoAgo, setConsumoAgo] = useState(null)
    const [consumoSet, setConsumoSet] = useState(null)
    const [consumoOut, setConsumoOut] = useState(null)
    const [consumoNov, setConsumoNov] = useState(null)
    const [consumoDez, setConsumoDez] = useState(null)

    useEffect(() => {
        const soma = somaTotal()
        props.onChange(consumoJan, consumoFev, consumoMar, consumoAbr, consumoMai, consumoJun, consumoJul, consumoAgo, consumoSet, consumoOut, consumoNov, consumoDez, soma)
    }, [consumoJan, consumoFev, consumoMar, consumoAbr, consumoMai, consumoJun, consumoJul, consumoAgo, consumoSet, consumoOut, consumoNov, consumoDez])

    const somaTotal = () => {
        return consumoJan + consumoFev + consumoMar + consumoAbr + consumoMai + consumoJun + consumoJul + consumoAgo + consumoSet + consumoOut + consumoNov + consumoDez
    }


    return (
        <div className="d-flex">
            <div className="form-group mx-1">
                <label htmlFor="jan" className="mb-0 text-light">Jan</label>
                <input type="number" className="form-control form-control-sm" id="jan" placeholder="0"
                    value={consumoJan} onChange={e => setConsumoJan(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="fev" className="mb-0 text-light">Fev</label>
                <input type="number" className="form-control form-control-sm" id="fev" placeholder="0"
                    value={consumoFev} onChange={e => setConsumoFev(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="mar" className="mb-0 text-light">Mar</label>
                <input type="number" className="form-control form-control-sm" id="mar" placeholder="0"
                    value={consumoMar} onChange={e => setConsumoMar(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="abr" className="mb-0 text-light">Abr</label>
                <input type="number" className="form-control form-control-sm" id="abr" placeholder="0"
                    value={consumoAbr} onChange={e => setConsumoAbr(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="mai" className="mb-0 text-light">Mai</label>
                <input type="number" className="form-control form-control-sm" id="mai" placeholder="0"
                    value={consumoMai} onChange={e => setConsumoMai(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="jun" className="mb-0 text-light">Jun</label>
                <input type="number" className="form-control form-control-sm" id="jun" placeholder="0"
                    value={consumoJun} onChange={e => setConsumoJun(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="jul" className="mb-0 text-light">Jul</label>
                <input type="number" className="form-control form-control-sm" id="jul" placeholder="0"
                    value={consumoJul} onChange={e => setConsumoJul(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="ago" className="mb-0 text-light">Ago</label>
                <input type="number" className="form-control form-control-sm" id="ago" placeholder="0"
                    value={consumoAgo} onChange={e => setConsumoAgo(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="set" className="mb-0 text-light">Set</label>
                <input type="number" className="form-control form-control-sm" id="set" placeholder="0"
                    value={consumoSet} onChange={e => setConsumoSet(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="out" className="mb-0 text-light">Out</label>
                <input type="number" className="form-control form-control-sm" id="out" placeholder="0"
                    value={consumoOut} onChange={e => setConsumoOut(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="nov" className="mb-0 text-light">Nov</label>
                <input type="number" className="form-control form-control-sm" id="nov" placeholder="0"
                    value={consumoNov} onChange={e => setConsumoNov(Number(e.target.value))} />
            </div>
            <div className="form-group mx-1">
                <label htmlFor="dez" className="mb-0 text-light">Dez</label>
                <input type="number" className="form-control form-control-sm" id="dez" placeholder="0"
                    value={consumoDez} onChange={e => setConsumoDez(Number(e.target.value))} />
            </div>
        </div>
    )
}