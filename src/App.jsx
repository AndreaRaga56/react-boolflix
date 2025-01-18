import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalContext from './context/GlobalContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
const apiKey=import.meta.env.VITE_API_KEY;





function App() {
  
  const apiUrl = "https://api.themoviedb.org/3/search/movie"

  let [searchKey, setSearchKey] = useState("")

  const handleOnChange = (event) => {
    let newSearchKey = event.target.value;
    setSearchKey(newSearchKey)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.get(`${apiUrl}?api_key=${apiKey}&query=${searchKey}`).then((resp) => { 
      console.log(resp.data)     
    });    
  };

  const globalContextValue = {
    searchKey,
    handleOnChange,
    handleSubmit
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
