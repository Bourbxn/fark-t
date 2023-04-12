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

export const isTelephoneInvalid = (tel: string) => {
  if (tel.length > 10) {
    return true;
  }
  const isContainOnlyNum = (str: string) => {
    return /^\d+$/.test(str);
  };
  if (!isContainOnlyNum(tel)) {
    return true;
  }
};
