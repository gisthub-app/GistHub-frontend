import React from "react"
import { TextField } from "@mui/material"

export const EditTitleComponent = ({ title, setTitle }) => {
  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  return (
    <TextField
      InputProps={{
        disableUnderline: true,
        style: {
          fontSize: "2.125rem",
          fontWeight: "400",
        },
      }}
      fullWidth
      variant='standard'
      value={title}
      onChange={handleChange}
      placeholder='Untitled'
    ></TextField>
  )
}
