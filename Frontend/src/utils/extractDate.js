export const extractDate = (dateString) => {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

//helping function to pad single digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
