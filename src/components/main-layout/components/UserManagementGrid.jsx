import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import { useSelector } from "react-redux";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { useState } from "react";
import ConfirmDialogYesNo from "@/components/dialog/ConfirmDialogYesNo";
import UserManagementData from "../internals/data/UserManagementGridData";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import { DataGrid } from "@mui/x-data-grid";

const data = [];

export default function UserManagementGrid() {
  const [contextMenu, setContextMenu] = useState();
  const { rows, columns, setRowsByParam } = UserManagementData();
  const [selectedUser, setSelectedUser] = useState();
  const [openContextYesNo, setOpenContexYesNo] = useState(false);
  const sessionToken = useSelector(selectSessionToken);

  const removeUser = async () => {
    try {
      const response = await fetch(
        `/api/doctoralCenter/admin/setRoles?role=${selectedUser.role}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionToken.accessToken
          },
          body: JSON.stringify(selectedUser.oid)
        }
      );
      const result = await response.json();
      return result;
    } catch (exception) {
      console.error(`Server error when trying to delete user: ${exception}`);
    }
  };

  const onButtonConfirmOnClick = async () => {
    await removeUser();
    const updatedRows = rows.filter((elem) => elem.oid !== selectedUser.oid);
    setRowsByParam(updatedRows);
  };

  const handleContextMenu = (event, index) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            top: event.clientY - 6,
            left: event.clientX + 2,
            index
          }
        : null
    );
  };

  const deleteUser = () => {};

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
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
        <Grid size={{ xs: 12, lg: 9 }}></Grid>

        <Box>
          {rows.length == 0 ? (
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
                onColumnHeaderContextMenu={(event) =>
                  handleContextMenu(event, 0)
                }
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

          {openContextYesNo && (
            <ConfirmDialogYesNo
              title={`Изтриване на потребител: ${selectedUser.name} `}
              contentText={
                "Разрешете потребителят към системата и му добавете ролята"
              }
              onButtonConfirmClick={onButtonConfirmOnClick}
            />
          )}
        </Box>
      </Grid>
    </Box>
  );
}
