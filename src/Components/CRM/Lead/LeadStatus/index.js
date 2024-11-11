import { Sync } from "@mui/icons-material"
import { IconButton, MenuItem, Tooltip } from "@mui/material"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { changeLeadStatusFn } from "Services/CRM/Lead"

import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import CustomSelect from "Shared/CustomSelect"

export const leadStatus = ["In Discussion", "Converted", "Lost"]

const LeadStatus = ({ disabled, lead_id, lead_status }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(lead_status)
  const client = useQueryClient()

  const { mutate: changeLeadStatus } = useMutation(changeLeadStatusFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("leads")
      setOpen(false)
    },
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    changeLeadStatus({ lead_id, lead_status: value })
  }

  return (
    <>
      <Tooltip arrow placement="top" title="Change Lead Status">
        <IconButton
          disabled={lead_status === "Converted" || disabled}
          color="primary"
          size="small"
          onClick={() => setOpen(true)}
        >
          <Sync />
        </IconButton>
      </Tooltip>

      <CustomModal open={open} setOpen={setOpen} title="Lead Status" className="w-[430px]" padding={0}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-3">
          <CustomSelect
            id="lead_status"
            label="Lead Status"
            placeholder="Select Lead Status"
            disabled={lead_status === "Converted"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          >
            {leadStatus?.map((status) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </CustomSelect>

          <span className="flex items-center justify-center w-full p-3">
            <CustomButton disabled={lead_status === "Converted"} type="submit">
              Proceed
            </CustomButton>
          </span>
        </form>
      </CustomModal>
    </>
  )
}

export default LeadStatus
