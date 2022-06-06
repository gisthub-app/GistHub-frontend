import React from "react"
import { Typography } from "@mui/material/"

const ViewTextComponent = ({ payload }) => {
  return (
    <div style={{ padding: "10px 0px" }}>
      <Typography variant='body1' id='standard-textarea' multiline size='small'>
        {payload}
      </Typography>
    </div>
  )
}

export default ViewTextComponent
