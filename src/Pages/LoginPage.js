import React, { useContext } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import CopyrightComponent from "../Components/CopyrightComponent"
import axios from "axios"
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const LoginPage = () => {
  const [userContext, setUserContext] = useContext(UserContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/login",
        {
          username: formData.get("username"),
          password: formData.get("password"),
        }
      )
      // console.log(data)
      toast.success(`Welcome back ${data.firstName}`)

      setUserContext({ user: data })
      navigate("/dashboard")
    } catch (err) {
      toast.error("Invalid username/email or password")
      console.log(err)
    }
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in to your account
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username or email address'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href='signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CopyrightComponent sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default LoginPage
