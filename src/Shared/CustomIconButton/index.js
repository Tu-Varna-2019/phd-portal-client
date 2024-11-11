import { IconButton } from "@mui/material"
import { useThemeContext } from "Shared/Theme"
import classNames from "classnames"

/**
 * Custom icon button component.
 * @param {import("@mui/material").IconButtonProps} props - IconButton Props
 * @param {string} className - The CSS class name.
 * @returns {JSX.Element} IconButton component.
 */
const CustomIconButton = ({ className = "", size = "small", ...rest }) => {
  const { theme } = useThemeContext()
  return (
    <IconButton
      size={size}
      sx={{ background: `rgba(${theme.button}, 0.2)` }}
      className={classNames("!bg-black !bg-opacity-10", className)}
      {...rest}
    />
  )
}

export default CustomIconButton
