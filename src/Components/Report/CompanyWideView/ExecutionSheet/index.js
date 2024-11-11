import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
const executionSheetData = [
  {
    taskName: "Task 4",
    startDate: "2024-04-12",
    endDate: "2024-04-15",
    assignedTo: "Michael Brown",
    status: "Pending",
    notes: "Sed euismod dui at nisi varius aliquet. Nulla nec ipsum ut arcu commodo ultrices.",
  },
  {
    taskName: "Task 5",
    startDate: "2024-04-18",
    endDate: "2024-04-20",
    assignedTo: "Emily Wilson",
    status: "In Progress",
    notes: "Duis sed efficitur turpis, et dignissim velit. Morbi ultrices malesuada diam.",
  },
  {
    taskName: "Task 6",
    startDate: "2024-04-22",
    endDate: "2024-04-25",
    assignedTo: "David Lee",
    status: "Completed",
    notes: "Phasellus vel odio in purus fermentum tempor. Cras ac velit non purus fermentum commodo.",
  },
  {
    taskName: "Task 7",
    startDate: "2024-04-26",
    endDate: "2024-04-30",
    assignedTo: "Sophia Martinez",
    status: "In Progress",
    notes: "Etiam ut magna in neque eleifend tincidunt. Vestibulum id ultricies felis.",
  },
  {
    taskName: "Task 8",
    startDate: "2024-05-01",
    endDate: "2024-05-05",
    assignedTo: "Daniel Thompson",
    status: "Pending",
    notes:
      "Pellentesque tempor purus ac dui auctor, in ullamcorper enim fermentum. Fusce at diam et lacus aliquet interdum.",
  },
  {
    taskName: "Task 9",
    startDate: "2024-05-08",
    endDate: "2024-05-10",
    assignedTo: "Olivia Garcia",
    status: "Completed",
    notes:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut mi tincidunt, tincidunt odio nec, tincidunt lorem.",
  },
  {
    taskName: "Task 10",
    startDate: "2024-05-12",
    endDate: "2024-05-15",
    assignedTo: "William Hernandez",
    status: "In Progress",
    notes: "Mauris auctor libero at sapien rhoncus, id ultricies urna elementum. Nulla facilisi.",
  },
]

const ExecutionSheet = () => {
  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput type="search" placeholder="Search" />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Task Name</TableCell>
              <TableCell isHead>Start Date</TableCell>
              <TableCell isHead>End Date</TableCell>
              <TableCell isHead>Assigned To</TableCell>
              <TableCell isHead>Status</TableCell>
              <TableCell isHead>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {executionSheetData.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.endDate}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={executionSheetData} />
      <CustomPagination />
    </CustomDiv>
  )
}

export default ExecutionSheet
