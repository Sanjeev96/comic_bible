import CryptoJS from "crypto-js";

const baseUrl = import.meta.env.VITE_BASE_URL;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey: any = import.meta.env.VITE_PRIVATE_KEY;
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const key = `&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

export const SearchedComicsUrl = async (titleName: string) => {
  const searchedComicUrl = `/comics?&title=${titleName}&format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate`;
  const requestUrl = baseUrl + searchedComicUrl + key;

  return requestUrl;
};

export const RecentComicsUrl = (): string => {
  let currentDate = new Date().toLocaleDateString("en-CA");
  let date = new Date();
  date.setDate(date.getDate() - 730);
  let dateMinusTwoYears = date.toLocaleDateString("en-CA");

  const recentComicsUrl = `/comics?&format=comic&formatType=comic&noVariants=true&dateRange=${dateMinusTwoYears}%2C${currentDate}&orderBy=-onsaleDate`;
  const requestUrl = baseUrl + recentComicsUrl + key;
  return requestUrl;
};
