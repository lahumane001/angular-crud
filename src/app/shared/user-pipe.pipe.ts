import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})
export class UserNamePipe implements PipeTransform {

  transform(value: string): string {
    const name = value[0]
    const short = name.toUpperCase()
    return short 
    // return console.log(value , name);
  }
}
