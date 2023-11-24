export const formatDate = (isoDate) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const date = new Date(isoDate);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate.replace(/(\d+):(\d+)/, `${hours}:${minutes}`);
};
