import BreadCrumbs from "Shared/BreadCrumbs"
import Header from "Shared/Header"
import Sidebar from "Shared/Sidebar"
import { useThemeContext } from "Shared/Theme"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Layout component
 * @param {Object} props - Component props
 * @param {React.JSX.Element} props.component - The main component to render
 * @param {string} props.navItem - The navigation item
 * @param {string} props.navLink - The navigation link
 * @param {string} props.id - The unique identifier
 */

export const Layout = ({ component, navItem, navLink, id }) => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const { theme } = useThemeContext()

  useEffect(() => {
    !token && navigate("/")
  }, [token])

  return (
    <div
      style={{ backgroundColor: `rgba(${theme.button},0.1)` }}
      className="relative flex h-screen p-1 bg-cover gap-x-1"
    >
      <Sidebar />
      <div className="flex !z-40 flex-col gap-1 2xl:w-[85vw] lg:w-[84vw] h-full">
        <Header navItem={navItem} />
        <BreadCrumbs navItem={navItem} navLink={navLink} id={id} />
        <div className="!z-20 rounded-lg h-full w-full overflow-auto">{component}</div>
      </div>
    </div>
  )
}

export default Layout
