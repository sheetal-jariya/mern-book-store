
import './App.css'
import UserRoutes from './router/router'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <UserRoutes/>
       <ToastContainer />
    </>
  )
}

export default App
