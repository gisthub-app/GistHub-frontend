import "./App.css"

import Navbar from "./Components/Navbar"
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import DashboardPage from "./Pages/DashboardPage"
import TestComponent from "./Components/TestComponent"

function App() {
  return (
    <>
      <Router>
        {" "}
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/signup' element={<SignUpPage />} />
          <Route exact path='/dashboard' element={<DashboardPage />} />
          <Route exact path='/test' element={<TestComponent />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
