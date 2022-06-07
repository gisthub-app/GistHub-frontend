import React, { useContext, useState, useEffect } from "react"
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
import axios from "axios"
import CopyrightComponent from "../Components/CopyrightComponent"
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const SignUpPage = () => {
  const [userContext, setUserContext] = useContext(UserContext)
  const [state, setState] = useState({ user: undefined })
  const navigate = useNavigate()
  useEffect(() => {}, [state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/register",
        {
          username: formData.get("username"),
          password: formData.get("password"),
          email: formData.get("email"),
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
        }
      )
      setUserContext({ user: data })
      toast.success(
        `Sign up successful. Welcome to GistHub ${formData.get("firstName")}`
      )
      navigate("/dashboard")
    } catch (err) {
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
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href='login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CopyrightComponent sx={{ mt: 5 }} />
    </Container>
  )
}

export default SignUpPage
