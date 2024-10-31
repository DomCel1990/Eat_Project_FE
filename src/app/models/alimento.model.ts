import { Image } from "./image.model";

export interface Alimento {
    id: number;
    name: string;
    energia: number;
    carboidrati: number;
    grassi: number;
    zuccheri: number;
    proteine: number;
    fibre: number;
  }

  export interface AlimentoImage {
    alimento: Alimento;
    imageDTO: Image;
  }