import { useEffect, useState } from "react"

const ApiFeriadosChile = () => {
    const [data, setData] = useState([])
    const [dataFilter, setDataFilter] = useState([])
    const [value, setValue] = useState('')
    const [order, setOrder] = useState('asc')

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        filterData()
    }, [value])

    useEffect(() => {
        setDataFilter(sortData(dataFilter))
    }, [order])

    const getData = () => {
        fetch("https://api.victorsanmartin.com/feriados/en.json")
            .then(response => response.json())
            .then(result => {
                const sorted = sortData(result.data)
                setData(sorted)
                setDataFilter(sorted)
            })
            .catch(error => console.log('error', error));
    }

    const filterData = () => {
        const search = value.toLowerCase()
        const filtered = data.filter((f) => {
            const motivo = f.title.toLowerCase()
            return motivo.includes(search)
        })
        setDataFilter(sortData(filtered))
    }
    const sortData = (data) => {
        const sortedData = [...data]
        if (order === 'asc')
            sortedData.sort((a, b) => a.date.localeCompare(b.date))
        else
            sortedData.sort((a, b) => b.date.localeCompare(a.date))

        return sortedData
    }
    return (
        <main>
            <header className="row justify-content-center bg-primary text-white border rounded mt-3 mb-3">
                <div className="col-lg-3 d-flex align-items-center">
                    <h4><strong>Feriados de Chile 2022</strong></h4>
                </div>
                <div className="col-lg-1">
                    <img className="bandera" src="src/assets/img/chile.png" alt="bandera" />
                </div>
            </header>
            <div className="row mb-2">
                <div className="col-lg-3">
                    <label htmlFor="">Buscar:</label>
                    <input type="text" className="form-control" placeholder="Buscar por Motivo" onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className="col-lg-3">
                    <label htmlFor="">Ordenar:</label>
                    <select defaultValue="asc" onChange={(e) => setOrder(e.target.value)} className="form-select" >
                        <option disabled value='selected'>Ordenar por fecha...</option>
                        <option value='asc'>Fecha Ascendente</option>
                        <option value='desc'>Fecha Descendente</option>
                    </select>
                </div>

            </div>
            <div className="table-responsive-sm mt-4">
                <table className="table table-hover">
                    <thead>
                        <tr className="bg-danger text-white text-uppercase ">
                            <th>N°</th>
                            <th>Fecha</th>
                            <th>Motivo</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFilter.length > 0 ? (
                            dataFilter.map((df, i) => {
                                return (
                                    <tr key={i}>
                                        <td scope="row">{i + 1}</td>
                                        <td>{df.date}</td>
                                        <td>{df.title}</td>
                                        <td>{df.type}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td>Sin Coincidencias...</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>

            </div>
        </main>
    )
}

export default ApiFeriadosChile