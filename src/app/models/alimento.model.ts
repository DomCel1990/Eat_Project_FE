import { Image } from './image.model';

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

export interface AlimentoImagePeageble {
  content: AlimentoImage[];
  pageable: Pageable;
  last: true,
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
