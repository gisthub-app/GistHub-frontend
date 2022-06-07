import React, { useEffect } from "react"
import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const EditTextComponent = ({ payload, onTextChange, handleDelete }) => {
  return (
    <div style={{ position: "relative", padding: "10px 0px" }}>
      <TextField
        fullWidth
        variant='outlined'
        id='standard-textarea'
        multiline
        size='small'
        value={payload}
        onChange={(e) => onTextChange(e.target.value)}
      ></TextField>
      <IconButton
        style={{
          position: "absolute",
          top: "10px",
          right: "0px",
        }}
        aria-label='copy'
        onClick={() => handleDelete()}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default EditTextComponent
