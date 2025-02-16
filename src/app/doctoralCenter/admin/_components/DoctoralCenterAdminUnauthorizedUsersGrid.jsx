import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ConfirmDialogComboBox from "@/components/dialog-box/ConfirmDialogComboBox";
import DoctoralCenterAPI from "@/api/doctralCenter";
import UnauthorizedUsersGridData from "../_lib/UnauthorizedUsersGridData";
import NotificationAPI from "@/api/notification";
import AlertBox from "@/common/AlertBox";
import { useAppDispatch } from "@/features/constants";

import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import Loading from "@/app/loading";

export default function DoctoralCenterAdminUnauthorizedUsersGrid() {
  const { rows, columns, setRowsByParam, getUnauthorizedLoading } =
    UnauthorizedUsersGridData();
  const [selectedRows, setSelectedRows] = useState([]);
  const [roleOption, setRoleOption] = useState("");
  const { setUnauthorizedUserRoles } = DoctoralCenterAPI();
  const { saveNotification } = NotificationAPI();
  const dispatch = useAppDispatch();

  const optionsEN = ["expert", "manager", "admin"];
  const optionsBG = ["експерт", "ръководител", "администратор"];

  const onAutocompleteChange = (index, _) => {
    setRoleOption(optionsEN[index]);
  };

  const setRoles = async (unauthorizedUsers) => {
    const normalizedUnauthUsers =
      UnauthorizedUsers.getServerFormatList(unauthorizedUsers);

    await setUnauthorizedUserRoles(normalizedUnauthUsers, roleOption);
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = rows.filter((elem) =>
      selectedRows.includes(elem.id)
    );
    await setRoles(unauthorizedUsers);

    const message = [];
    unauthorizedUsers.map((user) => {
      message.push(
        `Потребителят ${user.email} е добавен в системата като роля: ${roleOption}`
      );

      saveNotification({
        title: "Потребител добавен в системата",
        description: `Потребителят ${user.email} е добавен в системата като роля: ${roleOption}`,
        severity: "success",
        scope: "group",
        group: "admin"
      });
    });

    dispatch(
      setAlertBox({
        message: message.join("\r\n"),
        severity: "success"
      })
    );

    const permittedUsers = rows.filter(
      (elem) => !selectedRows.includes(elem.id)
    );
    setRowsByParam(permittedUsers);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      ></Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Детайли
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Box>
            {getUnauthorizedLoading ? (
              <>
                <Typography
                  textAlign="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  Моля изчакайте
                </Typography>
                <Loading />
              </>
            ) : (
              <>
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
              </>
            )}

            <AlertBox />

            <ConfirmDialogComboBox
              title={"Разреши потебител към системата"}
              contentText={
                "Разрешете потребителят към системата и му добавете ролята"
              }
              options={optionsBG}
              optionChosen={roleOption}
              buttonName={"Разреши"}
              label={"Роля"}
              onButtonConfirmClick={onButtonPermitOnClick}
              onAutocompleteChange={onAutocompleteChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
