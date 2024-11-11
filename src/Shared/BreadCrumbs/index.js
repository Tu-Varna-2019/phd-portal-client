import { CloseTwoTone } from "@mui/icons-material"
import { Chip, useTheme } from "@mui/material"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CustomDiv from "../CustomDiv"

const BreadCrumbs = ({ navItem, navLink, id }) => {
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const [value, setValue] = useState("")
  const { state } = useLocation()

  useEffect(() => {
    state && setValue(state)
  }, [state])

  const navigate = useNavigate()

  const handleClose = (event, id, index) => {
    event.stopPropagation()
    setBreadCrumbs(breadCrumbs.filter((item) => item.id !== id))
    navigate(breadCrumbs[index - 1].navLink, { state: value })
  }

  useEffect(() => {
    if (breadCrumbs.length === 0 || breadCrumbs.filter((item) => item.id === id).length === 0) {
      setBreadCrumbs([...breadCrumbs, { id, navItem, navLink }])
    }
  }, [id])

  useEffect(() => {
    document.title = navItem
  }, [navItem])

  return (
    <CustomDiv className="flex !p-0 items-center gap-1 overflow-x-auto overflow-y-hidden breadcrambs rounded-lg">
      <div className="flex items-center gap-0.5 w-[84vw] transition-all duration-300 overflow-x-auto overflow-y-hidden breadcrambs rounded-lg px-0.5 py-1">
        {breadCrumbs.map((item, index) => {
          return (
            <Chip
              label={item.navItem}
              color="primary"
              sx={{ background: item.id === id ? useTheme().palette.primary.main : useTheme().palette.primary["700"] }}
              className={classNames("!rounded-md flex items-center px-2 py-1", item.id === id ? "!text-white" : "")}
              onClick={() => navigate(item.navLink, { state: value })}
              onDelete={(e) => index !== 0 && handleClose(e, item.id, index)}
              deleteIcon={<CloseTwoTone className={item.id === id ? "!text-white" : ""} />}
            />
          )
        })}
      </div>
    </CustomDiv>
  )
}

export default BreadCrumbs
