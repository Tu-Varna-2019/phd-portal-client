import { createDataUrl } from "@/helpers/utils";
import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import APIWrapper from "@/helpers/APIWrapper";
import { useState } from "react";
import Auth from "@/lib/auth/auth";
import FileAPI from "@/api/FileAPI";
import { useAppDispatch } from "@/features/constants";
import Translate from "@/lib/helpers/Translate";

export default function ProfileHook(setUser) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { logAlert } = APIWrapper();
  const { handleLogout } = Auth();
  const dispatch = useAppDispatch();
  const { tr } = Translate();

  const [deletePictureDialog, setDeletePictureDialog] = useState(false);
  const { upload, deleteFile } = FileAPI();

  const uploadPicture = async (event, user) => {
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
        file: fileBytes,
        fileType: "file"
      });
      dispatch(setUser({ data: user }));

      logAlert({
        message: tr("You have successfully changed your picture!"),
        description: "Потребителят си смени снимката успешно!",
        action: "Потребител смени снимка",
        level: "success"
      });
    } else {
      dispatch(
        setAlertBox({
          message: tr("Error when uploading a picture"),
          severity: "error"
        })
      );
    }

    setIsImageLoading(false);
  };

  const deletePicture = async (user) => {
    setIsImageLoading(true);

    const result = await deleteFile({ filename: user.picture }, "avatar");
    if (result != []) {
      user.picture = "";
      user.pictureBlob = "";
      dispatch(setUser({ data: user }));

      logAlert({
        message: tr("You have successfully deleted your picture!"),
        description: `Потребителят си изтри снимката успешно!`,
        action: "Потребител изтри снимка",
        level: "success"
      });
    } else {
      dispatch(
        setAlertBox({
          message: tr("Error when deleting a picture"),
          severity: "error"
        })
      );
    }

    setIsImageLoading(false);
  };

  return {
    uploadPicture,
    handleLogout,
    isImageLoading,
    deletePictureDialog,
    setDeletePictureDialog,
    deletePicture
  };
}
