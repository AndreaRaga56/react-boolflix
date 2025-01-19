import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalContext from './context/GlobalContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
const apiKey=import.meta.env.VITE_API_KEY;

function App() {
  
  const apiUrl = "https://api.themoviedb.org/3/search"

  let [searchKey, setSearchKey] = useState("")
  let [paginaMovie, setPaginaMovie] = useState(1)
  let [getRespMovie, setGetRespMovie] = useState(null)

  let [paginaSerie, setPaginaSerie] = useState(1)
  let [getRespSerie, setGetRespSerie] = useState(null)

  const handleOnChange = (event) => {
    let newSearchKey = event.target.value;
    setSearchKey(newSearchKey)
  }

  const getMovies=()=>{
    axios.get(`${apiUrl}/movie?api_key=${apiKey}&query=${searchKey}&page=${paginaMovie}`).then((resp) => { 
      setGetRespMovie(resp.data)
    });    
  }

  const getSerie=()=>{
    axios.get(`${apiUrl}/tv?api_key=${apiKey}&query=${searchKey}&page=${paginaSerie}`).then((resp) => { 
      setGetRespSerie(resp.data)   
    });    
  }

  useEffect(()=>{
    console.log("Ottengo nuovi film")
    getMovies()
  },[paginaMovie])

  useEffect(()=>{
    console.log("Ottengo nuove serie")
    getSerie()
  },[paginaSerie])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    getSerie()
    setPaginaMovie(1)
    setPaginaSerie(1)
  };

  const globalContextValue = {
    searchKey,
    handleOnChange,
    handleSubmit,
    paginaMovie,
    setPaginaMovie,
    getRespMovie,
    paginaSerie,
    setPaginaSerie,
    getRespSerie

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
