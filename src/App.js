import React from 'react'
import './App.scss'
import { StylesProvider } from '@material-ui/styles'
import MainRoute from './routes'
import NavBar from './components/NavBar'
import FixedFab from './components/FixedFab'
import { InputContextProvider } from './contexts/inputContext'
import { DataContextProvider } from './contexts/dataContext'

function App() {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <DataContextProvider>
          <InputContextProvider>
            <NavBar />
            <MainRoute />
            <FixedFab />
          </InputContextProvider>
        </DataContextProvider>
      </StylesProvider>
    </div>
  )
}

export default App
