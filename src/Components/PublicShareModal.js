import React, { useContext } from "react"

import { Paper, Typography, Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import axios from "axios"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 3,
}

const PublicShareModal = ({ setIsPrivate }) => {
  const [userState, setUserState] = useContext(UserContext)

  const handleMakePrivate = () => {
    try {
      const { data } = axios.post(
        process.env.REACT_APP_SERVER_URL + "/updateGist",
        {
          isPrivate: true,
          user: userState.user,
          gistId: id,
        }
      )
      setIsPrivate(true)
    } catch (err) {
      console.log(err)
    }
  }
  const { id } = useParams()
  const gistId = id
  return (
    <Paper sx={{ ...modalStyle }}>
      <Typography>
        Your gist is currently visible to <b>everyone</b>
      </Typography>
      <Button
        style={{ marginTop: 20 }}
        variant='outlined'
        onClick={() =>
          // TODO react toastify "copy link to clipboard"
          navigator.clipboard.writeText(
            process.env.REACT_APP_CLIENT_URL + "/" + gistId
          )
        }
      >
        Get link
      </Button>
      <Button
        variant='outlined'
        onClick={handleMakePrivate}
        style={{ marginLeft: 10, marginTop: 20 }}
      >
        Make Private
      </Button>
    </Paper>
  )
}

export default PublicShareModal
