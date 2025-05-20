"use client";
import { mediaType } from "@/helpers/utils";
import ClientRoute from "@/router/client";

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

  const download = (key) => {
    return route({
      url: API_URL + "?key=" + key,
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
