import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function SearchBar() {

    const { searchKey, handleOnChange, handleSubmit } = useContext(GlobalContext)

    return (
        <>
            <nav className="navbar" style={{backgroundColor:"black"}}>
                <div className="container-fluid">
                    <h1 className="navbar-brand" style={{color:"red"}}>BoolFlix</h1>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input id="search" required className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchKey} onChange={(event) => handleOnChange(event)} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </>
    )

}

export default SearchBar
