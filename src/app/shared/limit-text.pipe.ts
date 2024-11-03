import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText',
  standalone: true
})
export class LimitTextPipe implements PipeTransform {

  transform(value: string, limits=100): string {
     return value.length > limits? value.substring(0, limits) + '...' : value;;


  }

}
