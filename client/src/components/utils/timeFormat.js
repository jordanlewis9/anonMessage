export const timeFormat = (timeString) => {
  let newString = timeString.split(",").map((st) => st.trim());
  newString[1] = newString[1].replace(/:\d{2}\s/, "").toLowerCase();
  return newString.join(" at ");
};
