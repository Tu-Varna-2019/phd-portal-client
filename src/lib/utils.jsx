import { useSelector } from "react-redux";
import {
  selectCommittee,
  selectDoctoralCenter,
  selectPhd
} from "./features/user/slices/userMemoSelector";
import selectSessionToken from "./features/sessionToken/slices/sessionTokenMemoSelector";

export const mediaType = Object.freeze({
  AppJson: "application/json",
  FormData: "multipart/form-data",
  OctetStream: "application/octet-stream"
});

export const formatDateTime = (rawDateTime) => {
  const dateTime = new Date(rawDateTime);

  return dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
    // timeZoneName: "short"
  });
};

export const formatToServerTimestamp = (isoString) => {
  const date = new Date(isoString);
  const pad = (num) => String(num).padStart(2, "0");
  const formatted = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${String(date.getMilliseconds()).padStart(3, "0")}`;

  return formatted;
};

export const getMonth = (dateTime) => {
  const date = new Date(dateTime);
  return date.getMonth();
};

export const getYear = (dateTime) => {
  const date = new Date(dateTime);
  return date.getFullYear();
};

export const CURRENT_YEAR = getYear(new Date(Date.now()));

export const getUserByGroup = () => {
  const group = useSelector(selectSessionToken).group;
  let user = {};

  switch (group) {
    case "phd":
      const phdStore = useSelector(selectPhd);
      user = {
        name: phdStore.extractName(),
        email: phdStore.email,
        pictureBlob: phdStore.pictureBlob
      };
      break;

    case "committee":
      const committeeStore = useSelector(selectCommittee);
      user = {
        name: committeeStore.name,
        email: committeeStore.email,
        pictureBlob: committeeStore.pictureBlob
      };
      break;

    case "doctoralCenter":
      const doctoralCenterStore = useSelector(selectDoctoralCenter);
      user = {
        name: doctoralCenterStore.name,
        email: doctoralCenterStore.email,
        pictureBlob: doctoralCenterStore.pictureBlob
      };
      break;

    default:
      console.error(`User with group ${group} doesn't exist`);
  }

  return user;
};

export const setPictureBlobBase64Url = async (blobPicture) => {
  const blob = await blobPicture.blob();
  let reader = new FileReader();

  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new DOMException("Error in base64 the user image"));
    };
  });
};
