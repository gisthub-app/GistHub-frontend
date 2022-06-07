import { Button, Link, Typography } from "@mui/material"
import React from "react"

const LoggedOutComponent = () => {
  return (
    <div style={{ margin: "auto", margin: "100px" }}>
      <Typography variant='h4'>Please log in to proceed.</Typography>
      <Link to='/login'>
        <Button style={{ marginTop: "20px" }} variant='contained'>
          Login
        </Button>
      </Link>
    </div>
  )
}

export default LoggedOutComponent
