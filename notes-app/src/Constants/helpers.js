export const formatDate = (inputTimestamp) => {
  const dateObject = new Date(inputTimestamp);

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("default", { month: "short" });

  const ampm = hours >= 12 ? "PM" : "AM";

  const result = `${formattedHours}:${formattedMinutes} ${ampm}    ${day} ${month.toLowerCase()}`;

  return result;
};
