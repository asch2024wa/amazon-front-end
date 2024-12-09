import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initialState, reducer } from './Utility/reducer.jsx'
import { DataProvider } from './components/DataProvider/DataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState
    }>
    <App />
   </ DataProvider>
  </StrictMode>,
)