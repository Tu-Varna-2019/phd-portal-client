import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <title>404 Not Found</title>

      <Grid
        container
        alignItems="center"
        rowSpacing={22}
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          textAlign: "center"
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="h3">Sorry, page not found!</Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for.
          </Typography>

          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{
              width: "50%",
              maxWidth: 320,
              height: "auto",
              margin: "0 auto"
            }}
          />

          <Grid item xs={12}>
            <Button href="/" size="large" variant="contained" color="primary">
              Go to Main Page
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
