export const formatDateTime = (rawDateTime) => {
  const dateTime = new Date(rawDateTime);

  return dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short"
  });
};
