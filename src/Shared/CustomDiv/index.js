import React from "react"
import classNames from "classnames"
import { Paper } from "@mui/material"
import { useThemeContext } from "Shared/Theme"

/**
 * CustomDiv component represents a div element with a glassy appearance.
 * @param {import("@mui/material").PaperProps} props - Props object for the div element.
 * @returns {JSX.Element} - CustomDiv component.
 */

const CustomDiv = ({ children, className = "", elevation = 5, ...rest }) => {
  const { theme } = useThemeContext()

  return (
    <Paper
      sx={{ backgroundColor: `rgba(${theme.surface},0.${elevation})` }}
      elevation={0}
      className={classNames("p-3 !rounded-lg !shadow", className)}
      {...rest}
    >
      {children}
    </Paper>
  )
}

export default CustomDiv
