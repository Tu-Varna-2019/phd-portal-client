import * as Material from "@mui/material"
import { sidebarData } from "Mock"
import logo from "Resources/opraah-logo.png"
import { useAuthContext } from "Shared/AuthProvider"
import CustomDiv from "Shared/CustomDiv"
import Image from "Shared/Image"
import classNames from "classnames"
import { useLocation, useNavigate } from "react-router-dom"

const Sidebar = () => {
  const { pathname } = useLocation()
  const [department] = useAuthContext()
  const navigate = useNavigate()
  const theme = Material.useTheme()

  return (
    <>
      <div
        id="sidebar"
        className="flex gap-y-1 flex-col w-[15vw] justify-between !text-sm transition-all duration-500 h-full"
      >
        <Material.ListItem component={CustomDiv} className="!font-semibold !text-xl items-center !flex gap-2 !py-5">
          <Image src={logo} options={{ className: "h-12" }} />
        </Material.ListItem>

        <Material.List
          component={CustomDiv}
          className="flex flex-col !p-1 justify-between w-full hide-scroll relative overflow-y-auto h-full"
        >
          <span className="flex flex-col gap-px">
            {sidebarData.map((navItem) => {
              const isActive = navItem.navLink === pathname
              if (
                navItem.access_level.includes(department.toUpperCase()) ||
                navItem.access_level.includes("ALL") ||
                navItem.access_level.includes(
                  department.toUpperCase() !== "FINANCE" && department.toUpperCase() !== "HR" && "TEAM"
                )
              )
                return (
                  <Material.ListItemButton
                    key={navItem.id}
                    sx={{
                      backgroundColor: isActive ? theme.palette.primary.main : "",
                      ":hover": { backgroundColor: theme.palette.primary["800"], color: "white" },
                    }}
                    onClick={() => navigate(navItem.navLink)}
                    className={classNames(
                      "!pl-4 !p-1 !flex !justify-between group !whitespace-nowrap !rounded-md !w-full",
                      isActive ? "!text-white !font-bold" : ""
                    )}
                  >
                    <span className="flex items-center gap-3 overflow-x-hidden w-fit">
                      <span
                        className="group-hover:!text-white"
                        style={{ color: isActive ? "white" : Material.useTheme().palette.primary.main }}
                      >
                        {navItem.navIcon}
                      </span>
                      <p className="!overflow-x-hidden !whitespace-nowrap w-full !text-ellipsis">{navItem.navItem}</p>
                    </span>
                  </Material.ListItemButton>
                )
            })}
          </span>
        </Material.List>
      </div>
    </>
  )
}

export default Sidebar
