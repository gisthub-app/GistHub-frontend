import { Button, Modal, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import ShareIcon from "@mui/icons-material/Share"
import { useParams } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import axios from "axios"
import EditIcon from "@mui/icons-material/Edit"
import PrivateShareModal from "../Components/PrivateShareModal"
import PublicShareModal from "../Components/PublicShareModal"

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

  const getCurrentGist = async () => {
    try {
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
      console.log(gist)
      //TODO change below
      setIsPrivate(gist.isPrivate)
      setPermissions(gist.permissions || [])
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (id) {
      getCurrentGist()
    }
  }, [id])

  const handleClose = () => setOpen(false)
  return (
    <div style={{ margin: 50 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant='h4' sx={{ flex: 1 }}>
          {title}
        </Typography>
        {isOwner && (
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
        )}
      </div>
      {/* {items.map((item, index) => {
        const { type, payload } = item
        if (type === "Code") {
          return <ViewCode payload={payload} />
        } else {
          return <ViewText payload={payload} />
        }
      })} */}
    </div>
  )
}

export default GistPage
