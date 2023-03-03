import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'
import Header from './components/Header'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [countries, setCountries] = useState([])
  const countriesInputRef = useRef()
  const regionRef = useRef()
  const navigate = useNavigate()

  const noCountries = countries.status || countries.message

  const switchMode = () => {
    setDarkMode((prevState) => !prevState)
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v2/all')
    const data = await response.json()

    if (data.status === 404) {
      setCountries([])
      return
    }
    setCountries(data)
  }

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value
    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/name/${searchValue}`
        )
        const data = await response.json()
        setCountries(data)
      }

      try {
        fetchSearch()
      } catch {
        console.log('error')
      }
    } else {
      fetchData()
    }
  }

  const selectRegion = () => {
    const selectValue = regionRef.current.value
    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectValue}`
        )
        const data = await response.json()

        if (selectValue === 'all') {
          try {
            fetchData()
          } catch (error) {
            console.log(error)
          }
          return
        }

        setCountries(data)
      }

      try {
        fetchSelect()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showDetails = (code) => {
    navigate(`/${code}`)
  }

  return (
    <div className={`app ${darkMode ? 'darkMode' : ''}`}>
      <Header onClick={switchMode} darkMode={darkMode} />

      <Routes>
        <Route
          path='/'
          element={
            <div className='app-body'>
              <div className='inputs'>
                <div className={`search_input ${darkMode ? 'darkMode' : ''}`}>
                  <SearchIcon />
                  <input
                    type='text'
                    placeholder='Search for a country...'
                    ref={countriesInputRef}
                    onChange={searchCountries}
                  />
                </div>
                <div className={`select_region ${darkMode ? 'darkMode' : ''}`}>
                  <select
                    className='select_region-input'
                    ref={regionRef}
                    onChange={selectRegion}
                  >
                    <option>All</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>

              <div className='countries'>
                {!noCountries ? (
                  countries.map((country) => (
                    <Country
                      key={country.alpha3Code}
                      darkMode={darkMode}
                      code={country.alpha3Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flags.svg}
                      showDetails={showDetails}
                    />
                  ))
                ) : (
                  <p>No Countries found...</p>
                )}
              </div>
            </div>
          }
        />
        <Route
          path='/:countryCode'
          element={
            <CountryDetails
              darkMode={darkMode}
              countries={countries}
              refetch={fetchData}
            />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App
