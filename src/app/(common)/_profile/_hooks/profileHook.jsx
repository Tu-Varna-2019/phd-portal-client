import { createDataUrl } from "@/helpers/utils";
import { setAlertBox } from "@/features/uiState/slices/uiStateSlice";
import APIWrapper from "@/helpers/APIWrapper";
import { useState } from "react";
import Auth from "@/lib/auth/auth";
import FileAPI from "@/api/file";
import { useAppDispatch } from "@/features/constants";

export function ProfileHook(setUser) {
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

  return {
    uploadPicture,
    handleLogout,
    isImageLoading,
    deletePictureDialog,
    setDeletePictureDialog,
    deletePicture
  };
}
