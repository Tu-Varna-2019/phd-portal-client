import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import CustomModal from "Shared/CustomModal"
import { TableCell } from "Shared/Table"

const Participants = ({ participants, setParticipants }) => {
  const open = Boolean(participants)

  return (
    <CustomModal title="Participants" open={open} setOpen={setParticipants} padding={0}>
      <TableContainer>
        <Table className="whitespace-nowrap">
          <TableHead>
            <TableRow>
              <TableCell isHead>Participant ID</TableCell>
              <TableCell isHead>Participant</TableCell>
              <TableCell isHead>Participant Type</TableCell>
              <TableCell isHead>Participant Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {participants &&
              participants?.map((participant) => {
                return (
                  <TableRow key={participant.id} className="hover:bg-white mkx hover:bg-opacity-20">
                    <TableCell>{participant.id}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell className="!capitalize">{participant.participant_type?.replaceAll("_", " ")}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomModal>
  )
}

export default Participants
