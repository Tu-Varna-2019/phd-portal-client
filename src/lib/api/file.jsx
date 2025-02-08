"use client";
import { mediaType } from "../utils";
import ClientRoute from "./router/client";

const API_URL = "/api/file";

export default function FileAPI() {
  const { route } = ClientRoute();

  const upload = (file, type) => {
    return route({
      url: API_URL + "?type=" + type,
      method: "POST",
      body: file,
      requestContentType: mediaType.FormData
    });
  };

  const download = (type, filename) => {
    return route({
      url: API_URL + "?type=" + type + "&filename=" + filename,
      method: "GET",
      responseContentType: mediaType.OctetStream
    });
  };

  const deleteFile = (filename, type) => {
    return route({
      url: API_URL + "?type=" + type,
      method: "DELETE",
      body: filename
    });
  };

  return {
    upload,
    download,
    deleteFile
  };
}
