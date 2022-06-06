import React, { useEffect } from "react"
import TextField from "@mui/material/TextField"

const EditTextComponent = ({ payload, onTextChange }) => {
  return (
    <div style={{ padding: "10px 0px" }}>
      <TextField
        fullWidth
        variant='outlined'
        id='standard-textarea'
        multiline
        size='small'
        value={payload}
        onTextChange={(e) => onTextChange(e.target.value)}
      ></TextField>
    </div>
  )
}

export default EditTextComponent
