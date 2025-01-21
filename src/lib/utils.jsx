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
