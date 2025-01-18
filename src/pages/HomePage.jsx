import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

function HomePage() {
    const { pagina, setPagina, getResp} = useContext(GlobalContext)

    const cambiaPagina = (event, x) =>{
        event.preventDefault()
        setPagina(pagina+x)
    }

    return (

        <>
        <div>
        Sei alla pagina {pagina} di {getResp.total_pages}

        </div>
            
            <div className="d-flex gap-2">
                <button disabled={pagina===1} className="btn btn-secondary mt-2" onClick={(event)=>cambiaPagina(event, -1)}>Precedente</button>
                <button disabled={pagina===getResp.total_pages} className="btn btn-secondary mt-2" onClick={(event)=>cambiaPagina(event, 1)}>Successivo</button>
            </div>

        </>
    )
}

export default HomePage