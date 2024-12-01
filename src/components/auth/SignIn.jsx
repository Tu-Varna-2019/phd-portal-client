export default function SignIn() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        minHeight: "100vh",
        textAlign: "center",
        paddingTop: 5,
        alignItems: "center",
        justifyContent: "justify"
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <MicrosoftIcon color="lightskyblue" sx={{ fontSize: 60 }} />
        </Box>

        <Typography variant="h4" color="blue" gutterBottom>
          401 - Unauthorized
        </Typography>

        <Typography variant="body1" paragraph>
          You do not have permission to view this page. Please check your
          credentials or contact the administrator.
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ marginRight: 2 }}
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
