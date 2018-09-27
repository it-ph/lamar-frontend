import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';
import { SUPER_EXPR } from '@angular/compiler/src/output/output_ast';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {


  transform(values: User[], term?: string): any {
    
    if(term === null) {return values ;}
    
    return values.filter(
    
      user =>{
        
        let search = user.name + ' '+
                      user.role + ' '+
                      user.username + ' ';

        return search.toLowerCase().includes(term.toLowerCase());
      }

    );
  }
    
}
