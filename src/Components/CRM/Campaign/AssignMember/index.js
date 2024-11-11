import { Assignment } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { CreatorSelect } from "Helpers"
import { changeMemberFn } from "Services/CRM/Campaign"
import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const AssignMember = ({ refetch, campaign_id, campaign_member_id }) => {
  const [open, setOpen] = useState(false)

  const { mutate: changeMember } = useMutation(changeMemberFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const initialValues = { campaign_member_id: campaign_member_id || "" }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      changeMember({ campaign_id, ...formik.values })
    },
  })

  return (
    <>
      <Tooltip arrow placement="top" title="Assign">
        <IconButton size="small" onClick={() => setOpen(true)}>
          <Assignment color="primary" />
        </IconButton>
      </Tooltip>

      <CustomModal open={open} setOpen={setOpen} title={`Assign Member`} className="w-[430px]" padding={4}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <CreatorSelect formik={formik} />
          <span className="flex items-center justify-center w-full p-3">
            <CustomButton type="submit">Proceed</CustomButton>
          </span>
        </form>
      </CustomModal>
    </>
  )
}

export default AssignMember
