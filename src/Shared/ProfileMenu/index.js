import { AccountCircle, Logout, TaskAlt } from "@mui/icons-material"
import { Avatar, Divider, ListItemButton, Menu, useTheme } from "@mui/material"
import { checkInCheckOutInDetailFn, checkInCheckOutInFn } from "Services/Profile"
import { useProfile } from "Settings"
import { useState } from "react"
import { useCurrentLocation } from "react-mkx-toolkit"
import { useMutation, useQuery } from "react-query"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export const LogoutBusiness = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  localStorage.removeItem("name")
  localStorage.removeItem("logo")
  window.location.href = "/"
}

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { latitude, longitude } = useCurrentLocation()

  const { profile } = useProfile()
  const isAdmin = profile?.role === "Admin"

  const open = Boolean(anchorEl)

  const handleClick = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const { data, refetch } = useQuery(["checkInCheckOutInDetail"], () => checkInCheckOutInDetailFn())

  const { mutate: checkInCheckOutIn } = useMutation(checkInCheckOutInFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setAnchorEl(null)
      refetch()
    },
  })
  const status = data?.data?.data

  const theme = useTheme()

  return (
    <>
      <Avatar
        sx={{ backgroundColor: theme.palette.primary.main }}
        src={profile?.profile_pic}
        alt={profile?.name}
        onClick={handleClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="!top-3"
        MenuListProps={{ className: "!w-56" }}
      >
        <div className="flex flex-col items-center justify-center gap-2 py-3">
          <Avatar
            sx={{ backgroundColor: theme.palette.primary.main }}
            alt={profile?.name}
            src={profile?.profile_pic}
            className="!text-2xl !capitalize !h-14 !w-14"
          />
          <div className="flex flex-col items-center justify-center ">
            <p className="capitalize">{profile?.name}</p>
            <p className="text-xs">{profile?.email}</p>
          </div>
        </div>
        <Divider />
        <Link to="/profile">
          <ListItemButton className="!flex gap-2" onClick={handleClose}>
            <AccountCircle /> Profile
          </ListItemButton>
        </Link>

        {!isAdmin && (
          <ListItemButton
            disabled={status === "checked out"}
            className="!flex !capitalize gap-2"
            onClick={() =>
              latitude && longitude
                ? checkInCheckOutIn({ latitude, longitude })
                : toast.error("Location permission required.")
            }
          >
            <p
              className={
                status === "checked out"
                  ? "!text-green-500"
                  : status === "checked in"
                  ? "!text-blue-500"
                  : "text-red-500"
              }
            >
              <TaskAlt /> {status}
            </p>
          </ListItemButton>
        )}

        {/* <Link to="/reset-password">
          <ListItemButton className="!flex gap-2" onClick={handleClose}>
            <LockReset />
            Change Password
          </ListItemButton>
        </Link> */}
        <ListItemButton className="!flex gap-2" onClick={LogoutBusiness}>
          <Logout />
          Logout
        </ListItemButton>
      </Menu>
    </>
  )
}

export default ProfileMenu
