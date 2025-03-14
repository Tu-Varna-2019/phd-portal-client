import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Stack } from "@mui/material";
import Search from "@/common/Search";
import Loading from "@/app/loading";
import { eventColumns } from "../_constants/eventConstants";
import EventManagementHook from "../_hooks/EventManagementHook";
import Table from "@/components/main-layout/common/Table";
import Translate from "@/lib/helpers/Translate";

const filterButtons = [
  "description",
  "time",
  "action",
  "level",
  "oid",
  "name",
  "email",
  "group"
];

export default function EventManagementGrid() {
  const {
    searchLogsOnChange,
    setFilterStateOnClick,
    logsLoading,
    filterState,
    filterLogs
  } = EventManagementHook();
  const { tr } = Translate();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Box>
            {logsLoading ? (
              <>
                <Typography
                  textAlign="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  {tr("Please wait")}
                </Typography>
                <Loading />
              </>
            ) : (
              <>
                <Stack>
                  <Search onChange={searchLogsOnChange} />
                  <ButtonGroup>
                    {Object.entries(filterState).map(([key, value], index) => {
                      return (
                        <Button
                          key={index}
                          variant={value ? "contained" : "outlined"}
                          onClick={() => setFilterStateOnClick(key)}
                        >
                          {tr(filterButtons[index])}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </Stack>
                <Table rows={filterLogs} columns={eventColumns} />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
