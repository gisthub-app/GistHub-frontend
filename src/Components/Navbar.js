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
import blueLogo from "../img/blue-logo.png"
import { UserContext } from "../Context/UserContext"
import { makeStyles } from "@mui/material"
import { toast } from "react-toastify"

const Navbar = ({ isLoggedIn, drawerWidth }) => {
  const [userState, setUserState] = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUserState({})
    Cookies.remove("auth_gisthub")
    toast.success("Logout successful")

    navigate("/")
  }

  const handleAddGist = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/createGist",
        {
          user: userState.user,
        }
      )
      toast.info("Tip: SAVE the gist after making changes")
      navigate(`/editGist/${data._id}`)
    } catch (err) {
      console.log(err)
    }
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
                src={blueLogo}
                alt='logo'
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant='h5'
                component='div'
                sx={{ color: "white", flexGrow: 1, textTransform: "none" }}
              >
                GistHub
              </Typography>
            </Button>
          </div>
          {userState.user ? (
            <div>
              <Button
                onClick={() => navigate("/dashboard")}
                style={{ backgroundColor: "white" }}
                variant='text'
              >
                Gists Dashboard
              </Button>

              <Button
                onClick={handleAddGist}
                // className={classes.root}
                style={{ backgroundColor: "white" }}
                sx={{ marginLeft: 2 }}
                variant='outlined'
              >
                Add a new Gist
                <AddCircleIcon style={{ marginLeft: 5 }} />
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ color: "white", marginLeft: 4 }}
                variant='text'
              >
                Logout
              </Button>
            </div>
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
