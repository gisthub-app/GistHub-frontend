import "./App.css"
import React, { useContext } from "react"
import Navbar from "./Components/Navbar"
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import DashboardPage from "./Pages/DashboardPage"
import TestComponent from "./Components/TestComponent"
import { UserContext } from "./Context/UserContext"
import GistPage from "./Pages/GistPage"
import EditGistPage from "./Pages/EditGistPage"
function App() {
  const [userState, setUserState] = useContext(UserContext)
  return (
    <>
      <Router>
        {" "}
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route
            exact
            path='/login'
            element={
              userState.user ? (
                <Navigate to='/dashboard'></Navigate>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            exact
            path='/signup'
            element={
              userState.user ? (
                <Navigate to='/dashboard'></Navigate>
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            exact
            path='/dashboard'
            element={
              userState.user ? <DashboardPage /> : <Navigate to='/'></Navigate>
            }
          />
          <Route
            exact
            path='/gist/:id'
            element={
              userState.user ? <GistPage /> : <Navigate to='/'></Navigate>
            }
          />
          <Route
            exact
            path='/editGist/:id'
            element={
              userState.user ? <EditGistPage /> : <Navigate to='/'></Navigate>
            }
          />
          <Route exact path='/test' element={<TestComponent />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
