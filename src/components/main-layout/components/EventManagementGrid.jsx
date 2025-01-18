import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./StatCard";
import EventManagementGridData from "../internals/data/EventManagementGridData";
import { DataGrid } from "@mui/x-data-grid";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";
import Search from "./Search";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Stack } from "@mui/material";

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

const dashboardStruct = {
  title: "",
  value: 0,
  interval: "",
  trend: "neutral",
  data: []
};

export default function EventManagementGrid() {
  const { rows, columns, getLogsLoading } = EventManagementGridData();
  const [filterLogs, setFilterLogs] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterBtnVal);

  const [dashboardData, setDashboardData] = useState([]);

  const getUniqueUsers = () => {
    var uniqueUsers = dashboardStruct;
    const result = rows.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.email == item.email)
    );
    uniqueUsers.title = "Потребители";
    uniqueUsers.interval = "Всякога";
    uniqueUsers.value = result.length;

    return uniqueUsers;
  };

  const getTimeline = () => {
    var timeline = dashboardStruct;

    const result = Object.values(rows.map((key) => key.timestamp));
    console.log(`Timeline: ${typeof result}`);
    timeline.title = "Време на събитията";
    timeline.interval = "Всякога";
    timeline.value = result.length;
    timeline.data = result;

    return timeline;
  };

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
    setDashboardData([getUniqueUsers()]);
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
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Изглед
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {dashboardData?.map((card, index) => (
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
                    <Button
                      variant={
                        filterState.description ? "contained" : "outlined"
                      }
                      onClick={() => setFilterStateOnClick("description")}
                    >
                      Описание
                    </Button>
                    <Button
                      variant={
                        filterState.formattedTimestamp
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() =>
                        setFilterStateOnClick("formattedTimestamp")
                      }
                    >
                      Време
                    </Button>
                    <Button
                      variant={filterState.action ? "contained" : "outlined"}
                      onClick={() => setFilterStateOnClick("action")}
                    >
                      Действие
                    </Button>
                    <Button
                      variant={filterState.level ? "contained" : "outlined"}
                      onClick={() => setFilterStateOnClick("level")}
                    >
                      Ниво
                    </Button>
                    <Button
                      variant={filterState.oid ? "contained" : "outlined"}
                      onClick={() => setFilterStateOnClick("oid")}
                    >
                      Oid
                    </Button>
                    <Button
                      variant={filterState.name ? "contained" : "outlined"}
                      onClick={() => setFilterStateOnClick("name")}
                    >
                      Име
                    </Button>
                    <Button
                      variant={filterState.email ? "contained" : "outlined"}
                      onClick={() => setFilterStateOnClick("email")}
                    >
                      Имейл
                    </Button>
                    <Button
                      variant={filterState.group ? "contained" : "outlined"}
                      onClick={() => setFilterStateOnClick("group")}
                    >
                      Група
                    </Button>
                    <Button
                      variant={filterState.group ? "contained" : "outlined"}
                      onClick={() => setAllFilters(true)}
                    >
                      Изчистване
                    </Button>
                  </ButtonGroup>
                </Stack>
                <DataGrid
                  rows={filterLogs}
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
