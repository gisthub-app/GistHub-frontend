import React, { useContext, useEffect } from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import blueLogo from "../img/blue-logo.png"

import code from "../img/code.jpg"
import { UserContext } from "../Context/UserContext"
function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        GistHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function HomePage() {
  const [userState, setUserState] = useContext(UserContext)
  return (
    <Grid container component='main' sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${code})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              height: "200px",
              marginTop: "10px",
              marginBottom: "15px",
            }}
            alt='logo'
            src={blueLogo}
          />
          <Typography component='h1' variant='h5'>
            Welcome to Gisthub!
          </Typography>

          <Box>
            {userState.user ? (
              <>
                <Typography variant='h6'>
                  {userState.user.firstName + " " + userState.user.lastName}
                </Typography>
                <Button
                  href='/dashboard'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  See my gists
                </Button>
              </>
            ) : (
              <>
                <Button
                  href='/login'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>

                <Button
                  href='/signup'
                  fullWidth
                  variant='outlined'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </>
            )}

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
