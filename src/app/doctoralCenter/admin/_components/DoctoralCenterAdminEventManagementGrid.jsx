import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Stack } from "@mui/material";
import EventManagementGridData from "../_lib/EventManagementGridData";
import Search from "@/components/main-layout/common/Search";

const initialFilterBtnVal = {
  description: false,
  formattedTimestamp: false,
  level: false,
  action: false,
  oid: false,
  name: false,
  email: false,
  group: false
};

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

export default function DoctoralCenterAdminEventManagementGrid() {
  const { rows, columns, getLogsLoading } = EventManagementGridData();
  const [filterLogs, setFilterLogs] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterBtnVal);

  const setAllFilters = (bool) => {
    const filter = Object.fromEntries(
      Object.entries(initialFilterBtnVal).map(([key]) => [key, bool])
    );
    return filter;
  };

  const isAnyFilterPressed = () => {
    return Object.values(filterState).some((value) => value == true);
  };

  useEffect(() => {
    setFilterLogs(rows);
  }, [rows]);

  const searchLogs = (event) => {
    const filterActivation = isAnyFilterPressed()
      ? filterState
      : setAllFilters(true);

    const searchInputFiltered = rows.filter((row) => {
      return Object.keys(row).some((item) => {
        if (filterActivation[item] && row[item] != null) {
          return (
            row[item].includes(event.target.value) ||
            row[item].includes(event.target.value.toLowerCase())
          );
        } else return false;
      });
    });

    if (event == "") setFilterLogs(rows);
    else setFilterLogs(searchInputFiltered);
  };

  const setFilterStateOnClick = (key) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
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
            {getLogsLoading ? (
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
                  columns={columns}
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
