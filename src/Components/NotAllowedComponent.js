import { Button, Typography } from "@mui/material"
import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"

const NotAllowedComponent = () => {
  const [userState] = useContext(UserContext)
  return (
    <div style={{ margin: "auto", margin: "100px" }}>
      <Typography variant='h4'>
        You do not have permission to view this gist.
      </Typography>
      <Typography style={{ marginTop: "30px" }} variant='h6'>
        Please contact the owner to give you permission by allowing access to
        your username <b>{userState.user.username}</b>
      </Typography>
    </div>
  )
}

export default NotAllowedComponent
