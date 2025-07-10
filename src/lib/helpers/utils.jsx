import { useSelector } from "react-redux";
import {
  selectCommittee,
  selectDoctoralCenter,
  selectPhd
} from "@/lib/features/user/slices/userMemoSelector";
import selectSessionToken from "@/features/sessionToken/slices/sessionTokenMemoSelector";

export const mediaType = Object.freeze({
  AppJson: "application/json",
  FormData: "multipart/form-data",
  OctetStream: "application/octet-stream"
});

export const DateTimeLocale = {
  bg: "bg-BG",
  en: "en-US"
};

export const formatDateTime = (rawDateTime, locale = DateTimeLocale.bg) => {
  const dateTime = new Date(rawDateTime);

  return dateTime.toLocaleString(locale, {
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
  const phdStore = useSelector(selectPhd);
  const committeeStore = useSelector(selectCommittee);
  const doctoralCenterStore = useSelector(selectDoctoralCenter);

  let user = {};

  switch (group) {
    case "phd":
      user = {
        name: phdStore.name,
        email: phdStore.email,
        pictureBlob: phdStore.pictureBlob
      };
      break;

    case "committee":
      user = {
        name: committeeStore.name,
        email: committeeStore.email,
        pictureBlob: committeeStore.pictureBlob
      };
      break;

    case "doctoral-center":
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

export const createDataUrl = async ({ file, fileType }) => {
  let reader = new FileReader();

  try {
    if (fileType == "blob") {
      const blob = await file.blob();
      reader.readAsDataURL(blob);
    } else if (fileType == "file") {
      reader.readAsDataURL(file);
    } else {
      throw new Error(
        `Cannot create data url due to incorrect fileType: ${fileType}`
      );
    }

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new DOMException("Error in base64 the user image"));
      };
    });
  } catch (error) {
    console.error(`Error occured: ${error}`);
    return "";
  }
};

export const runPeriodically = (func) => {
  const interval = setInterval(
    func,
    process.env.NEXT_PUBLIC_FETCH_API_DURATION
  );
  return () => clearInterval(interval);
};

export const cleanColumns = (columnName) => {
  if (columnName == "part_time") return "part time";
  return columnName;
};

export const mandatorySubjects = [
  "English",
  "Methods of Research and Development of dissertation",
  "Block C (PhD minimum)"
];

export const modes = ["regular", "part time"];

export const dataUrlToBlob = (dataUrl) => {
  const binaryData = atob(dataUrl.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    view[i] = binaryData.charCodeAt(i);
  }
  const mimeType = dataUrl.split(";")[0].split(":")[1];

  return new Blob([arrayBuffer], { type: mimeType });
};
