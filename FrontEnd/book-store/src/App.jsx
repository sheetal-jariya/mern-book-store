
import './App.css'
import ThemeToggle from './pages/ThemeToggle';
import UserRoutes from './router/router'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
   <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <UserRoutes />
      <ToastContainer />
    </div>
    </>
  )
}

export default App
