import Grid from "@mui/material/Grid2";
import StatCard from "./StatCard";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import { useState } from "react";
import ConfirmDialogComboBox from "@/components/dialog/ConfirmDialogComboBox";
import { formatToServerTimestamp } from "@/lib/utils";
import DoctoralCenterAPI from "@/lib/api/doctralCenter";
import UnauthorizedUsersGridData from "../internals/data/UnauthorizedUsersGridData";

const data = [
  {
    title: "Неоторизирани потребители",
    value: "111111111",
    interval: "Общо",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920
    ]
  },
  {
    title: "Добавени потребители",
    value: "325",
    interval: "Последните 30 дни",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220
    ]
  }
];

export default function UnauthorizedUsersGrid() {
  const { rows, columns, setRowsByParam, getUnauthorizedLoading } =
    UnauthorizedUsersGridData();
  const [selectedRows, setSelectedRows] = useState([]);
  const [roleOption, setRoleOption] = useState();
  const { setUnauthorizedUserRoles } = DoctoralCenterAPI();

  const onAutocompleteChange = (option) => {
    setRoleOption(option);
  };

  const setRoles = async (unauthorizedUsers) => {
    const normalizedUnauthUsers = unauthorizedUsers.map((item) => ({
      oid: item.oid,
      name: item.name,
      email: item.email,
      timestamp: formatToServerTimestamp(item.timestamp)
    }));

    const result = await setUnauthorizedUserRoles(
      normalizedUnauthUsers,
      roleOption
    );

    return result;
  };

  const onButtonPermitOnClick = async () => {
    const unauthorizedUsers = rows.filter((elem) =>
      selectedRows.includes(elem.id)
    );
    await setRoles(unauthorizedUsers);

    const permittedUsers = rows.filter(
      (elem) => !selectedRows.includes(elem.id)
    );
    setRowsByParam(permittedUsers);
  };

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
                <LoadingPageCircle />
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

            {selectedRows.length != 0 && (
              <ConfirmDialogComboBox
                title={"Разреши потебител към системата"}
                contentText={
                  "Разрешете потребителят към системата и му добавете ролята"
                }
                options={["expert", "manager"]}
                buttonName={"Разреши"}
                label={"Роля"}
                onButtonConfirmClick={onButtonPermitOnClick}
                onAutocompleteChange={onAutocompleteChange}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
