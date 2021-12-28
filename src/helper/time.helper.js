import {getStorage} from "../services/storage.service";

export const addZeroBefore = (time) => {
  return (time < 10 ? "0" : "") + time;
};

export const convertDaeToISOFormat = (time) => {
  // convert date format from dd.mm.yyyy HH:mm:ssZ (20.09.2021 05:57:53Z)
  // to toISOString YYYY-MM-DDTHH:mm:ss.sssZ (2021-09-20T05:57:53.000Z)
  if (!time) return time;
  const date = time.substr(0, 2);
  const month = time.substr(3, 2);
  const year = time.substr(6, 4);
  const hours = time.substr(11, 2);
  const minutes = time.substr(14, 2);
  const seconds = time.substr(17, 2);
  const timeZone = time.substr(19, 1);
  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.000${timeZone}`;
};

export const getTokenExpires = (tokenExpires, changeResponse) => {
  const tokenData = convertDaeToISOFormat(getStorage(tokenExpires));
  if (tokenData) {
    return new Date(tokenData).toISOString();
  }
  if (changeResponse) return new Date().toISOString();
  return undefined;
};

export const convertDateToDMYFormat = (date) => {
  // convert date format from new Date() to dd.mm.yyyy
  if (date) {
    const selectedDay = addZeroBefore(new Date(date).getDate());
    const selectedMonth = addZeroBefore(new Date(date).getMonth() + 1);
    const selectedYear = new Date(date).getFullYear();
    return `${selectedDay}.${selectedMonth}.${selectedYear}`;
  }
  return null;
};
