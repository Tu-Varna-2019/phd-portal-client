import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import ConfirmDialogComboBox from "@/components/dialog-box/ConfirmDialogComboBox";
import AlertBox from "@/common/AlertBox";
import { UnauthorizedUsersHook } from "../_hooks/unauthorizedUsersHook";

export default function UnauthorizedUsersGrid() {
  const {
    setSelectedRows,
    rows,
    columns,
    optionsBG,
    groupOption,
    onButtonPermitOnClick,
    onAutocompleteChange
  } = UnauthorizedUsersHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Детайли
      </Typography>

      <Grid container spacing={2} columns={12} size={{ xs: 12, lg: 9 }}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <DataGrid
            checkboxSelection
            onRowSelectionModelChange={(selectedRows) =>
              setSelectedRows(selectedRows)
            }
            rows={rows}
            columns={columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } }
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
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
          <AlertBox />

          <ConfirmDialogComboBox
            title={"Разреши потебител към системата"}
            contentText={
              "Разрешете потребителят към системата и му добавете групата"
            }
            options={optionsBG}
            optionChosen={groupOption}
            buttonName={"Разреши"}
            label={"Група"}
            onButtonConfirmClick={onButtonPermitOnClick}
            onAutocompleteChange={onAutocompleteChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
