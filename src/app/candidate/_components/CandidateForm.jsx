import { Button, Card, Divider, Grid, TextField } from "@mui/material";
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

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column"
}));

export default function CandidateForm() {
  const { tr } = Translate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [biographyData] = useState();
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
      biographyData != null
    );
  };

  const handleUploadBiographyClick = () => {
    setBiographyUploadLoading(true);
    setBiographyUploadLoading(false);
  };

  const handleSubmit = () => {};

  console.log(
    `Post code: ${postCode} and if it's valid or not: ${validateIsNumber(postCode)}`
  );
  return (
    <Card spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          {tr("Name")}
        </FormLabel>
        <TextField
          id="first-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={() => validateTextNotEmpty(name)}
          helperText={
            validateTextNotEmpty(name)
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
            !validateEmail(email) ? tr("Email") + " " + tr("is incorrect!") : ""
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
          error={() => validateTextNotEmpty(address)}
          helperText={
            validateTextNotEmpty(address)
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
          error={() => validateTextNotEmpty(city)}
          helperText={
            validateTextNotEmpty(city)
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
          error={() => validateTextNotEmpty(country)}
          helperText={
            validateTextNotEmpty(country)
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
      <Button
        size="small"
        onClick={handleUploadBiographyClick}
        endIcon={<FileUpload />}
        loading={biographyUploadLoading}
        loadingPosition="middle"
        variant="contained"
      >
        {tr("Send")}
      </Button>
      <Divider orientation="vertical" variant="middle" flexItem />

      <FormGrid size={{ xs: 12 }}>
        <Button
          type="submit"
          fullWidth
          disabled={submitBtnError}
          onClick={handleSubmit}
        >
          {tr("Confirm")}
        </Button>
      </FormGrid>
    </Card>
  );
}
