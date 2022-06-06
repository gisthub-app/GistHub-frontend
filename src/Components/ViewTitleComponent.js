import { Typography } from "@mui/material"
import React from "react"

const ViewTitleComponent = ({ payload }) => {
  return (
    <Typography variant='h4' sx={{ flex: 1 }}>
      {payload}
    </Typography>
  )
}

export default ViewTitleComponent
