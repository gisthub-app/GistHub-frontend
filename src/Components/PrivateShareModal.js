import React, { useState, useEffect, useContext } from "react"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Paper, Typography, Button, List, IconButton } from "@mui/material"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import DeleteIcon from "@mui/icons-material/Delete"
import axios from "axios"
import { UserContext } from "../Context/UserContext"
import { useParams } from "react-router-dom"

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

const PrivateShareModal = ({
  invited,
  setInvited,
  isPrivate,
  setIsPrivate,
}) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [userState, setUserState] = useContext(UserContext)
  const { id } = useParams()

  const [flip, setFlip] = useState(false)

  const myUsername = userState.user.username

  const handleAddInvite = (username) => {
    try {
      const { data } = axios.post(
        process.env.REACT_APP_SERVER_URL + "/updateGist",
        {
          gistId: id,
          user: userState.user,
          permissions: [...invited, username],
        }
      )
      setInvited([...invited, username])
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveInvite = (username) => {
    const userRemovedInvitations = invited.filter((user) => user !== username)
    try {
      const { data } = axios.post(
        process.env.REACT_APP_SERVER_URL + "/updateGist",
        {
          gistId: id,
          user: userState.user,
          permissions: userRemovedInvitations,
        }
      )
      setInvited(userRemovedInvitations)
    } catch (err) {
      console.log(err)
    }
  }

  const handleMakePublic = () => {
    try {
      const { data } = axios.post(
        process.env.REACT_APP_SERVER_URL + "/updateGist",
        {
          gistId: id,
          user: userState.user,
          isPrivate: false,
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const getAllUsers = async () => {
    try {
      //get all users
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/getAllUsers"
      )

      setAllUsers(data.users)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setLoading(true)

    getAllUsers()
  }, [])

  useEffect(() => {
    // only show users that have not been invited/ are not you
    setOptions(
      allUsers.filter(
        (x) => invited.indexOf(x.username) === -1 && x.username !== myUsername
      )
    )
  }, [invited, allUsers])
  return (
    <Paper sx={{ ...modalStyle }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          paddingBottom: "10px",
        }}
      >
        <PersonAddIcon fontSize='large' style={{ paddingRight: 10 }} />
        <Typography variant='h5'>Share with other users</Typography>
      </div>
      <Autocomplete
        id='asynchronous-demo'
        size='small'
        key={flip}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        // isOptionEqualToValue={(option, value) => option.title === value.title}
        // getOptionLabel={(option) => option.title}
        options={options}
        ListboxProps={{
          onClick: (evt) => {
            console.log(evt.target.textContent)
            handleAddInvite(evt.target.textContent)
          },
        }}
        getOptionLabel={(option) => option.username}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Add People'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <List>
        {invited.map((person) => {
          if (person === myUsername) {
            return null
          }
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{person}</Typography>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => handleRemoveInvite(person)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )
        })}
      </List>
      <Button
        variant='outlined'
        onClick={() =>
          navigator.clipboard.writeText(
            `${process.env.REACT_APP_CLIENT_URL}/gist/` + id
          )
        }
      >
        Get link
      </Button>
      <Button
        variant='outlined'
        style={{ marginLeft: 10 }}
        onClick={handleMakePublic}
      >
        Make public
      </Button>
    </Paper>
  )
}

export default PrivateShareModal
