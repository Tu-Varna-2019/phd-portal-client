import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ConfirmDialogComboBox from "@/components/dialog-box/ConfirmDialogComboBox";
import DoctoralCenterAdminAPI from "@/api/doctoralCenterAdmin";
import UnauthorizedUsersGridData from "../_lib/UnauthorizedUsersGridData";
import AlertBox from "@/common/AlertBox";
import { useAppDispatch } from "@/features/constants";

import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import UnauthorizedUsers from "@/models/UnauthorizedUsers";
import APIWrapper from "@/lib/helpers/APIWrapper";

export default function UnauthorizedUsersGrid() {
  const { rows, columns, setRowsByParam } = UnauthorizedUsersGridData();
  const [selectedRows, setSelectedRows] = useState([]);
  const [groupOption, setGroupOption] = useState("");
  const { setUnauthorizedUserGroup } = DoctoralCenterAdminAPI();
  const dispatch = useAppDispatch();

  const { logNotifyAlert } = APIWrapper();

  const optionsEN = ["phd", "committee", "supervisor"];
  const optionsBG = [
    "докторант",
    "член от комитет",
    "ръководител на докторант"
  ];

  const onAutocompleteChange = (index, _) => {
    setGroupOption(optionsEN[index]);
  };

  const setGroups = async (unauthorizedUsers) => {
    const normalizedUnauthUsers =
      UnauthorizedUsers.getServerFormatList(unauthorizedUsers);

    await setUnauthorizedUserGroup(normalizedUnauthUsers, groupOption);
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = rows.filter((elem) =>
      selectedRows.includes(elem.id)
    );
    await setGroups(unauthorizedUsers);

    const message = [];
    unauthorizedUsers.map((user) => {
      message.push(
        `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`
      );

      logNotifyAlert({
        title: "Потребител добавен в системата",
        description: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
        message: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
        action: `Потребителят ${user.email} е добавен в системата като група: ${groupOption}`,
        level: "success",
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
