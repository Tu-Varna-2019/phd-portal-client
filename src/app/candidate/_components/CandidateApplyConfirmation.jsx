import { Button, Card, Stack, Typography } from "@mui/material";
import Translate from "@/lib/helpers/Translate";
import { selectCandidate } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";

import Divider from "@mui/material/Divider";
import SimpleTable from "@/components/main-layout/common/SimpleTable";
import { useState } from "react";
import CandidateAPI from "@/lib/api/candidate";
import { dataUrlToBlob } from "@/lib/helpers/utils";
import { useAppDispatch } from "@/lib/features/constants";
import { setAlertBox } from "@/lib/features/uiState/slices/uiStateSlice";

export default function CandidateApplyConfirmation() {
  const { tr } = Translate();
  const dispatch = useAppDispatch();
  const { apply } = CandidateAPI();
  const [submitLoading, setSubmitLoading] = useState(false);
  const candidate = useSelector(selectCandidate);

  const handleApply = async () => {
    setSubmitLoading(true);

    const formData = new FormData();
    formData.append("data", dataUrlToBlob(candidate.biography.data));
    formData.append("filename", candidate.biography.name);
    formData.append("mimetype", candidate.biography.mimeType);

    const candidateApply = {
      ...candidate,
      curriculum: { ...candidate.curriculum, faculty: candidate.faculty },
      biography: candidate.biography.name
    };

    await apply(candidateApply);
    // await createCurriculum(curriculumCreate);
    // await uploadBiography(formData);

    dispatch(
      setAlertBox({
        message: tr("Application sent!"),
        severity: "success"
      })
    );

    setSubmitLoading(false);
  };

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
          <strong>{tr("PIN")}:</strong> {candidate.pin}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Address")}:</strong> {candidate.address}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Post code")}:</strong> {candidate.postCode}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("City")}:</strong> {candidate.city}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <strong>{tr("Country")}:</strong> {candidate.country}
        </Typography>

        <Typography component="h3" variant="body1" sx={{ color: "#555" }}>
          <a
            target="_blank"
            href={candidate.biography.data}
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
        <SimpleTable
          rows={candidate.curriculum}
          headerNames={["Name", "Mode"]}
          rowKeys={["name", "mode"]}
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
        <SimpleTable
          rows={candidate.curriculum.subjects}
          headerNames={["Name"]}
        />
      </Card>

      <Button
        type="submit"
        fullWidth
        onClick={handleApply}
        variant="contained"
        loading={submitLoading}
      >
        {tr("Confirm")}
      </Button>
    </Stack>
  );
}
