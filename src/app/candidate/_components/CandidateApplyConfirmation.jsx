import { Button, Card, Stack, Typography } from "@mui/material";
import Translate from "@/lib/helpers/Translate";
import { selectCandidate } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";
import Table from "@/components/main-layout/common/Table";

import Divider from "@mui/material/Divider";

export default function CandidateApplyConfirmation({ curriculumColumns }) {
  const { tr } = Translate();
  const candidate = useSelector(selectCandidate);
  const handleApply = () => {};

  console.log(candidate.curriculum.subjects);
  return (
    <Stack direction="column" spacing={2} sx={{ textAlign: "left" }}>
      <Card
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto"
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          {tr("Details")}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Name")}:</strong> {candidate.name}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Email")}:</strong> {candidate.email}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Pin")}:</strong> {candidate.pin}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Address")}:</strong> {candidate.address}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("post code")}:</strong> {candidate.postCode}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("city")}:</strong> {candidate.city}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("city")}:</strong> {candidate.city}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("country")}:</strong> {candidate.country}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <a
            target="_blank"
            href={candidate.biographyBlob}
            rel="noopener noreferrer"
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            {tr("Biography")}
          </a>
        </Typography>
      </Card>
      <Divider />

      <Card
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto"
        }}
      >
        <Table
          rows={candidate.curriculum}
          columns={curriculumColumns}
          density="comfortable"
        />
      </Card>

      <Card
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto"
        }}
      >
        <Table
          rows={candidate.curriculum.subjects}
          columns={{}}
          density="comfortable"
        />
      </Card>

      <Button type="submit" fullWidth onClick={handleApply} variant="contained">
        {tr("Confirm")}
      </Button>
    </Stack>
  );
}
