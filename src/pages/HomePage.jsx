import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';


function HomePage() {
    const { paginaMovie, setPaginaMovie, getRespMovie, paginaSerie, setPaginaSerie, getRespSerie } = useContext(GlobalContext)

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

    const printMovies = () => {
        return getRespMovie.results.map((curMovie) => {
            const bandierina = checkLingua(curMovie.original_language)
            const poster = setPoster(curMovie.poster_path)
            const voto = stelline(curMovie.vote_average)
            return (
                <div key={curMovie.id}>
                    {poster != false ?
                        <div className="ms-placeholder"><img src={poster} alt="" /></div>
                        : <div className="ms-placeholder vuoto" style={{ backgroundColor: "black" }}></div>}
                    <h3>{curMovie.title}</h3>
                    <p>{curMovie.original_title}</p>
                    <div className="bandierina"> <img src={bandierina} alt="" /> </div>
                    <div className="stelline-container">{voto}</div>
                </div>)
        })
    }


    const printSerie = () => {
        return getRespSerie.results.map((curSerie) => {
            const bandierina = checkLingua(curSerie.original_language)
            const poster = setPoster(curSerie.poster_path)
            console.log(poster)
            const voto = stelline(curSerie.vote_average)
            return (
                <div key={curSerie.id}>
                    {poster != false ?
                        <div className="ms-placeholder"><img src={poster} alt="" /></div>
                        : <div className="ms-placeholder vuoto" style={{ backgroundColor: "black" }}></div>}
                    <h3>{curSerie.name}</h3>
                    <p>{curSerie.original_name}</p>
                    <div className="bandierina"> <img src={bandierina} alt="" /> </div>
                    <div className="stelline-container">{voto}</div>
                </div>)
        })
    }

    return <>
        {getRespMovie && (
            <div className="ps-4 main">
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
                <section className="mt-2 list">
                    {printMovies()}
                </section>
            </div>)}



        {getRespSerie && (
            <div className="ps-4 main">
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
                <section className="mt-2 list">
                    {printSerie()}
                </section>
            </div>)}




    </>
}

export default HomePage