import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";

export default function TableToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarExport csvOptions={{ fileName: "export.csv" }} />
    </GridToolbarContainer>
  );
}
