import { Button, Card, TextField } from "@mui/material";

export default function CandidateApplyConfirmation() {
  retrun(
    <Card spacing={3}>
      <Table
        // rows={curriculumsByFaculty}
        // columns={curriculumColumns}
        density="comfortable"
      />

      <TextField
        id="first-name"
        // value={name}
        // onChange={(event) => setName(event.target.value)}
        // error={() => validateTextNotEmpty(name)}
        // helperText={
        //   validateTextNotEmpty(name)
        //     ? tr("Name") + " " + tr("must not be empty!")
        //     : ""
        // }
        name="first-name"
        type="name"
        placeholder="Иван"
        autoComplete="first name"
        required
        size="small"
      />

      <Button
        type="submit"
        fullWidth
        // disabled={submitBtnError}
        // onClick={handleSubmit}
      >
        {tr("Confirm")}
      </Button>
    </Card>
  );
}
