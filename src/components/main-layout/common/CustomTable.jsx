import Typography from "@mui/material/Typography";

import {
  Paper,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.vars.palette.primary.dark
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export default function CustomTable({ columnNameList, columnValueList }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Допълнителна информация">
        <TableHead>
          {columnNameList.map((field, index) => {
            return (
              <TableRow key={index}>
                <StyledTableCell>
                  <strong>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ fontWeight: 500, lineHeight: "16px" }}
                    >
                      {field}
                    </Typography>
                  </strong>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{ fontWeight: 500, lineHeight: "16px" }}
                  >
                    <TableCell>
                      {Object.values(columnValueList)[index]}
                    </TableCell>
                  </Typography>
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableHead>
      </Table>
    </TableContainer>
  );
}
