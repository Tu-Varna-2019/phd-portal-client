import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import ConfirmDialogComboBox from "@/components/dialog-box/ConfirmDialogComboBox";
import AlertBox from "@/common/AlertBox";
import UnauthorizedUsersHook from "../_hooks/UnauthorizedUsersHook";
import Table from "@/components/main-layout/common/Table";
import Translate from "@/lib/helpers/Translate";
import UnauthorizedUsersConstants from "../_constants/unauthorizedUsersConstants";

export default function UnauthorizedUsersGrid() {
  const {
    unauthUsers,
    onAutocompleteChange,
    groupOption,
    onButtonPermitOnClick,
    setSelectedUsers,
    docCenterRolesBG
  } = UnauthorizedUsersHook();
  const { tr } = Translate();
  const { columns } = UnauthorizedUsersConstants();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
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
            title={tr("Allow user into the system")}
            contentText={tr(
              "Allow the user into the system and add him to a group"
            )}
            options={docCenterRolesBG}
            optionChosen={groupOption}
            buttonName={tr("Allow")}
            label={tr("group")}
            onButtonConfirmClick={onButtonPermitOnClick}
            onAutocompleteChange={onAutocompleteChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
