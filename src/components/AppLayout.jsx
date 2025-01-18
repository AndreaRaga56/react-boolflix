import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

function AppLayout() {
    return (
        <>
            <SearchBar/>
            <Outlet />
            <footer></footer>
        </>
    )
}

export default AppLayout