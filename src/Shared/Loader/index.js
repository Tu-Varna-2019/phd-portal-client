import { useTheme } from "@mui/material"
import "./index.css"

const Loader = () => {
  const theme = useTheme()
  return (
    <div className="loading-wave">
      <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
      <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
      <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
      <div style={{ backgroundColor: theme.palette.primary.main }} className="loading-bar"></div>
    </div>
  )
}

export default Loader
