import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalContext from './context/GlobalContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
const apiKey=import.meta.env.VITE_API_KEY;

function App() {
  
  const apiUrl = "https://api.themoviedb.org/3/search/movie"
  let empty ={
    page: 0,
    results: [],
    total_pages: 1,
    total_results: 0,
  }

  let [searchKey, setSearchKey] = useState("")
  let [pagina, setPagina] = useState(1)
  let [getResp, setGetResp] = useState(empty)

  const handleOnChange = (event) => {
    let newSearchKey = event.target.value;
    setSearchKey(newSearchKey)
  }

  const getMovies=()=>{
    axios.get(`${apiUrl}?api_key=${apiKey}&query=${searchKey}&page=${pagina}`).then((resp) => { 
      setGetResp(resp.data)   
      console.log(resp.data)  
    });    
  }

  useEffect(()=>{
    getMovies()
  },[pagina])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  };

  const globalContextValue = {
    searchKey,
    handleOnChange,
    handleSubmit,
    pagina,
    setPagina,
    getResp
  }

  return (
    <>
      <GlobalContext.Provider value={globalContextValue}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>


    </>
  )
}

export default App
