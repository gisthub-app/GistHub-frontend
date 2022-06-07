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
import EditCodeComponent from "../Components/EditCodeComponent"

import EditTextComponent from "../Components/EditTextComponent"
import { toast } from "react-toastify"

const EditGistPage = () => {
  const [openShareTab, setOpenShareTab] = useState(false)
  const [content, setContent] = useState([])
  const [title, setTitle] = useState("")
  const [permissions, setPermissions] = useState([])
  const [isPrivate, setIsPrivate] = useState(true)

  const [userState, setUserState] = useContext(UserContext)
  const { id } = useParams()
  const gistId = id
  const [error, setError] = useState(null)

  const getCurrentGist = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/viewGist",
        {
          user: userState.user,
          gistId: gistId,
        }
      )

      const gist = data.gist
      setTitle(gist.title || "")
      setContent(gist.content || [])
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

  const handleTextCodeChange = (payload, idx) => {
    const newContent = [...content]
    // console.log(newContent[idx])
    newContent[idx].payload = payload
    setContent(newContent)
  }
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
  }

  const handleTextCodeDelete = (idx) => {
    const newContent = [...content]
    newContent.splice(idx, 1)
    setContent(newContent)
  }
  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/updateGist",
        {
          user: userState.user,
          gistId: gistId,
          content: content,
          title: title,
        }
      )
      toast.success("Gist saved succesfully")
      // console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const DEFAULT_CODE = { type: "Code", payload: "" }
  const DEFAULT_TEXT = { type: "Text", payload: "" }

  const createNewCode = () => {
    setContent([...content, DEFAULT_CODE])
  }
  const createNewText = () => {
    setContent([...content, DEFAULT_TEXT])
  }
  return (
    <div style={{ margin: 50 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <EditTitleComponent
          title={title}
          setTitle={setTitle}
          handleTitleChange={(newTitle) => handleTitleChange(newTitle)}
        ></EditTitleComponent>
        <Button
          variant='contained'
          startIcon={<ShareIcon />}
          onClick={() => setOpenShareTab(true)}
        >
          Share
        </Button>
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={handleSave}
          style={{ marginLeft: 10 }}
        >
          Save
        </Button>
      </div>

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
          <PublicShareModal isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
        )}
      </Modal>

      {content.map((item, index) => {
        const { type, payload } = item
        if (type === "Code") {
          return (
            <EditCodeComponent
              handleDelete={() => handleTextCodeDelete(index)}
              payload={payload}
              onCodeChange={(payload) => handleTextCodeChange(payload, index)}
            ></EditCodeComponent>
          )
        } else {
          return (
            <EditTextComponent
              handleDelete={() => handleTextCodeDelete(index)}
              payload={payload}
              onTextChange={(payload) => handleTextCodeChange(payload, index)}
            ></EditTextComponent>
          )
        }
      })}
      <Button
        variant='contained'
        onClick={() => createNewText()}
        style={{ margin: 10 }}
      >
        Add Text
      </Button>
      <Button
        variant='contained'
        onClick={() => createNewCode()}
        style={{ margin: 10 }}
      >
        Add Code
      </Button>
    </div>
  )
}

export default EditGistPage
