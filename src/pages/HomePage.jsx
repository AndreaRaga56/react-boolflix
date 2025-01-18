import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

function HomePage() {
    const { pagina, setPagina, getResp } = useContext(GlobalContext)

    const cambiaPagina = (event, x) => {
        event.preventDefault()
        setPagina(pagina + x)
    }

    const printMovies = () => {
        return getResp.results.map((curMovie) => {
            return (
                <div key={curMovie.id}>
                    <h3>{curMovie.title}</h3>
                    <p>{curMovie.original_title}</p>
                    <p>{curMovie.original_language}</p>
                    <p>{curMovie.vote_average}</p>
                </div>)
        })
    }

    return <>
        {getResp && (
            <section>
                <div>
                    Sei alla pagina {pagina} di {getResp.total_pages}
                </div>

                <div className="d-flex gap-2">
                    <button disabled={pagina === 1} className="btn btn-secondary mt-2" onClick={(event) => cambiaPagina(event, -1)}>Precedente</button>
                    <button disabled={pagina === getResp.total_pages} className="btn btn-secondary mt-2" onClick={(event) => cambiaPagina(event, 1)}>Successivo</button>
                </div>

                <section className="mt-5 movie printer">
                    {printMovies()}
                </section>

            </section>

        )}

    </>
}

export default HomePage