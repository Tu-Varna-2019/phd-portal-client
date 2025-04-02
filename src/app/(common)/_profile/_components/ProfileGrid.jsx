import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AlertBox from "@/common/AlertBox";
import ConfirmDialogYesNo from "@/components/dialog-box/ConfirmDialogYesNo";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Stack,
  Tab,
  Tooltip
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { InsertPhoto } from "@mui/icons-material";
import { HighlightOff } from "@mui/icons-material";
import CustomTable from "@/common/CustomTable";
import Loading from "@/app/loading";
import ProfileHook from "../_hooks/ProfileHook";
import Translate from "@/lib/helpers/Translate";

export default function ProfileGrid({ user, nameFields, setUser }) {
  const {
    uploadPicture,
    handleLogout,
    isImageLoading,
    deletePictureDialog,
    setDeletePictureDialog,
    deletePicture
  } = ProfileHook(setUser);
  const { tr } = Translate();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {user.role}
      </Typography>

      <Stack
        direction="row"
        useFlexGap
        sx={{
          flexWrap: "wrap",
          p: 2,
          gap: 4,
          borderTop: "4px solid",
          borderColor: "divider"
        }}
      >
        <Stack direction="column" justify="center" alignItems="center">
          <Card variant="outlined" sx={{ width: "345" }}>
            <Stack spacing={{ xs: 2, sm: 2 }}>
              <CardActionArea>
                {isImageLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <Tooltip title={user.role}>
                    <CardMedia
                      component="img"
                      image={
                        user.pictureBlob == ""
                          ? "/default-avatar.jpg"
                          : user.pictureBlob
                      }
                      alt="picture"
                      sx={{
                        width: "500px",
                        height: "500px",
                        borderRadius: "75%",
                        margin: "28px"
                      }}
                    />
                  </Tooltip>
                )}
              </CardActionArea>

              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={user.pictureBlob == ""}
                  fullWidth
                  startIcon={<HighlightOff />}
                  onClick={() => setDeletePictureDialog(true)}
                >
                  {tr("Remove photo")}
                </Button>
              </CardActions>

              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  fullWidth
                  startIcon={<InsertPhoto />}
                >
                  {tr("Upload a photo")}
                  <input
                    type="file"
                    onChange={(event) => uploadPicture(event, user)}
                    hidden
                  />
                </Button>
              </CardActions>

              <CardActions>
                <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  startIcon={<Logout />}
                  onClick={handleLogout}
                >
                  {tr("Exit")}
                </Button>
              </CardActions>
            </Stack>
          </Card>
        </Stack>

        <Stack direction="column" alignItems="end" spacing={{ xs: 2, sm: 2 }}>
          <TabContext value={"1"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={() => console.log("Tab change")}
                aria-label="Change profile tabs"
              >
                <Tab label={tr("Additional information")} value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CustomTable columnNameList={nameFields} columnValueList={user} />
            </TabPanel>
          </TabContext>
        </Stack>
      </Stack>

      <AlertBox />

      <ConfirmDialogYesNo
        title={tr("Deleting a photo")}
        contentText={tr("Are you sure you want to remove your photo?")}
        open={deletePictureDialog}
        setOpen={setDeletePictureDialog}
        onButtonConfirmClick={() => deletePicture(user)}
      />
    </Box>
  );
}
