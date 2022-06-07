import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import axios from "axios"
import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../Context/UserContext"
import DeleteIcon from "@mui/icons-material/Delete"

// originally from https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(userFullName) {
  // get the first letter of the firstName
  const firstNameFirstLetter = userFullName.split(" ")[0][0]

  // get the first letter of the lastName
  const lastNameFirstLetter = userFullName.split(" ")[1][0]

  // get a color based on the userFullName of the user
  const avatarColor = stringToColor(userFullName)
  return {
    sx: {
      bgcolor: avatarColor,
      width: 300,
      height: 300,
      fontSize: 100,
    },
    // avatar based on the firstNameFirstLetter and lastNameFirstLetter
    children: `${firstNameFirstLetter}${lastNameFirstLetter}`,
  }
}

const DashboardPage = () => {
  const [userState, setUserState] = useContext(UserContext)

  // backend calls to fill state for these variables
  const [gistsData, setGistsData] = useState([])
  const [sharedGistsData, setSharedGistsData] = useState([])

  const [sharedWithMeTab, setSharedWithMeTab] = useState(false)

  const userFullName = `${userState.user.firstName} ${userState.user.lastName}`
  const getMyGists = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/myGists`,
        {
          user: userState.user,
        }
      )

      setGistsData(data.gists)
      setSharedGistsData(data.sharedWithMe)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getMyGists()
  }, [])

  const handleChange = (event, newValue) => {
    setSharedWithMeTab(Boolean(newValue))
  }

  const handleDeleteGist = async (gistId) => {
    try {
      await axios.post(process.env.REACT_APP_SERVER_URL + "/deleteGist", {
        _id: gistId,
        user: userState.user,
      })
      const updatedGists = gistsData.filter((gist) => gist._id !== gistId)
      setGistsData(updatedGists)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "1",
          padding: "50px",
          flexDirection: "column",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Avatar {...stringAvatar(userFullName)} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{ fontWeight: "bold", marginTop: "2rem" }}
            variant='h4'
          >
            {userFullName}
          </Typography>
          <Typography style={{ marginTop: "1.5rem" }} variant='h5'>
            @{userState.user.username}
          </Typography>
          <Typography style={{ marginTop: "1rem" }} variant='subtitle1'>
            {gistsData.length} gists
          </Typography>
        </div>
      </div>
      <Paper
        style={{
          flex: "3",
          padding: "20px",
          backgroundColor: "rgb(242, 242, 242, 0.4)",
          borderRadius: 0,
        }}
      >
        <Tabs value={Number(sharedWithMeTab)} onChange={handleChange}>
          <Tab label='My Gists' value={0} />
          <Tab label='Shared with me' value={1} />
        </Tabs>
        {!sharedWithMeTab &&
          gistsData.map((gist) => (
            <Card variant='outlined' style={{ margin: "10px" }}>
              <Typography
                variant='h6'
                style={{ paddingLeft: "15px", paddingTop: "10px" }}
              >
                {gist.title}
              </Typography>

              <div style={{ padding: "10px" }}>
                {" "}
                <Button href={`/gist/${gist._id}`} size='large'>
                  View This Gist
                </Button>
                <Button onClick={() => handleDeleteGist(gist._id)} size='large'>
                  <DeleteIcon />
                </Button>
              </div>
            </Card>
          ))}

        {sharedWithMeTab &&
          sharedGistsData.map((gist) => (
            <Card variation='outlined' style={{ margin: "10px" }}>
              <Typography
                variant='h6'
                style={{ paddingTop: "10px", paddingLeft: "15px" }}
              >
                {gist.title}
              </Typography>
              <CardActionArea
                href={`/gist/${gist._id}`}
                style={{ padding: "10px" }}
              >
                <CardActions>
                  <Button size='small'>View this Gist</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
      </Paper>
    </div>
  )
}

export default DashboardPage
