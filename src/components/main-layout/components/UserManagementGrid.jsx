import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import ConfirmDialogYesNo from "@/components/dialog/ConfirmDialogYesNo";
import UserManagementGridData from "../internals/data/UserManagementGridData";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import { DataGrid } from "@mui/x-data-grid";
import DoctoralCenterAPI from "@/lib/api/doctralCenter";

const data = [];

export default function UserManagementGrid() {
  const {
    rows,
    dialogTitle,
    dialogContent,
    columns,
    openDialogBoxYesNo,
    setOpenDialogBoxYesNo,
    selectedUser,
    setRows,
    getAuthorizedUsers
  } = UserManagementGridData();

  const { deleteAuthorizedUser } = DoctoralCenterAPI();

  const buttonConfirmOnClick = async () => {
    await deleteAuthorizedUser(selectedUser.oid, selectedUser.role);

    const updatedRows = rows.filter((elem) => elem.oid !== selectedUser.oid);
    setRows(updatedRows);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Изглед
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Детайли
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Box>
          {getAuthorizedUsers ? (
            <>
              <Typography
                textAlign="center"
                alignItems="center"
                justifyContent="center"
              >
                Моля изчакайте
              </Typography>
              <LoadingPageCircle />
            </>
          ) : (
            <>
              <DataGrid
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
            </>
          )}

          <ConfirmDialogYesNo
            title={dialogTitle}
            contentText={dialogContent}
            onButtonConfirmClick={buttonConfirmOnClick}
            open={openDialogBoxYesNo}
            setOpen={setOpenDialogBoxYesNo}
          />
        </Box>
      </Grid>
    </Box>
  );
}
