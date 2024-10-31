import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'calories',
    standalone: true,
})
export class CaloriesPipe implements PipeTransform{
    transform(value: number) {
       return `${value} Kcal`;
    }
    
}