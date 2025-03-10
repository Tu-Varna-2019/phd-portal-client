import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  rows,
  columns,
  checkboxEnabled = false,
  onRowSelect,
  density = "compact"
}) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection={checkboxEnabled}
      onRowSelectionModelChange={onRowSelect}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } }
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      dataSet="Commodity"
      density={density}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small"
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" }
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" }
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small"
              }
            }
          }
        }
      }}
    />
  );
}
