import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import ConfirmDialogComboBox from "@/components/dialog-box/ConfirmDialogComboBox";
import AlertBox from "@/common/AlertBox";
import UnauthorizedUsersHook from "../_hooks/UnauthorizedUsersHook";
import { columns } from "../_constants/unauthorizedUsersConstants";
import Table from "@/components/main-layout/common/Table";

export default function UnauthorizedUsersGrid() {
  const {
    unauthUsers,
    onAutocompleteChange,
    groupOption,
    onButtonPermitOnClick,
    setSelectedUsers,
    docCenterRolesBG
  } = UnauthorizedUsersHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Детайли
      </Typography>
      <Grid container spacing={2} columns={12} size={{ xs: 12, lg: 9 }}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Table
            checkboxEnabled={true}
            onRowSelect={(selectedRows) => setSelectedUsers(selectedRows)}
            rows={unauthUsers}
            columns={columns}
          />
          <AlertBox />

          <ConfirmDialogComboBox
            title={"Разреши потебител към системата"}
            contentText={
              "Разрешете потребителят към системата и му добавете групата"
            }
            options={docCenterRolesBG}
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
