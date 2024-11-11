import { Circle, Close } from "@mui/icons-material"
import { Dialog, Divider, IconButton, List, ListItem, Skeleton } from "@mui/material"
import React, { useState } from "react"
import CustomDiv from "../CustomDiv"
import CustomButton from "../CustomButton"
import { useQuery } from "react-query"
import { storeLabelsFn } from "../../Services/Sales/Customers/CustomerTypeLabels"

const Labels = ({ labelType }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { data: storeTypeLabels, isLoading } = useQuery(
    ["storeTypeLabels", labelType],
    () => storeLabelsFn({ label_type: labelType }),
    { enabled: labelType ? true : false }
  )
  return (
    <>
      <CustomButton size="medium" onClick={handleOpen} startIcon={<Circle fontSize="small" />}>
        Labels
      </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={CustomDiv}
        PaperProps={{
          className: "!p-1 backdrop-blur-md min-w-[20%]",
        }}
      >
        <span className="flex items-center justify-between p-1">
          <span className="flex items-center gap-1">
            {["#F1C40F", "#E74C3C", "#07BC0C"]?.map((color) => (
              <Circle className="!text-base" sx={{ color }} />
            ))}
            <p>Labels</p>
          </span>
          <IconButton size="small" onClick={handleClose}>
            <Close />
          </IconButton>
        </span>
        <Divider className="!my-0" />
        <List className="!py-0">
          {isLoading
            ? [1, 2, 3, 4, 5, 6]?.map((index) => {
                return (
                  <span key={index}>
                    <ListItem className="!flex !items-center gap-2">
                      <Skeleton component={Circle} className="!scale-100 !rounded-full" />{" "}
                      <Skeleton className="!w-full" />
                    </ListItem>
                    <Divider />
                  </span>
                )
              })
            : storeTypeLabels?.data?.data?.map((label, index) => {
                return (
                  <span key={index}>
                    <ListItem className="!flex !items-center gap-2">
                      <Circle
                        fontSize="small"
                        sx={{
                          color: label.color,
                        }}
                      />
                      {label.label}
                    </ListItem>
                    <Divider />
                  </span>
                )
              })}
        </List>
      </Dialog>
    </>
  )
}

export default Labels
