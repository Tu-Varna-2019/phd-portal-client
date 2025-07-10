import Box from "@mui/material/Box";
import AlertBox from "@/common/AlertBox";
import Table from "@/components/main-layout/common/Table";
import { Stack, Typography } from "@mui/material";
import Translate from "@/lib/helpers/Translate";
import OverflowBox from "@/components/main-layout/common/OverflowBox";
import ReportsConstants from "../_constants/ReportsConstants";
import ReportsHook from "../_hooks/ReportsHook";

export default function ReportsGrid() {
  const { tr } = Translate();
  const {
    reports,
    selectedReport,
    setSelectedReport,
    isReportOpened,
    setIsReportOpened
  } = ReportsHook();
  const { reportColumns } = ReportsConstants();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Table
        rows={reports}
        columns={reportColumns}
        checkboxEnabled
        onRowSelect={(index) => {
          if (reports[index] != undefined) setSelectedReport(reports[index]);
          setIsReportOpened(true);
        }}
      />
      <AlertBox />

      <OverflowBox open={isReportOpened} setOpen={setIsReportOpened}>
        {isReportOpened && (
          <>
            <Typography
              component="h2"
              variant="h6"
              sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
            >
              {tr("Details")}
            </Typography>

            <Stack direction="column" spacing={2} sx={{ textAlign: "left" }}>
              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Name")}:</strong> {selectedReport.name}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Conduct")}:</strong> {selectedReport.conduct}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Enrollment date")}:</strong>{" "}
                {selectedReport.enrollmentDate}
              </Typography>

              <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
                <strong>{tr("Order number")}:</strong>{" "}
                {selectedReport.orderNumber}
              </Typography>
            </Stack>
          </>
        )}
      </OverflowBox>
    </Box>
  );
}
