import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'grammi',
    standalone: true,
})
export class GrammiPipe implements PipeTransform{
    transform(value: number) {
       return ` ${value} gr`;
    }
    
}