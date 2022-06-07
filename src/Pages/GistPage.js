import { Button, Modal, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import ShareIcon from "@mui/icons-material/Share"
import { useParams } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import axios from "axios"
import EditIcon from "@mui/icons-material/Edit"
import PrivateShareModal from "../Components/PrivateShareModal"
import PublicShareModal from "../Components/PublicShareModal"
import ViewCodeComponent from "../Components/ViewCodeComponent"
import ViewTextComponent from "../Components/ViewTextComponent"
import ViewTitleComponent from "../Components/ViewTitleComponent"
import { ErrorPage } from "./ErrorPage"

const GistPage = () => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    { type: "Code", payload: "let" },
    { type: "Text", payload: "" },
  ])

  // https://dev.to/raaynaldo/react-router-usehistory-uselocation-and-useparams-10cd
  let { id } = useParams()
  const [title, setTitle] = useState("")

  const [userState, setUserState] = useContext(UserContext)

  const [error, setError] = useState(false)

  const [isOwner, setIsOwner] = useState(false)

  const [isPrivate, setIsPrivate] = useState(true)

  const [permissions, setPermissions] = useState([])
  const [ownerUsername, setOwnerUsername] = useState("")
  const getCurrentGist = async () => {
    try {
      // console.log(id)
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/viewGist",
        {
          user: userState.user,
          gistId: id,
        }
      )
      const { gist } = data
      setTitle(gist.title || "")
      setItems(gist.content || [])
      setIsOwner(userState.user.id === gist.owner.toString())
      if (!(userState.user.id === gist.owner.toString())) {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/getUser",
          {
            _id: gist.owner,
          }
        )
        setOwnerUsername(data.user.username)
      }
      console.log(gist)

      setIsPrivate(gist.isPrivate)
      setPermissions(gist.permissions || [])
    } catch (err) {
      console.log(err)
      setError(err.response.status)
    }
  }
  useEffect(() => {
    if (id) {
      getCurrentGist()
    }
  }, [id])

  const handleClose = () => setOpen(false)
  return error ? (
    <ErrorPage status={error} />
  ) : (
    <div style={{ margin: 50 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ViewTitleComponent payload={title}></ViewTitleComponent>
        {isOwner ? (
          <>
            <Button
              variant='contained'
              startIcon={<ShareIcon />}
              onClick={() => setOpen(true)}
            >
              Share
            </Button>
            <Button
              href={`/editGist/${id}`}
              variant='contained'
              startIcon={<EditIcon />}
              style={{ marginLeft: 10 }}
            >
              Edit
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              {isPrivate ? (
                <PrivateShareModal
                  invited={permissions}
                  setInvited={setPermissions}
                  isPrivate={isPrivate}
                  setIsPrivate={setIsPrivate}
                />
              ) : (
                <PublicShareModal
                  isPrivate={isPrivate}
                  setIsPrivate={setIsPrivate}
                />
              )}
            </Modal>
          </>
        ) : (
          <Typography>
            This Gist was shared with you by {ownerUsername}
          </Typography>
        )}
      </div>
      {items.map((item, index) => {
        const { type, payload } = item
        console.log(payload)
        if (type === "Code") {
          return <ViewCodeComponent payload={payload} />
        } else {
          return <ViewTextComponent payload={payload} />
        }
      })}
    </div>
  )
}

export default GistPage
