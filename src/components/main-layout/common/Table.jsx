import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  key,
  rows,
  selectedRows,
  columns,
  checkboxEnabled = false,
  disableMultiCheckboxSelection = false,
  onRowSelect,
  onRowSelectDisable = false,
  density = "compact" // compact, comfortable, ...
}) {
  return (
    <DataGrid
      key={key}
      rows={rows}
      columns={columns}
      rowSelectionModel={selectedRows}
      checkboxSelection={checkboxEnabled}
      onRowSelectionModelChange={onRowSelect}
      isRowSelectable={onRowSelectDisable}
      disableMultipleRowSelection={disableMultiCheckboxSelection}
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
