import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { Button, ButtonGroup, Stack } from "@mui/material";
import Search from "@/common/Search";
import Loading from "@/app/loading";
import { eventColumns } from "../_constants/eventConstants";
import { EventManagementFilterHook } from "../_hooks/eventManagementHook";

const filterBtnNameBulgarian = [
  "Описание",
  "Време",
  "Действие",
  "Ниво",
  "Oid",
  "Име",
  "Имейл",
  "Група"
];

export default function EventManagementGrid() {
  const {
    searchLogs,
    setFilterStateOnClick,
    getLogsLoading,
    filterState,
    filterLogs
  } = EventManagementFilterHook();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Детайли
      </Typography>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Box>
            {getLogsLoading ? (
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
                <Stack>
                  <Search onChange={searchLogs} />
                  <ButtonGroup>
                    {Object.entries(filterState).map(([key, value], index) => {
                      return (
                        <Button
                          key={index}
                          variant={value ? "contained" : "outlined"}
                          onClick={() => setFilterStateOnClick(key)}
                        >
                          {filterBtnNameBulgarian[index]}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </Stack>
                <DataGrid
                  rows={filterLogs}
                  columns={eventColumns}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                  }
                  initialState={{
                    pagination: { paginationModel: { pageSize: 50 } }
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
