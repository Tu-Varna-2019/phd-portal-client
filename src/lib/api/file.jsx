"use client";
import { mediaType } from "../utils";
import ClientRoute from "./router/client";

const API_URL = "/api/file";

export default function FileAPI() {
  const { route } = ClientRoute();

  const upload = (file, type) => {
    return route(API_URL + "?type=" + type, "POST", file, mediaType.FormData);
  };

  const download = (type, filename) => {
    return route(
      API_URL + "?type=" + type + "&filename=" + filename,
      "GET",
      null,
      mediaType.OctetStream
    );
  };

  const deleteFile = (filename, type) => {
    return route(API_URL + "?type=" + type, "DELETE", filename);
  };

  return {
    upload,
    download,
    deleteFile
  };
}
