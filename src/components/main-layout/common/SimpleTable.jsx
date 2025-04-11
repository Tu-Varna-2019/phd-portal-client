import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Translate from "@/lib/helpers/Translate";

export default function SimpleTable({ rows, headerNames, rowKeys }) {
  const { tr } = Translate();

  console.log(`Rows are: ${JSON.stringify(rows)}`);
  console.log(`Type of ${Array.isArray(rows)}`);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headerNames.map((header, index) => (
              <TableCell key={index}>{tr(header)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(rows) ? (
            rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell key={index} component="th" scope="row">
                  {typeof row == "object" ? tr(row[rowKeys[index]]) : tr(row)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {rowKeys.map((key, index) => (
                <TableCell key={index} component="th" scope="row">
                  {tr(rows[key])}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
