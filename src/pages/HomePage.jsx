import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';


function HomePage() {
    const { paginaMovie, setPaginaMovie, getRespMovie, paginaSerie, setPaginaSerie, getRespSerie, submitted } = useContext(GlobalContext)

    const cambiaPagina = (event, x, tipo) => {
        event.preventDefault()
        if (tipo === "Movie") {
            setPaginaMovie(paginaMovie + x)
        }
        else if (tipo === "Serie") {
            setPaginaSerie(paginaSerie + x)
        }
    }

    const checkLingua = (lingua) => {
        if (lingua == "it") {
            return "it.png"
        } else if (lingua == "en") {
            return "en.png"
        } else {
            return "placeholder.png"
        }
    }
    const setPoster = (img) => {
        if (img != null) {
            return "https://image.tmdb.org/t/p/w185/" + img
        } else {
            return false
        }

    }
    const stelline = (voto) => {
        voto = Math.ceil(voto / 2)
        const array = [1, 2, 3, 4, 5]
        return array.map((cur) => {
            if (voto >= cur) {
                return <FontAwesomeIcon className="stellina" key={cur} icon={solidStar} />
            } else {
                return <FontAwesomeIcon className="stellina" key={cur} icon={regularStar} />
            }
        })
    };

    const printCards = (array, type) => {
        return array.results.map((cur) => {
            let titoloOriginale
            let titolo
            if (type === "Serie") {
                titolo = cur.name
                titoloOriginale = cur.original_name
            } else if (type === "Movie") {
                titolo = cur.title
                titoloOriginale = cur.original_title
            }
            const bandierina = checkLingua(cur.original_language)
            const poster = setPoster(cur.poster_path)
            const voto = stelline(cur.vote_average)
            return (
                <div key={cur.id}>
                    {poster != false ?
                        <div className="ms-placeholder">
                            <div className="nascosto">
                                <p><strong>Titolo:</strong> {titolo}</p>
                                <p><strong>Titolo originale:</strong> {titoloOriginale}</p>
                                <p className="bandierina"><strong>Lingua originale:</strong><img src={bandierina} alt="" /> </p>
                                <div className="stelline-container">{voto}</div>
                            </div>
                            <img className="poster" src={poster} alt="" /></div>

                        : <div className="ms-placeholder vuoto">
                            <div className="nascosto">
                                <p><strong>Titolo:</strong> {titolo}</p>
                                <p><strong>Titolo originale:</strong> {titoloOriginale}</p>
                                <p className="bandierina"><strong>Lingua originale:</strong><img src={bandierina} alt="" /> </p>
                                <div className="stelline-container">{voto}</div>
                            </div>
                        </div>}
                </div>)
        })
    }

    return <>

        <div className="main">

            <div>




                {getRespMovie && (
                    <div className="ps-4">
                        <h1 className="pt-4">FILM</h1>
                        <div className="page-controller">
                            <div>
                                Sei alla pagina {paginaMovie} di {getRespMovie.total_pages}
                            </div>
                            <div className="d-flex gap-2">
                                <button disabled={paginaMovie === 1} className="btn btn-danger " onClick={(event) => cambiaPagina(event, -1, "Movie")}>Precedente</button>
                                <button disabled={paginaMovie === getRespMovie.total_pages} className="btn btn-danger " onClick={(event) => cambiaPagina(event, 1, "Movie")}>Successivo</button>
                            </div>
                        </div>
                    </div>)}
                {getRespMovie && (
                    getRespMovie.results.length !== 0 ? (
                        <section className="ps-4 mt-2 list">
                            {printCards(getRespMovie, "Movie")}
                        </section>
                    ) : (
                        <h3 className="ps-4 mt-2">La tua ricerca non ha prodotto risultati</h3>
                    )
                )}

                {getRespSerie && (
                    <div className="ps-4">
                        <h1 className="pt-4">SERIE</h1>
                        <div className="page-controller">
                            <div>
                                Sei alla pagina {paginaSerie} di {getRespSerie.total_pages}
                            </div>
                            <div className="d-flex gap-2">
                                <button disabled={paginaSerie === 1} className="btn btn-danger " onClick={(event) => cambiaPagina(event, -1, "Serie")}>Precedente</button>
                                <button disabled={paginaSerie === getRespSerie.total_pages} className="btn btn-danger " onClick={(event) => cambiaPagina(event, 1, "Serie")}>Successivo</button>
                            </div>
                        </div>
                    </div>)}
                {getRespSerie && (
                    getRespSerie.results.length !== 0 ? (
                        <section className="ps-4 mt-2 list">
                            {printCards(getRespSerie, "Serie")}
                        </section>
                    ) : (
                        <h3 className="ps-4 mt-2">La tua ricerca non ha prodotto risultati</h3>
                    )
                )}
            </div>
        </div>
    </>
}

export default HomePage