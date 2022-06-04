import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./Context/UserContext"

const theme = createTheme()

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
