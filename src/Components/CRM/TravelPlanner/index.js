import { Delete, Visibility } from "@mui/icons-material"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteTravelPlannerFn, travelPlannersFn } from "Services/CRM/TravelPlanner"
import { usePermission } from "Settings"
import CustomDiv from "Shared/CustomDiv"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import ManageTravelPlanner from "./ManageTravelPlanner"
import Note from "./Note"
import CustomButton from "Shared/CustomButton"

const TravelPlanner = () => {
  const [note, setNote] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const isDeletePermit = usePermission("delete_travelplanner")
  const isAddPermit = usePermission("add_travelplanner")
  const isViewPermit = usePermission("view_travelplanner")
  const isChangePermit = usePermission("change_travelplanner")

  const { data, isLoading, refetch } = useQuery(
    ["travelPlanners", page, search, isViewPermit],
    () => travelPlannersFn({ page, search }),
    { enabled: isViewPermit }
  )

  const travelPlanners = data?.data?.data

  const { mutate: deleteTravelPlanner } = useMutation(deleteTravelPlannerFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <CustomInput
            placeholder="Search Travel Planner"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <ManageTravelPlanner isAddPermit={isAddPermit} refetch={refetch} />
        </div>
        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>Travel Planner No</TableCell>
                <TableCell isHead>Location</TableCell>
                <TableCell isHead>Start Date</TableCell>
                <TableCell isHead>End Date</TableCell>
                <TableCell isHead>Note</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CustomLoader loading={isLoading} row={5} />
              {travelPlanners?.map((planner) => {
                return (
                  <TableRow>
                    <TableCell>{planner.planner_no}</TableCell>
                    <TableCell>{planner.location}</TableCell>
                    <TableCell>{moment(planner.start_date).format("ll")}</TableCell>
                    <TableCell>{moment(planner.end_date).format("ll")}</TableCell>
                    <TableCell>
                      <CustomButton
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => setNote(planner.description)}
                      >
                        View
                      </CustomButton>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <ManageTravelPlanner
                          travel_planner_id={planner.id}
                          isUpdate
                          isChangePermit={isChangePermit}
                          refetch={refetch}
                        />

                        <CustomIconButton
                          color="error"
                          onClick={() =>
                            isDeletePermit
                              ? deleteTravelPlanner({ travel_planner_ids: [planner.id] })
                              : toast.warn("You don't have permission for delete planned travel.")
                          }
                        >
                          <Delete />
                        </CustomIconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <NoDataFound data={data} />
        <CustomPermission label="planned travel" isPermit={isViewPermit} />
        <CustomPagination setPage={setPage} data={data} />
        <Note note={note} setNote={setNote} />
      </CustomDiv>
    </>
  )
}

export default TravelPlanner
