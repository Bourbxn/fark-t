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
  if (tel.length !== 10) {
    return true;
  }
  const isContainOnlyNum = (str: string) => {
    return /^\d+$/.test(str);
  };
  if (!isContainOnlyNum(tel)) {
    return true;
  }
};

export const isPasswordInvalid = (password: string) => {
  let isValidPassowrd = 0;
  if (password.length > 6) {
    isValidPassowrd++;
  }
  if (/[0-9]/.test(password)) {
    isValidPassowrd++;
  }
  if (/[a-z]/.test(password) || /[A-Z]/.test(password)) {
    isValidPassowrd++;
  }
  if (isValidPassowrd < 3) {
    return true;
  }
  return false;
};
