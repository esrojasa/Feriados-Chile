import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import ApiFeriadosChile from './components/ApiFeriadosChile'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <main className='container'>
        <ApiFeriadosChile></ApiFeriadosChile>
      </main>
    </div >
  )
}

export default App
