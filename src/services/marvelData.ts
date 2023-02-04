import axios from "axios";
import { BaseModel, ComicDataSetModal } from "../models/marvelApi.model";

const CryptoJS = require("crypto-js");

const baseUrl = "https://gateway.marvel.com/v1/public";
const publicKey = "00bce6118add5056f6f4e9a5d59dc35c";
const privateKey = "90ba1a8162fababb9f40b1b70fd5bcd048eb2e43";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const key = `&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

// export const characterApi = async (name: string) => {
//   const characterUrl = `/characters?&name=${name}`;
//   const requestUrl = baseUrl + characterUrl + key;
//   return await axios.get(requestUrl).then((response) => {
//     const data = response.data.data.results[0];
//     const name = data.name;
//     const desc = data.description;
//     return console.log("CHARACHTER = ", name + ":" + desc);
//   });
// };

export const SearchSeriesApi = async (titleName: string) => {
  const titleUrl = `/comics?&title=${titleName}&format=comic&formatType=comic&noVariants=true&orderBy=-onsaleDate`;
  const requestUrl = baseUrl + titleUrl + key;
  return await axios
    .get(requestUrl)
    .then((response: BaseModel) => {
      return response.data.data.results.filter(
        (recentComics: ComicDataSetModal) => {
          const dataSet = [];
          dataSet.push(
            recentComics.title,
            recentComics.dates[0],
            recentComics.thumbnail.path
          );
          return dataSet;
        }
      );
    })
    .catch((error) => console.error(`Title comics Error: ${error}`));
};

export const RecentComicsApi = async () => {
  let currentDate = new Date().toLocaleDateString("en-CA");
  let date = new Date();
  date.setDate(date.getDate() - 730);
  let dateMinusTwoYears = date.toLocaleDateString("en-CA");

  const recentComicsUrl = `/comics?&format=comic&formatType=comic&noVariants=true&dateRange=${dateMinusTwoYears}%2C${currentDate}&orderBy=-onsaleDate`;
  const requestUrl = baseUrl + recentComicsUrl + key;
  return await axios
    .get(requestUrl)
    .then((response: BaseModel) => {
      return response.data.data.results.map(
        (recentComics: ComicDataSetModal) => {
          const dataSet: ComicDataSetModal = {
            id: recentComics.id,
            title: recentComics.title,
            thumbnail: recentComics.thumbnail,
            dates: recentComics.dates.filter((d) => {
              return d.date ? d.type === "onsaleDate" : [];
            }),
          };

          return dataSet;
        }
      );
    })
    .catch((error) => console.error(`Recent comics Error: ${error}`));
};
