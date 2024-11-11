import { Close, NotificationsRounded } from "@mui/icons-material"
import { Badge, Checkbox, Menu, Skeleton, useTheme } from "@mui/material"
import { notificationsFn, readNotificationFn } from "Services/Profile"
import CustomDiv from "Shared/CustomDiv"
import CustomIconButton from "Shared/CustomIconButton"
import { randomArray } from "Shared/RandomArray"
import ScrollDiv from "Shared/ScrollDiv"
import moment from "moment"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [page, setPage] = useState(1)
  const [isRead, setIsRead] = useState(false)

  const { data, isLoading, refetch } = useQuery(["notifications", page, isRead], () =>
    notificationsFn({ page, status: isRead ? "Read" : "Unread" })
  )

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }

  const { mutate: readNotification } = useMutation(readNotificationFn, {
    onSuccess: () => {
      refetch()
    },
  })

  useEffect(() => {
    if (data?.data?.data) {
      if (page === 1 || data.isFetching) {
        setNotifications(data.data.data)
      } else {
        setNotifications((prev) => [...prev, ...data.data.data])
      }
    }
  }, [data, page])

  useEffect(() => {
    setPage(1)
  }, [isRead])

  return (
    <>
      <CustomIconButton color="primary" onClick={handleOpen}>
        <Badge badgeContent={data?.data?.notification_count || 0} color="primary">
          <NotificationsRounded />
        </Badge>
      </CustomIconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
        MenuListProps={{ disablePadding: true }}
        className="!top-[14px] flex flex-col"
      >
        <div className="flex items-center justify-between !p-0">
          <p className="px-2 font-semibold">Notifications</p>{" "}
          <Checkbox size="small" checked={isRead} onChange={(event) => setIsRead(event.target.checked)} />
        </div>

        <ScrollDiv
          page={page}
          setPage={setPage}
          height={384}
          totalPage={data?.data?.total_pages}
          className="!w-80 flex flex-col gap-px overflow-y-scroll p-px"
        >
          {isLoading
            ? randomArray(0, 5).map(() => (
                <CustomDiv className="flex flex-col !rounded-sm gap-1 !p-2">
                  <Skeleton className="w-1/2 !h-3 !scale-100" />
                  <Skeleton className="w-full !h-3 !scale-100" />
                  <Skeleton className="w-1/3 !h-3 !scale-100" />
                </CustomDiv>
              ))
            : notifications?.map((notification) => (
                <CustomDiv elevation={6} key={notification.id} className="flex flex-col !py-1 !rounded-sm !px-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold capitalize" style={{ color: useTheme().palette.primary.main }}>
                      {notification.title || "Unknown"}
                    </p>
                    {!isRead && (
                      <Close
                        fontSize="small"
                        className="!transition-all cursor-pointer !duration-500"
                        sx={{
                          color: useTheme().palette.primary.main,
                          ":hover": { color: useTheme().palette.error.main },
                        }}
                        onClick={() => readNotification({ notification_ids: [notification.id] })}
                      />
                    )}
                  </div>
                  <p className="text-sm" style={{ color: useTheme().palette.primary["900"] }}>
                    {notification.content}
                  </p>
                  <p className="text-xs" style={{ color: useTheme().palette.primary.main }}>
                    {moment(notification.date).format("ll")}
                  </p>
                </CustomDiv>
              ))}
        </ScrollDiv>
      </Menu>
    </>
  )
}
