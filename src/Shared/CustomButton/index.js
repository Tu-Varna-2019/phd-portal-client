import { Button, CircularProgress } from "@mui/material"
import classNames from "classnames"

/**
 * Custom button component with additional features like loading state.
 * @param {object} props - Props object.
 * @param {Function} props.onClick - Click event handler.
 * @param {string} [props.type="button"] - Button type.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {React.ReactNode} props.children - Button content.
 * @param {React.ElementType} [props.component] - Component used for the root node.
 * @param {boolean} [props.hidden] - Whether the button is hidden.
 * @param {("contained" | "outlined" | "text")} [props.variant="contained"] - Button variant.
 * @param {React.ReactNode} [props.startIcon] - Icon displayed before the button label.
 * @param {("small" | "medium" | "large")} [props.size="small"] - Button size.
 * @param {React.ReactNode} [props.endIcon] - Icon displayed after the button label.
 * @param {boolean} [props.isLoading=false] - Whether the button is in loading state.
 * @param {string} [props.loadingContent=""] - Loading content displayed alongside the loading indicator.
 * @returns {JSX.Element} - Custom button component.
 */
const CustomButton = ({
  onClick,
  type = "button",
  disabled,
  className = "",
  children,
  component,
  hidden,
  variant = "contained",
  startIcon,
  size = "medium",
  endIcon,
  isLoading = false,
  loadingContent = "",
  ...rest
}) => {
  return (
    <>
      <Button
        disableElevation
        type={type}
        size={size}
        onClick={onClick}
        hidden={hidden}
        disabled={isLoading || disabled}
        component={component}
        variant={variant}
        startIcon={!isLoading && startIcon}
        endIcon={!isLoading && endIcon}
        className={classNames("!capitalize !px-5", variant === "contained" && "!text-white", className)}
        {...rest}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2 text-black">
            <CircularProgress size={20} thickness={5} />
            {loadingContent}
          </span>
        ) : (
          children
        )}
      </Button>
    </>
  )
}

export default CustomButton
