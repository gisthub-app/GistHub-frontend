import React, { useState, useContext, useEffect } from "react"

import { Button } from "@mui/material"
import ShareIcon from "@mui/icons-material/Share"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import CodeIcon from "@mui/icons-material/Code"
import SaveIcon from "@mui/icons-material/Save"
import Modal from "@mui/material/Modal"
import axios from "axios"
import { UserContext } from "../Context/UserContext"
import { useParams } from "react-router-dom"
import { EditTitleComponent } from "../Components/EditTitleComponent"
import PublicShareModal from "../Components/PublicShareModal"
import PrivateShareModal from "../Components/PrivateShareModal"
// import EditCodeComponent from "../Components/EditCodeComponent"

import EditTextComponent from "../Components/EditTextComponent"

const EditGistPage = () => {
  const [openShareTab, setOpenShareTab] = useState(false)
  const [content, setContent] = useState([])
  const [title, setTitle] = useState("")
  const [permissions, setPermissions] = useState([])
  const [isPrivate, setIsPrivate] = useState(true)

  const [userState, setUserState] = useContext(UserContext)
  const { id } = useParams()
  const [error, setError] = useState(null)

  const getCurrentGist = async () => {
    try {
      const { data } = axios.post(
        process.env.REACT_APP_SERVER_URL + "/viewGist",
        {
          user: userState.user,
          gistId: id,
        }
      )
      const { gist } = data.gist
      setTitle(gist.title || "")
      setContent(gist.items || [])
      setPermissions(gist.permissions || [])
      setIsPrivate(gist.isPrivate)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (id) {
      getCurrentGist()
    }
  }, [id])
  const handleCloseShareTab = () => setOpenShareTab(false)
  const handleChange = (payload, idx) => {
    const newContent = [...content]
    newContent[idx] = payload
    setContent(newContent)
  }
  return (
    <div style={{ margin: 50 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <EditTitleComponent
          title={title}
          setTitle={setTitle}
        ></EditTitleComponent> */}
        <Button
          variant='contained'
          startIcon={<ShareIcon />}
          onClick={() => setOpenShareTab(true)}
        >
          Share
        </Button>
        <Button variant='contained' startIcon={<SaveIcon />}>
          Save
        </Button>

        <Modal
          open={openShareTab}
          onClose={handleCloseShareTab}
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
        {content.map((item, index) => {
          const { type, payload } = item
          if (type === "Code") {
            return null
            // <EditCodeComponent
            //   payload={payload}
            //   onCodeChange={(payload) => handleChange(payload, index)}
            // ></EditCodeComponent>
          } else {
            return null
            // <EditTextComponent
            //   payload={payload}
            //   onTextChange={(payload) => handleChange(payload, index)}
            // ></EditTextComponent>
          }
        })}
      </div>
    </div>
  )
}

export default EditGistPage
