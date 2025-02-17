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
import { useState } from "react";
import { Logout } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { InsertPhoto } from "@mui/icons-material";
import Auth from "@/lib/auth/auth";
import FileAPI from "@/api/file";
import { HighlightOff } from "@mui/icons-material";
import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import APIWrapper from "@/helpers/APIWrapper";
import { useAppDispatch } from "@/features/constants";
import CustomTable from "@/common/CustomTable";
import { createDataUrl } from "@/helpers/utils";
import Loading from "@/app/loading";

export default function ProfileDataGrid({ user, nameFields, setUser }) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { logAlert } = APIWrapper();
  const { handleLogout } = Auth();
  const dispatch = useAppDispatch();

  const [deletePictureDialog, setDeletePictureDialog] = useState(false);
  const { upload, deleteFile } = FileAPI();

  const uploadPicture = async (event) => {
    setIsImageLoading(true);
    const fileBytes = event.target.files[0];
    const { name, type } = fileBytes;

    const formData = new FormData();
    formData.append("data", fileBytes);
    formData.append("filename", name);
    formData.append("mimetype", type);

    const result = await upload(formData, "avatar");
    if (result != []) {
      user.picture = result.data;
      user.pictureBlob = await createDataUrl({
        picture: fileBytes,
        fileType: "file"
      });
      dispatch(setUser({ data: user }));

      logAlert({
        message: `Потребител ${user.email} си смени снимката`,
        description: `Потребителят си смени снимката успешно!`,
        action: "Потребител смени снимка",
        level: "success"
      });
    } else {
      dispatch(
        setAlertBox({
          message: "Грешка при качването на снимката!",
          severity: "error"
        })
      );
    }

    setIsImageLoading(false);
  };

  const deletePicture = async () => {
    setIsImageLoading(true);

    const result = await deleteFile({ filename: user.picture }, "avatar");
    if (result != []) {
      user.picture = "";
      user.pictureBlob = "";
      dispatch(setUser({ data: user }));

      logAlert({
        message: `Потребител ${user.email} си изтри снимката`,
        description: `Потребителят си изтри снимката успешно!`,
        action: "Потребител изтри снимка",
        level: "success"
      });
    } else {
      dispatch(
        setAlertBox({
          message: "Грешка при изтриването на снимката!",
          severity: "error"
        })
      );
    }

    setIsImageLoading(false);
  };

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
                  Премахване на снимка
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
                  Качване на снимка
                  <input
                    type="file"
                    onChange={(event) => uploadPicture(event)}
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
                  Излизане
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
                <Tab label="Допълнителна информация" value="1" />
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
        title={"Изтриване на снимка"}
        contentText={"Сигурни ли сте че искате да премахнете вашата снимка?"}
        open={deletePictureDialog}
        setOpen={setDeletePictureDialog}
        onButtonConfirmClick={deletePicture}
      />
    </Box>
  );
}
