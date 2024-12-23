import { Alimento } from "./alimento.model";

export interface Planday{
    id: number;
    dateLocale: string;
    energiaTotal: number;
    carboidratiTotal: number;
    grassiTotal: number;
    zuccheriTotal: number;
    proteineTotal: number;
    fibreTotal: number;
    alimentoQuantityDTO: Alimento[];
}