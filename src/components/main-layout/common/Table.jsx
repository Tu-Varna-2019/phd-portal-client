import { DataGrid } from "@mui/x-data-grid";
import TableToolbar from "./TableToolbar";

export default function Table({
  key,
  rows,
  selectedRows,
  columns,
  checkboxEnabled = false,
  disableMultiCheckboxSelection = false,
  onRowSelect,
  onRowSelectDisable = false,
  showToolbar = false,
  density = "compact" // compact, comfortable, ...
}) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        key={key}
        rows={rows}
        columns={columns}
        rowSelectionModel={selectedRows}
        checkboxSelection={checkboxEnabled}
        onRowSelectionModelChange={onRowSelect}
        isRowSelectable={onRowSelectDisable}
        disableMultipleRowSelection={disableMultiCheckboxSelection}
        slots={{ toolbar: showToolbar ? TableToolbar : undefined }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 40 } }
        }}
        pageSizeOptions={[10, 20, 50]}
        dataSet="Commodity"
        density={density}
        slotProps={{
          tooltip: { title: "Export data" },
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
    </div>
  );
}
