import { Palette } from "@mui/icons-material"
import { Divider } from "@mui/material"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomModal from "Shared/CustomModal"
import classNames from "classnames"
import { createContext, useContext, useState } from "react"

/**
 * Context for managing theme settings.
 * @type {React.Context<{ setTheme: Function, theme: { button: string, background: string, surface: string, text: string } }>}
 */
const ThemeContext = createContext()

/**
 * Provider component for managing theme settings.
 * @param {Object} props - Props for the CustomTheme component.
 * @param {React.ReactNode} props.children - The children elements.
 * @param {Object} props.theme - The current theme settings.
 * @param {Function} props.setTheme - The function to update the theme settings.
 * @returns {JSX.Element} CustomTheme component.
 */
const CustomTheme = ({ children, theme, setTheme }) => {
  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

// Array of colors for theme selection
const colors = [
  "184, 93, 93",
  "54, 89, 126",
  "204, 179, 187",
  "133, 59, 182",
  "119, 184, 97",
  "68, 110, 143",
  "210, 53, 53",
  "89, 122, 56",
  "126, 99, 56",
  "200, 62, 129",
  "148, 141, 132",
  "129, 128, 75",
  "157, 66, 129",
  "168, 83, 99",
  "110, 158, 150",
  "143, 138, 186",
  "81, 107, 120",
  "78, 46, 106",
  "192, 126, 70",
  "252, 65, 0",
  "0, 0, 0",
]

/**
 * Custom hook to access the theme context.
 * @returns {{ setTheme: Function, theme: { button: string, background: string, surface: string, text: string } }} An object containing the setTheme function and the theme object.
 */
export const useThemeContext = () => useContext(ThemeContext)

/**
 * Modal component for changing theme settings.
 * @returns {JSX.Element} ThemeModal component.
 */
export const ThemeModal = () => {
  const [open, setOpen] = useState(false)
  const { setTheme, theme } = useThemeContext()

  return (
    <>
      <CustomIconButton color="primary" onClick={() => setOpen(true)}>
        <Palette />
      </CustomIconButton>
      <CustomModal title="Theme Settings" open={open} setOpen={setOpen} padding={0}>
        <div className="flex items-center justify-end">
          <CustomButton
            variant="text"
            onClick={() => {
              setTheme({ button: "244, 63, 94" })
              setOpen(false)
            }}
          >
            Reset
          </CustomButton>
        </div>
        <Divider />
        <div className="grid grid-cols-6 gap-3 p-3">
          {colors.map((color) => {
            return (
              <div
                key={color}
                className={classNames(
                  "w-20 h-9 border-2 border-black rounded cursor-pointer",
                  theme.button === color ? "border-opacity-70" : "border-opacity-0"
                )}
                style={{ backgroundColor: `rgba(${color},1)` }}
                onClick={() => {
                  setTheme({ surface: color, background: color, button: color })
                  setOpen(false)
                }}
              ></div>
            )
          })}
        </div>
      </CustomModal>
    </>
  )
}

export default CustomTheme
