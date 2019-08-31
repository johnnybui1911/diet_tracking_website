import React from 'react'
import './App.scss'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import MainRoute from './routes'
import { UserContextProvider } from './contexts/userContext'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6200ee'
    },
    secondary: {
      main: '#f5f5f5'
    },
    error: {
      main: '#6200ee'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)'
    }
  },
  status: {
    danger: 'orange'
  }
})

function App() {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <MainRoute />
          </UserContextProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  )
}

export default App
