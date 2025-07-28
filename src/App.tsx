
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
