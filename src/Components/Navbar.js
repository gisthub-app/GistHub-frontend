import React, { useContext } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import whiteLogo from "../img/white-logo.png"
import { UserContext } from "../Context/UserContext"

const Navbar = ({ isLoggedIn, drawerWidth }) => {
  const [userState, setUserState] = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUserState({})
    Cookies.remove("auth_gisthub")
    navigate("/")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        style={{ width: `calc(100% - ${drawerWidth})px` }}
      >
        <Toolbar>
          <div style={{ flex: "1" }}>
            <Button href='/' sx={{ color: "white" }} variant='text'>
              <img
                src={whiteLogo}
                alt='logo'
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant='h5'
                component='div'
                sx={{ color: "white", flexGrow: 1, textTransform: "none" }}
              >
                Gisthub
              </Typography>
            </Button>
          </div>
          {userState.user ? (
            <>
              <Button href='/login' sx={{ color: "white" }} variant='text'>
                <AddCircleIcon />
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ color: "white" }}
                variant='text'
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button href='/login' sx={{ color: "white" }} variant='text'>
                Login
              </Button>
              <Button href='/signup' sx={{ color: "white" }} variant='text'>
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
