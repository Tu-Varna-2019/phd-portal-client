import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { createDataUrl, CURRENT_YEAR } from "@/helpers/utils";
import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import FormLabel from "@mui/material/FormLabel";
import Translate from "@/lib/helpers/Translate";
import { FileUpload } from "@mui/icons-material";
import { useState } from "react";
import { styled } from "@mui/styles";
import {
  validateEmail,
  validateIsNumber,
  validatePIN,
  validateTextNotEmpty
} from "@/lib/helpers/validate";
import { useAppDispatch } from "@/lib/features/constants";
import { setCandidate } from "@/lib/features/user/slices/userSlice";
import { selectCandidate } from "@/lib/features/user/slices/userMemoSelector";
import { useSelector } from "react-redux";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column"
}));

export default function CandidateForm({ selectedFaculty }) {
  const { tr } = Translate();
  const dispatch = useAppDispatch();
  const candidate = useSelector(selectCandidate);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [biographyBlob, setBiographyBlob] = useState();
  const [biographyUploadLoading, setBiographyUploadLoading] = useState(false);

  const submitBtnError = () => {
    return (
      validateTextNotEmpty(name) &&
      validateEmail(email) &&
      validatePIN(pin) &&
      validateTextNotEmpty(address) &&
      validateTextNotEmpty(city) &&
      validateIsNumber(postCode) &&
      validateTextNotEmpty(country) &&
      biographyBlob != null
    );
  };

  const handleUploadBiographyClick = (event) => {
    setBiographyUploadLoading(true);
    const fileBytes = event.target.files[0];
    setBiographyBlob(fileBytes);

    dispatch(
      setAlertBox({
        message: tr("Biography is saved"),
        severity: "success"
      })
    );

    setBiographyUploadLoading(false);
  };

  const handleSubmit = async () => {
    const curriculumLocalStg = JSON.parse(localStorage.getItem("curriculum"));
    if (curriculumLocalStg != null) {
      const data = {
        name: name,
        email: email,
        country: country,
        city: city,
        pin: pin,
        postCode: postCode,
        address: address,
        faculty: selectedFaculty,
        yearAccepted: CURRENT_YEAR,
        status: "waiting",
        biography: {
          name: biographyBlob.name,
          mimeType: biographyBlob.mimeType,
          data: await createDataUrl({
            file: biographyBlob,
            fileType: "file"
          })
        },
        curriculum: {
          name: curriculumLocalStg.name,
          mode: curriculumLocalStg.mode,
          subjects: curriculumLocalStg.subjects
        }
      };

      console.log(`Data: ${data.curriculum.name} ${data.curriculum.mode}`);
      dispatch(setCandidate({ data }));
    } else {
      dispatch(
        setAlertBox({
          message: tr("Error: Please try again later!"),
          severity: "error"
        })
      );

      throw new Error("Error: Curriculum local storage is not set!");
    }
  };

  return (
    <Card
      sx={{
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        margin: "auto"
      }}
    >
      {candidate.name != undefined ? (
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
                // href={candidate.biography.data}
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
          </Stack>
        </>
      ) : (
        <>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="first-name" required>
              {tr("Name")}
            </FormLabel>
            <TextField
              id="first-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={() => !validateTextNotEmpty(name)}
              helperText={
                !validateTextNotEmpty(name)
                  ? tr("Name") + " " + tr("must not be empty!")
                  : ""
              }
              name="first-name"
              type="name"
              placeholder="Иван"
              autoComplete="first name"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="email" required>
              {tr("Email")}
            </FormLabel>
            <TextField
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={() => validateEmail(email)}
              helperText={
                !validateEmail(email)
                  ? tr("Email") + " " + tr("is incorrect!")
                  : ""
              }
              name="email"
              type="email"
              placeholder="ivan.ivanov@gmail.com"
              autoComplete="email"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="pin" required>
              {tr("PIN")}
            </FormLabel>
            <TextField
              id="pin"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              error={() => validatePIN(pin)}
              helperText={
                !validatePIN(pin) ? tr("PIN") + " " + tr("is incorrect!") : ""
              }
              name="pin"
              type="pin"
              placeholder="1111111111"
              autoComplete="1111111111"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12 }}>
            <FormLabel htmlFor="address" required>
              {tr("Address")}
            </FormLabel>
            <TextField
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              error={() => !validateTextNotEmpty(address)}
              helperText={
                !validateTextNotEmpty(address)
                  ? tr("Address") + " " + tr("must not be empty!")
                  : ""
              }
              name="address"
              type="address"
              placeholder="LevskiPrimorski, ul. Studentska 1"
              autoComplete="shipping address-line1"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="post_code" required>
              {tr("Post code")}
            </FormLabel>
            <TextField
              id="post_code"
              value={postCode}
              onChange={(event) => setPostCode(event.target.value)}
              error={() => validateIsNumber(postCode) || postCode.length < 3}
              helperText={
                !validateIsNumber(postCode) || postCode.length < 3
                  ? tr("Post code") + " " + tr("must not be empty!")
                  : ""
              }
              name="post_code"
              type="post_code"
              placeholder="9000"
              autoComplete="9000"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="city" required>
              {tr("City")}
            </FormLabel>
            <TextField
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              error={() => !validateTextNotEmpty(city)}
              helperText={
                !validateTextNotEmpty(city)
                  ? tr("City") + " " + tr("must not be empty!")
                  : ""
              }
              name="city"
              type="city"
              placeholder="Varna"
              autoComplete="Varna"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="country" required>
              {tr("Country")}
            </FormLabel>
            <TextField
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              error={() => !validateTextNotEmpty(country)}
              helperText={
                !validateTextNotEmpty(country)
                  ? tr("Country") + " " + tr("must not be empty!")
                  : ""
              }
              name="country"
              type="country"
              placeholder="Bulgaria"
              autoComplete="country"
              required
              size="small"
            />
          </FormGrid>
          <FormLabel htmlFor="biography">{tr("Biography") + " "}</FormLabel>

          <label htmlFor="biography-upload">
            <input
              id="biography-upload"
              type="file"
              onChange={(event) => handleUploadBiographyClick(event)}
              hidden
            />
            <Button
              component="label"
              htmlFor="biography-upload"
              size="small"
              startIcon={<FileUpload />}
              loading={biographyUploadLoading}
              loadingPosition="middle"
              variant="contained"
            >
              {tr("Send")}
            </Button>
          </label>

          <Divider orientation="vertical" variant="middle" flexItem />

          <FormGrid size={{ xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              disabled={!submitBtnError()}
              onClick={handleSubmit}
            >
              {tr("Confirm")}
            </Button>
          </FormGrid>
        </>
      )}
    </Card>
  );
}
