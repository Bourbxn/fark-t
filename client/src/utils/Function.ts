export const formatDate = (date: string) => {
  if (date === null) {
    return null;
  }
  const dateTimeSplit = date.split("T");
  const dateSplit = dateTimeSplit[0].split("-");
  const time = dateTimeSplit[1].substring(0, 5);
  const yyyy = dateSplit[0];
  const mm = dateSplit[1];
  const dd = dateSplit[2];
  const dateFormat = dd + "/" + mm + "/" + yyyy + " " + time;
  return dateFormat;
};
