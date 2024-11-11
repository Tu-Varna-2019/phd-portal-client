import { Pagination } from "@mui/material"

/**
 * CustomPagination component represents a pagination control.
 * @param {object} props - Props object.
 * @param {string} [props.variant="outlined"] - The variant of the pagination control.
 * @param {Function} props.setPage - Function to set the current page.
 * @param {object} props.data - Data object containing pagination information.
 * @param {string} [props.color="primary"] - The color of the pagination control.
 * @param {object} rest - Additional props to pass to the Pagination component.
 * @returns {JSX.Element} - CustomPagination component.
 */
const CustomPagination = ({ variant = "outlined", setPage, data, color = "primary", ...rest }) => {
  return (
    <div className="flex items-center justify-end p-2">
      {data && data?.data?.total_pages && data?.data?.total_pages !== 1 && (
        <Pagination
          count={data?.data?.total_pages ?? 0}
          page={data?.data?.current_page ?? 0}
          showFirstButton
          showLastButton
          variant={variant}
          color={color}
          onChange={(_, value) => setPage && setPage(value)}
          {...rest}
        />
      )}
    </div>
  )
}

export default CustomPagination
