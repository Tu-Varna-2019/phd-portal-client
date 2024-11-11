import { Add, Close, Edit, Save } from "@mui/icons-material"
import { addTravelPlannerFn, travelPlannerDetailFn, updateTravelPlannerFn } from "Services/CRM/TravelPlanner"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"

const ManageTravelPlanner = ({ isAddPermit, isChangePermit, travel_planner_id, refetch, isUpdate = false }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const { data } = useQuery(
    ["travelPlannerDetail", travel_planner_id, open],
    () => travelPlannerDetailFn({ travel_planner_id }),
    { enabled: Boolean(travel_planner_id && open) }
  )

  const travelPlan = data?.data?.data

  const handleResponse = (data) => {
    toast.success(data.message)
    refetch()
    setOpen(false)
  }

  const { mutate: addTravelPlanner, isLoading: isAdding } = useMutation(addTravelPlannerFn, {
    onSuccess: ({ data }) => {
      handleResponse(data)
    },
  })

  const { mutate: updateTravelPlanner, isLoading: isUpdating } = useMutation(updateTravelPlannerFn, {
    onSuccess: ({ data }) => {
      handleResponse(data)
    },
  })

  const initialValues = {
    start_date: travelPlan?.start_date ? travelPlan?.start_date?.slice(0, 10) : "",
    end_date: travelPlan?.end_date ? travelPlan?.end_date?.slice(0, 10) : "",
    location: travelPlan?.location || "",
    description: travelPlan?.description || "",
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      isUpdate ? updateTravelPlanner({ travel_planner_id, ...formik.values }) : addTravelPlanner(formik.values)
    },
  })

  return (
    <>
      {isUpdate ? (
        <CustomIconButton
          color="success"
          onClick={() =>
            isChangePermit ? setOpen(true) : toast.warn("You don't have permission for update travel plan.")
          }
        >
          <Edit />
        </CustomIconButton>
      ) : (
        <CustomButton
          startIcon={<Add />}
          color="primary"
          onClick={() => (isAddPermit ? setOpen(true) : toast.warn("You don't have permission for plan a travel."))}
        >
          Plan a Travel
        </CustomButton>
      )}
      <CustomModal
        title={isUpdate ? "Update Travel Plan" : "Plan a Travel"}
        open={Boolean(open)}
        setOpen={setOpen}
        className="w-1/3"
        padding={0}
      >
        <form ref={ref} onSubmit={formik.handleSubmit} className="flex flex-col gap-2 p-5">
          <div className="grid grid-cols-2 gap-2">
            <CustomInput isRequired id="start_date" type="date" label="Start Date" formik={formik} />
            <CustomInput isRequired id="end_date" type="date" label="End Date" formik={formik} />
          </div>
          <CustomInput isRequired id="location" label="Location" placeholder="Enter Location" formik={formik} />
          <CustomInput
            id="description"
            label="Notes"
            multiline
            rows={3}
            paddingX={0}
            placeholder="Enter Notes"
            formik={formik}
          />
          <div className="flex items-center justify-end gap-4 py-4">
            <CustomButton endIcon={<Close />} className="!px-5" onClick={() => setOpen(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              endIcon={<Save />}
              isLoading={isUpdating || isAdding}
              loadingContent="Saving..."
              type="submit"
              className="!px-5"
            >
              Submit
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </>
  )
}

export default ManageTravelPlanner
