export interface BaseModel {
  data: DataModel;
}

// export interface ResponseModel {
//   response: DataModel;
// }

export interface DataModel {
  data: ResultsModel;
}

export interface ResultsModel {
  results: ComicDataSetModal[];
}

export interface ComicDataSetModal {
  id: number;
  title: string;
  thumbnail: ComicImage;
  dates: OnSaleDate[]; // use find on type : '"onsaleDate"' in logic, dates[0].date(<date> is on sale date in array 0)
}

export interface ComicImage {
  extension: string;
  path: string;
}

export interface OnSaleDate {
  type: string;
  date: string;
}

// PROP models below

export type Props = {
  dataStr: string;
};
