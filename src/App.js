import { ThemeProvider, createTheme } from "@mui/material"
import RouterProvider from "Routes"
import AuthProvider from "Shared/AuthProvider"
import CustomTheme from "Shared/Theme"
import { useLocalStorage } from "react-mkx-storage"

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", {
    button: "244, 63, 94",
    surface: "rgba(255, 255, 255, 1)",
  })
  const themeConfig = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: `rgba(${theme.button}, 1)`,
        900: `rgba(${theme.button}, 0.9)`,
        800: `rgba(${theme.button}, 0.8)`,
        700: `rgba(${theme.button}, 0.7)`,
        600: `rgba(${theme.button}, 0.6)`,
        500: `rgba(${theme.button}, 0.5)`,
        400: `rgba(${theme.button}, 0.4)`,
        300: `rgba(${theme.button}, 0.3)`,
        200: `rgba(${theme.button}, 0.2)`,
        100: `rgba(${theme.button}, 0.1)`,
      },
    },
  })

  return (
    <AuthProvider>
      <CustomTheme theme={theme} setTheme={setTheme}>
        <ThemeProvider theme={themeConfig}>
          <RouterProvider />
        </ThemeProvider>
      </CustomTheme>
    </AuthProvider>
  )
}

export default App
