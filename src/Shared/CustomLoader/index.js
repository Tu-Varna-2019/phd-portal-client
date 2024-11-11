/**
 * CustomLoader component that renders a loading skeleton based on the provided row and column values.
 * @param {boolean} loading - Indicates if the loader should be displayed.
 * @param {number} row - Number of rows for the loader.
 * @param {number} [col=10] - Number of columns for the loader, defaults to 10 if not provided.
 * @returns {JSX.Element} - Returns the loading skeleton component.
 */
import { Skeleton, TableRow } from "@mui/material"
import { randomArray } from "Shared/RandomArray"
import { TableCell } from "Shared/Table"

export const CustomLoader = ({ loading, row, col = 10 }) => {
  return loading ? (
    randomArray(0, col).map((i) => (
      <TableRow key={i}>
        {randomArray(0, row).map((i) => (
          <TableCell key={i}>
            <Skeleton />
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <></>
  )
}
