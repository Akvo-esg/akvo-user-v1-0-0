import { useEffect, useState } from "react"


export default function ConsumoMensalList(props) {

    const [consumoJan, setConsumoJan] = useState(props.data.editConsumoJan)
    const [consumoFev, setConsumoFev] = useState(props.data.editConsumoFev)
    const [consumoMar, setConsumoMar] = useState(props.data.editConsumoMar)
    const [consumoAbr, setConsumoAbr] = useState(props.data.editConsumoAbr)
    const [consumoMai, setConsumoMai] = useState(props.data.editConsumoMai)
    const [consumoJun, setConsumoJun] = useState(props.data.editConsumoJun)
    const [consumoJul, setConsumoJul] = useState(props.data.editConsumoJul)
    const [consumoAgo, setConsumoAgo] = useState(props.data.editConsumoAgo)
    const [consumoSet, setConsumoSet] = useState(props.data.editConsumoSet)
    const [consumoOut, setConsumoOut] = useState(props.data.editConsumoOut)
    const [consumoNov, setConsumoNov] = useState(props.data.editConsumoNov)
    const [consumoDez, setConsumoDez] = useState(props.data.editConsumoDez)

    useEffect(() => {
        const soma = somaTotal()
        props.onChange(consumoJan, consumoFev, consumoMar, consumoAbr, consumoMai, consumoJun, consumoJul, consumoAgo, consumoSet, consumoOut, consumoNov, consumoDez, soma)
    }, [consumoJan, consumoFev, consumoMar, consumoAbr, consumoMai, consumoJun, consumoJul, consumoAgo, consumoSet, consumoOut, consumoNov, consumoDez])

    const somaTotal = () => {
        return consumoJan + consumoFev + consumoMar + consumoAbr + consumoMai + consumoJun + consumoJul + consumoAgo + consumoSet + consumoOut + consumoNov + consumoDez
    }

    return (
        <div className="d-flex">
            <div className="form-group">
                <label htmlFor="jan" className="mb-0">Jan</label>
                <input type="number" className="form-control form-control-sm" id="jan" placeholder="0"
                    value={consumoJan} onChange={e => setConsumoJan(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="fev" className="mb-0">Fev</label>
                <input type="number" className="form-control form-control-sm" id="fev" placeholder="0"
                    value={consumoFev} onChange={e => setConsumoFev(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="mar" className="mb-0">Mar</label>
                <input type="number" className="form-control form-control-sm" id="mar" placeholder="0"
                    value={consumoMar} onChange={e => setConsumoMar(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="abr" className="mb-0">Abr</label>
                <input type="number" className="form-control form-control-sm" id="abr" placeholder="0"
                    value={consumoAbr} onChange={e => setConsumoAbr(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="mai" className="mb-0">Mai</label>
                <input type="number" className="form-control form-control-sm" id="mai" placeholder="0"
                    value={consumoMai} onChange={e => setConsumoMai(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="jun" className="mb-0">Jun</label>
                <input type="number" className="form-control form-control-sm" id="jun" placeholder="0"
                    value={consumoJun} onChange={e => setConsumoJun(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="jul" className="mb-0">Jul</label>
                <input type="number" className="form-control form-control-sm" id="jul" placeholder="0"
                    value={consumoJul} onChange={e => setConsumoJul(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="ago" className="mb-0">Ago</label>
                <input type="number" className="form-control form-control-sm" id="ago" placeholder="0"
                    value={consumoAgo} onChange={e => setConsumoAgo(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="set" className="mb-0">Set</label>
                <input type="number" className="form-control form-control-sm" id="set" placeholder="0"
                    value={consumoSet} onChange={e => setConsumoSet(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="out" className="mb-0">Out</label>
                <input type="number" className="form-control form-control-sm" id="out" placeholder="0"
                    value={consumoOut} onChange={e => setConsumoOut(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="nov" className="mb-0">Nov</label>
                <input type="number" className="form-control form-control-sm" id="nov" placeholder="0"
                    value={consumoNov} onChange={e => setConsumoNov(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label htmlFor="dez" className="mb-0">Dez</label>
                <input type="number" className="form-control form-control-sm" id="dez" placeholder="0"
                    value={consumoDez} onChange={e => setConsumoDez(Number(e.target.value))} />
            </div>
        </div>
    )
}