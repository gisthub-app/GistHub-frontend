import React, { useState } from "react"
import { CodeBlock, atomOneDark as theme } from "react-code-blocks"
import { IconButton } from "@mui/material"
import CopyAllIcon from "@mui/icons-material/CopyAll"
import Tooltip from "@mui/material/Tooltip"

const ViewCodeComponent = ({ payload }) => {
  const [copyTooltip, setCopyTooltip] = useState(false)
  const handleTooltipClose = () => {
    setCopyTooltip(false)
  }

  const handleTooltipOpen = () => {
    setCopyTooltip(true)
    setTimeout(handleTooltipClose, 600)
  }
  return (
    <div
      style={{
        position: "relative",
        padding: "10px 0px",
        fontFamily: '"Fira code", "Fira Mono", monospace',
      }}
    >
      <CodeBlock
        text={payload}
        language={"javascript"}
        showLineNumbers={false}
        theme={theme}
      />
      <Tooltip
        style={{ position: "absolute", top: "10px", right: "0" }}
        title='Copied'
        open={copyTooltip}
        onClose={handleTooltipClose}
      >
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(payload)
            handleTooltipOpen()
          }}
        >
          <CopyAllIcon></CopyAllIcon>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default ViewCodeComponent
